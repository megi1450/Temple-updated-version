const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret, defineString } = require('firebase-functions/params');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');
const { randomBytes, createHash } = require('node:crypto');
initializeApp();
const db = getFirestore();
const donationAdminKey = defineSecret('DONATIONS_ADMIN_KEY');
const donationSheetUrl = defineString('DONATIONS_SHEETS_WEB_APP_URL', { default: '' });
const FLAT = /^([A-F])?(00[1-4]|0?[1-9]0[1-4]|1[0-9]0[1-4])$/;
const UTR = /^\d{12}$/;
const clean = (v, n=160) => String(v == null ? '' : v).trim().slice(0,n);
const hash = v => createHash('sha256').update(String(v)).digest('hex');
function signed(request) { if (!request.auth) throw new HttpsError('unauthenticated','Please sign in.'); if (request.auth.token.email_verified !== true) throw new HttpsError('failed-precondition','Verify your email before continuing.'); return request.auth; }
function resident(request) { const auth=signed(request); const flat=clean(auth.token.flatNumber,5).toUpperCase(); if(auth.token.role!=='resident'||!FLAT.test(flat)) throw new HttpsError('permission-denied','Resident access is required.'); return {auth,flat}; }
function admin(request) { const auth=signed(request); if(auth.token.role!=='admin') throw new HttpsError('permission-denied','Administrator access is required.'); return auth; }
async function sheet(action, record, key='') { const url=donationSheetUrl.value(); if(!url) return {sent:false,reason:'Google Sheets endpoint is not configured.'}; if(!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec(?:\?.*)?$/.test(url)) return {sent:false,reason:'Google Sheets endpoint is invalid.'}; try { const res=await fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify({action,...record,adminKey:key})}); const body=await res.json(); return {sent:res.ok&&body.ok===true,reason:body.message||`HTTP ${res.status}`}; } catch (_) { return {sent:false,reason:'Google Sheets sync could not be reached.'}; } }

// Admin-issued, single-use invitations bind the flat, resident name and email.
exports.createResidentInvite = onCall(async request => {
  admin(request);
  const flatNumber=clean(request.data?.flatNumber,5).toUpperCase(), email=clean(request.data?.email,254).toLowerCase(), residentName=clean(request.data?.residentName,100);
  if(!FLAT.test(flatNumber)||!/^\S+@\S+\.\S+$/.test(email)||!residentName) throw new HttpsError('invalid-argument','Enter a valid flat, resident name and email.');
  const code=randomBytes(18).toString('base64url'), id=hash(code);
  await db.doc(`residentInvites/${id}`).create({flatNumber,email,residentName,createdAt:FieldValue.serverTimestamp(),expiresAt:Timestamp.fromMillis(Date.now()+7*24*60*60*1000),createdBy:request.auth.uid,usedAt:null,usedBy:null});
  return {invitationCode:code,flatNumber,email};
});

exports.registerResident = onCall({enforceAppCheck:true}, async request => {
  const flatNumber=clean(request.data?.flatNumber,5).toUpperCase(), residentName=clean(request.data?.residentName,100), email=clean(request.data?.email,254).toLowerCase(), password=String(request.data?.password||''), code=clean(request.data?.invitationCode,100);
  if(!FLAT.test(flatNumber)||!residentName||!/^\S+@\S+\.\S+$/.test(email)||password.length<12||!code) throw new HttpsError('invalid-argument','Check your details, invitation code and password (minimum 12 characters).');
  const inviteRef=db.doc(`residentInvites/${hash(code)}`), inviteSnap=await inviteRef.get();
  if(!inviteSnap.exists) throw new HttpsError('permission-denied','This invitation is invalid or has expired.');
  const invite=inviteSnap.data();
  if(invite.usedAt||(invite.expiresAt&&invite.expiresAt.toMillis()<Date.now())||invite.flatNumber!==flatNumber||invite.email!==email||String(invite.residentName).toLowerCase()!==residentName.toLowerCase()) throw new HttpsError('permission-denied','This invitation does not match the resident details.');
  let user;
  try {
    user=await getAuth().createUser({email,password,displayName:residentName,emailVerified:false});
    await getAuth().setCustomUserClaims(user.uid,{role:'resident',flatNumber});
    await db.runTransaction(async tx=>{const current=await tx.get(inviteRef);if(!current.exists||current.data().usedAt)throw new HttpsError('already-exists','This invitation has already been used.');tx.create(db.doc(`users/${flatNumber}/residents/${user.uid}`),{uid:user.uid,name:residentName,email,flatNumber,createdAt:FieldValue.serverTimestamp(),accountStatus:'active'});tx.update(inviteRef,{usedAt:FieldValue.serverTimestamp(),usedBy:user.uid});});
    return {uid:user.uid,email,flatNumber};
  } catch(error) { if(user?.uid) await getAuth().deleteUser(user.uid).catch(()=>{}); if(error instanceof HttpsError)throw error; if(error.code==='auth/email-already-exists')throw new HttpsError('already-exists','An account already exists for this email. Sign in instead.'); throw new HttpsError('internal','Resident account could not be created.'); }
});

exports.submitPujaRegistration = onCall({enforceAppCheck:true}, async request => {
  const {auth,flat}=resident(request); const name=clean(request.data?.name,100), date=clean(request.data?.date,10), mobile=clean(request.data?.mobileNumber,10), event=clean(request.data?.event,80), occasion=clean(request.data?.occasion,100);
  if(!name||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^[6-9]\d{9}$/.test(mobile)||!event||!occasion) throw new HttpsError('invalid-argument','Please check all puja registration details.');
  const registrationId=`${flat}_${name}_${event}_${occasion}`.replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,180), submission=db.doc(`submissions/${registrationId}`), perFlat=db.doc(`users/${flat}/registrations/${registrationId}`), counter=db.doc('receiptNumbers/counter'); let result;
  await db.runTransaction(async tx=>{const [old,count]=await Promise.all([tx.get(submission),tx.get(counter)]);if(old.exists)throw new HttpsError('already-exists','This registration already exists.');const receiptNumber=String(Number(count.data()?.lastReceiptNumber||0)+1).padStart(4,'0');result={name,date,flatNumber:flat,mobileNumber:mobile,event,occasion,registrationId,receiptNumber,residentUid:auth.uid,createdAt:FieldValue.serverTimestamp()};tx.create(submission,result);tx.create(perFlat,result);tx.set(counter,{lastReceiptNumber:Number(receiptNumber),updatedAt:FieldValue.serverTimestamp()});});
  return {...result,createdAt:new Date().toISOString()};
});

exports.submitDonation = onCall({enforceAppCheck:true}, async request => {
  const {auth,flat}=resident(request);const amount=Number(request.data?.amount),mobile=clean(request.data?.mobileNumber,10),utr=clean(request.data?.utrNumber,12),date=clean(request.data?.date,10),type=clean(request.data?.donationType,80);
  if(!Number.isFinite(amount)||amount<1||Math.round(amount*100)!==amount*100||!/^[6-9]\d{9}$/.test(mobile)||!UTR.test(utr)||!/^\d{4}-\d{2}-\d{2}$/.test(date)||type!=='Donate for Temple Daily Activities')throw new HttpsError('invalid-argument','Please check the donation amount, mobile number, date and 12-digit UPI reference.');
  const residentSnap=await db.doc(`users/${flat}/residents/${auth.uid}`).get();if(!residentSnap.exists)throw new HttpsError('permission-denied','Resident profile not found.');const name=clean(residentSnap.data().name,100),id=`UPI_${utr}`,root=db.doc(`Donations/${id}`),perFlat=db.doc(`users/${flat}/Donations/${id}`),counter=db.doc('receiptNumbers/donationsCounter');let record;
  await db.runTransaction(async tx=>{const [duplicate,count]=await Promise.all([tx.get(root),tx.get(counter)]);if(duplicate.exists)throw new HttpsError('already-exists','This UPI reference has already been submitted.');const serial=Number(count.data()?.lastSerialNumber||0)+1;record={serialNumber:String(serial).padStart(3,'0'),name,amount,date,flatNumber:flat,mobileNumber:mobile,donationType:type,utrNumber:utr,paymentMethod:'UPI',verificationStatus:'Pending manual verification',sheetSyncStatus:'queued',residentUid:auth.uid,createdAt:FieldValue.serverTimestamp()};tx.create(root,record);tx.create(perFlat,record);tx.set(counter,{lastSerialNumber:serial,updatedAt:FieldValue.serverTimestamp()});});
  const sync=await sheet('submit',{...record,createdAt:new Date().toISOString()});await root.update({sheetSyncStatus:sync.sent?'synced':'pending'});await perFlat.update({sheetSyncStatus:sync.sent?'synced':'pending'});return {...record,createdAt:new Date().toISOString(),sheetSyncStatus:sync.sent?'synced':'pending'};
});

exports.manageDonation = onCall({secrets:[donationAdminKey]}, async request => {
  admin(request);const action=clean(request.data?.action,12).toLowerCase(),utr=clean(request.data?.utrNumber,12);if(!['verify','sync','delete'].includes(action)||!UTR.test(utr))throw new HttpsError('invalid-argument','Invalid donation action or UPI reference.');
  const root=db.doc(`Donations/UPI_${utr}`),snap=await root.get();if(!snap.exists)throw new HttpsError('not-found','Donation record not found.');const record=snap.data(),flat=db.doc(`users/${record.flatNumber}/Donations/UPI_${utr}`);
  if(action==='delete'){await db.runTransaction(async tx=>{tx.delete(root);tx.delete(flat);});const result=await sheet('delete',record,donationAdminKey.value());return {ok:true,sheet:result};}
  if(action==='verify'){const update={verificationStatus:'Verified',verifiedAt:FieldValue.serverTimestamp(),verifiedBy:request.auth.uid};await db.runTransaction(async tx=>{tx.update(root,update);tx.update(flat,update);});record.verificationStatus='Verified';record.verifiedAt=new Date().toISOString();}
  const result=await sheet(action,record,donationAdminKey.value());return {ok:true,sheet:result};
});
