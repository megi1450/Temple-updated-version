import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBKtqm0KzMmX4cCqT3PhGI2aFcF3LSXnEk",
  authDomain: "ao-temple.firebaseapp.com",
  projectId: "ao-temple",
  storageBucket: "ao-temple.appspot.com",
  messagingSenderId: "426167530682",
  appId: "1:426167530682:web:848a4cb0ceee2ce05cfe83"
};
const $ = id => document.getElementById(id);
const flatNumber = localStorage.getItem('flatNumber') || '';
const residentName = localStorage.getItem('residentName') || '';
const email = localStorage.getItem('email') || '';
const residentDocId = localStorage.getItem('residentDocId') || `${residentName.replace(/\s+/g, '_')}_${email}`;

function show(id, value) { const el=$(id); if(el) el.textContent=value || '—'; }
function formatDate(value) { const date = value ? new Date(value) : null; return date && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat(undefined,{day:'2-digit',month:'long',year:'numeric'}).format(date) : ''; }

if (localStorage.getItem('input') !== 'true' || !flatNumber || !residentName || !email) {
  location.replace('resident-access.html');
} else {
  show('profileName', residentName); show('profileFlat', flatNumber); show('profileEmail', email);
  try {
    const db = getFirestore(initializeApp(firebaseConfig));
    const ref = doc(db, 'users', flatNumber, 'residents', residentDocId);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      const data = snapshot.data();
      show('profileName', data.name || residentName);
      show('profileEmail', data.email || email);
      const phone = data.mobileNumber || data.mobile || data.phoneNumber || data.phone || '';
      if (phone) { $('profilePhone').textContent=phone; $('profilePhoneRow').hidden=false; }
      const date = formatDate(data.signInTime || data.createdAt || data.registeredAt);
      if (date) { $('profileDate').textContent=date; $('profileDateRow').hidden=false; }
      $('profileStatus').textContent='Your registered profile details are up to date.';
    } else {
      $('profileStatus').textContent='Your saved account details are shown. The full resident record could not be found.';
    }
  } catch (error) {
    console.error('Unable to load resident profile:', error);
    $('profileStatus').textContent='Showing saved account details. The resident record could not be loaded right now.';
  }
}
