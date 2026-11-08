// Trusted one-time bootstrap: FIREBASE_ADMIN_UID=<exact-auth-uid> node scripts/set-admin-claim.js
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
initializeApp({ credential: applicationDefault() });
const uid=process.env.FIREBASE_ADMIN_UID;
if(!uid) throw new Error('Set FIREBASE_ADMIN_UID.');
getAuth().setCustomUserClaims(uid,{role:'admin'}).then(()=>{console.log('Admin claim assigned.');process.exit(0);}).catch(e=>{console.error(e.message);process.exit(1);});
