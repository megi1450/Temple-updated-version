import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js';
import { getFirestore, setDoc, doc, getDoc, collection } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js';

const firebaseConfig={apiKey:'AIzaSyBKtqm0KzMmX4cCqT3PhGI2aFcF3LSXnEk',authDomain:'ao-temple.firebaseapp.com',projectId:'ao-temple',storageBucket:'ao-temple.appspot.com',messagingSenderId:'426167530682',appId:'1:426167530682:web:848a4cb0ceee2ce05cfe83'};
const db=getFirestore(initializeApp(firebaseConfig));
const form=document.getElementById('residentAccessForm');
const status=document.getElementById('authStatus');
const mode=document.body.dataset.authMode;
const messages={
  invalid:{en:'Enter a valid flat number, for example A001 or B1904.',kn:'ಮಾನ್ಯವಾದ ಫ್ಲಾಟ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ, ಉದಾಹರಣೆಗೆ A001 ಅಥವಾ B1904.'},
  required:{en:'Enter your flat number, name and email address.',kn:'ನಿಮ್ಮ ಫ್ಲಾಟ್ ಸಂಖ್ಯೆ, ಹೆಸರು ಮತ್ತು ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.'},
  email:{en:'Enter a valid email address.',kn:'ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.'},
  checking:{en:'Checking your resident details…',kn:'ನಿಮ್ಮ ನಿವಾಸಿ ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…'},
  missingResident:{en:'No registered account matches these details.',kn:'ಈ ವಿವರಗಳಿಗೆ ಹೊಂದುವ ನೋಂದಾಯಿತ ಖಾತೆ ಕಂಡುಬಂದಿಲ್ಲ.'},
  missingFlat:{en:'No resident record was found for this flat number.',kn:'ಈ ಫ್ಲಾಟ್ ಸಂಖ್ಯೆಗೆ ಯಾವುದೇ ನಿವಾಸಿ ದಾಖಲೆ ಕಂಡುಬಂದಿಲ್ಲ.'},
  duplicate:{en:'This resident is already registered. Sign in instead.',kn:'ಈ ನಿವಾಸಿ ಈಗಾಗಲೇ ನೋಂದಾಯಿತರಾಗಿದ್ದಾರೆ. ಬದಲಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ.'},
  failed:{en:'We could not complete this request. Please try again.',kn:'ಈ ವಿನಂತಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'}
};
const language=()=>localStorage.getItem('templeLanguage')==='kn'?'kn':'en';
const flatInput=form?.elements?.namedItem('flatNumber');
if(flatInput){flatInput.addEventListener('input',()=>{const clean=flatInput.value.replace(/\s+/g,'').toUpperCase();if(flatInput.value!==clean)flatInput.value=clean;if(status){status.classList.remove('is-visible');status.textContent='';delete status.dataset.key;}});}
form?.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{if(status?.classList.contains('is-visible')){status.classList.remove('is-visible');status.textContent='';delete status.dataset.key;}}));
function show(key,tone='error'){status.dataset.key=key;status.dataset.tone=tone;status.textContent=messages[key][language()];status.classList.add('is-visible');}
function refreshStatus(){if(status.dataset.key)status.textContent=messages[status.dataset.key][language()];}
function setBusy(busy){form.querySelectorAll('input,button').forEach(el=>el.disabled=busy);form.querySelector('button').setAttribute('aria-busy',String(busy));}
function values(){return {flatNumber:form.flatNumber.value.trim().toUpperCase(),residentName:form.residentName.value.trim(),email:form.email.value.trim().toLowerCase()};}
function validate(v){const flat=/^([A-F])?(00[1-4]|0?[1-9]0[1-4]|1[0-9]0[1-4])$/;if(!v.flatNumber||!v.residentName||!v.email){show('required');return false;}if(!flat.test(v.flatNumber)){show('invalid');return false;}if(!form.email.validity.valid){show('email');return false;}return true;}
window.addEventListener('templelanguagechange',refreshStatus);
document.addEventListener('DOMContentLoaded',()=>{if(mode==='login'){['flatNumber','residentName','email'].forEach(id=>{const saved=localStorage.getItem(id);if(saved)form[id].value=saved;});}});
form.addEventListener('submit',async event=>{event.preventDefault();const v=values();if(!validate(v))return;show('checking','info');setBusy(true);try{const flatRef=doc(db,'users',v.flatNumber);const flatSnap=await getDoc(flatRef);const residentDocId=`${v.residentName.replace(/\s+/g,'_')}_${v.email}`;const residentRef=doc(collection(flatRef,'residents'),residentDocId);if(mode==='login'){if(!flatSnap.exists()){show('missingFlat');return;}const residentSnap=await getDoc(residentRef);if(!residentSnap.exists()){show('missingResident');return;}localStorage.setItem('input','true');localStorage.setItem('flatNumber',v.flatNumber);localStorage.setItem('residentName',v.residentName);localStorage.setItem('email',v.email);localStorage.setItem('residentDocId',residentDocId);localStorage.setItem('residentSessionAt',new Date().toISOString());location.href='resident-dashboard.html';return;}if(!flatSnap.exists())await setDoc(flatRef,{});const residentSnap=await getDoc(residentRef);if(residentSnap.exists()){show('duplicate');return;}await setDoc(residentRef,{name:v.residentName,email:v.email,signInTime:new Date().toISOString()});localStorage.setItem('input','true');localStorage.setItem('flatNumber',v.flatNumber);localStorage.setItem('residentName',v.residentName);localStorage.setItem('email',v.email);localStorage.setItem('residentDocId',residentDocId);localStorage.setItem('residentSessionAt',new Date().toISOString());location.href='terms.html';}catch(error){console.error('Resident access error:',error);show('failed');}finally{setBusy(false);}});
