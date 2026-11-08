function toggleLanguage(){if(window.toggleSiteLanguage&&window.toggleSiteLanguage!==toggleLanguage)window.toggleSiteLanguage();}
function translateToKannada(text){const map={"Home":"ಮುಖಪುಟ","About the Temple":"ದೇವಾಲಯದ ಬಗ್ಗೆ","Puja Events":"ಪೂಜಾ ಕಾರ್ಯಕ್ರಮಗಳು","Donations":"ದೇಣಿಗೆಗಳು","Gallery":"ಚಿತ್ರಶಾಲೆ","Announcements":"ಪ್ರಕಟಣೆಗಳು","Committee Members":"ಸಮಿತಿ ಸದಸ್ಯರು","Registration History":"ನೋಂದಣಿ ಇತಿಹಾಸ","Register Here":"ಇಲ್ಲಿ ನೋಂದಾಯಿಸಿ","Resident Login":"ನಿವಾಸಿ ಲಾಗಿನ್"};return map[text]||text;}
function translateToEnglish(text){const map={"ಮುಖಪುಟ":"Home","ದೇವಾಲಯದ ಬಗ್ಗೆ":"About the Temple","ಪೂಜಾ ಕಾರ್ಯಕ್ರಮಗಳು":"Puja Events","ದೇಣಿಗೆಗಳು":"Donations","ಚಿತ್ರಶಾಲೆ":"Gallery","ಪ್ರಕಟಣೆಗಳು":"Announcements","ಸಮಿತಿ ಸದಸ್ಯರು":"Committee Members","ನೋಂದಣಿ ಇತಿಹಾಸ":"Registration History","ಇಲ್ಲಿ ನೋಂದಾಯಿಸಿ":"Register Here","ನಿವಾಸಿ ಲಾಗಿನ್":"Resident Login"};return map[text]||text;}
function translateAboutToKannada(){return "ಶ್ರೀ ವರಸಿದ್ಧಿ ವಿನಾಯಕ ದೇವಸ್ಥಾನಕ್ಕೆ ಸ್ವಾಗತ. ಅರವಿಂದ್ ಓಯಸಿಸ್ ಸಮುದಾಯದಲ್ಲಿರುವ ಈ ದೇವಾಲಯವು ಭಕ್ತಿ, ಸಂಪ್ರದಾಯ ಮತ್ತು ಸಮುದಾಯದ ಒಗ್ಗಟ್ಟಿನ ಸ್ಥಳವಾಗಿದೆ. ದೇವಾಲಯದ ಭೂಮಿ ಪೂಜೆ 23 ನವೆಂಬರ್ 2023 ರಂದು ನೆರವೇರಿತು. 48 ದಿನಗಳ ಮಂಡಲ ಪೂಜೆಯ ನಂತರ 14 ಮಾರ್ಚ್ 2024 ರಂದು ಪ್ರಾಣಪ್ರತಿಷ್ಠಾಪನೆ ನಡೆಯಿತು.";}
function translateAboutToEnglish(){return "Welcome to Shri Varasiddhi Vinayaka Temple, a place of devotion, tradition and community at Arvind Oasis. The Bhoomi Puja was held on 23 November 2023, followed by the 48-day Mandala Puja and Prana Prathishtapana on 14 March 2024.";}
function link(){window.location.href='form.html';}
function link2(){window.open('https://docs.google.com/spreadsheets/d/1CfJ0WdT2DBdFmr4u_Z6-xIhtt73yc_e48UgzFMnDHhk/edit?usp=sharing','_blank','noopener');}
function link3(){window.open('https://docs.google.com/spreadsheets/d/1uvOow48ouaK5p0HScEJHpUkuUVi_qhWx0-RYH-2K8SY/edit?gid=0#gid=0','_blank','noopener');}
function link4(){window.open('https://docs.google.com/spreadsheets/d/1cPysMmwDhZwQcNfhoGa-bLmtRz16WldO1w7aaVYJDqw/edit?usp=sharing','_blank','noopener');}
function link5(){window.open('https://chat.whatsapp.com/Ky1DZdkCxSi54b2yJhLCul','_blank','noopener');}
function showOccasion(occasion,button){document.querySelectorAll('[id^="occasion-"]').forEach(section=>{section.style.display=section.id===`occasion-${occasion}`?'block':'none';});document.querySelectorAll('.toggle-buttons .occasion-button').forEach(btn=>btn.classList.toggle('active',btn===button));const select=document.getElementById('occasion-select');if(select)select.value=String(occasion);const target=document.getElementById(`occasion-${occasion}`);if(target)target.scrollIntoView({behavior:'smooth',block:'start'});}
function handleOccasionSelect(value){const n=parseInt(value,10);if(Number.isInteger(n))showOccasion(n,null);}
function redirectToUPI(){const upiId='0798062a0170493.bqr@kotak';const receiverName='ARVIND OASIS APARTMENTS OWNERS ASSOCIATION TEMPLE';location.href=`upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(receiverName)}&cu=INR`;}
function toggleMenu(){const nav=document.querySelector('.nav-links');if(nav)nav.classList.toggle('show');}
function closeMenu(){const nav=document.querySelector('.nav-links');if(nav)nav.classList.remove('show');}
function home(){location.href='main.html';}
function checksignin(){if(localStorage.getItem('input')!=='true')location.replace('resident-access.html');}
function idxto(){location.href='resident-dashboard.html';}
document.addEventListener('click',event=>{const header=document.querySelector('.main-header');const nav=document.querySelector('.nav-links');const cta=document.querySelector('.cta-button');if(header&&nav&&nav.classList.contains('show')&&!header.contains(event.target)&&(!cta||!cta.contains(event.target)))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.addEventListener('DOMContentLoaded',()=>{const exit=document.querySelector('.exit-button');if(exit)exit.addEventListener('click',()=>{['email','flatNumber','input','residentName'].forEach(key=>localStorage.removeItem(key));location.href='resident-access.html';});});
