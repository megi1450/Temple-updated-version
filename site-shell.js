(() => {
  const file = (location.pathname.split('/').pop() || 'main.html').toLowerCase();
  const adminPages = new Set(['adminhome.html','flatsort.html','event.html','chart.html','donation-verification.html']);
  const residentPages = new Set(['resident-dashboard.html','profile.html','form.html','donations.html','payment.html','receipt.html','history.html']);
  const authPages = new Set(['resident-access.html','index1.html','login.html','pass.html']);
  const homePages = new Set(['main.html','index.html']);
  const isHomePage = homePages.has(file);
  const pageInfo = {
    'events.html':['Pujas & Sevas','Explore the temple services and contribution details.'],
    'donations.html':['Resident Donations','Support temple activities through the resident donation process.'],
    'gallery.html':['Temple Gallery','Moments from the templeâs ceremonies, worship and community celebrations.'],
    'announcements.html':['Official Announcements','Updates and notices published for the Arvind Oasis community.'],
    'committee.html':['Temple Committee','Temple administration and official contact information.'],
    'history.html':['Registration History','Review your previous temple registrations.'],
    'profile.html':['My Profile','View your registered resident details.'],
    'form.html':['Puja Registration','Complete your temple seva registration in a few simple steps.'],
    'payment.html':['Payment Information','Official payment details for resident temple contributions.'],
    'receipt.html':['Registration Receipt','Your temple registration acknowledgement.'],
    'adminhome.html':['Administration Dashboard','Manage temple registrations, residents and contributions.'],
    'flatsort.html':['Resident & Flat Records','Search resident records and registration details.'],
    'event.html':['Registration Management','Review registrations and export operational records.'],
    'chart.html':['Contribution Reports','Review contribution trends and event-wise summaries.'],
    'donation-verification.html':['Donation Verification','Review transaction references and update verification status.'],
    'terms.html':['Terms & Conditions','Please review the terms for using the temple website and resident services.'],
    '404.html':['Page Not Found','The page may have moved or is no longer available.']
  };
  const $ = (s, root=document) => root.querySelector(s);
  const pageKannada={'events.html':['à²ªà³à²à³à²à²³à³ à²®à²¤à³à²¤à³ à²¸à³à²µà³à²à²³à³','à²¦à³à²µà²¾à²²à²¯à²¦à²²à³à²²à²¿ à²²à²­à³à²¯à²µà²¿à²°à³à²µ à²ªà³à²à³à²à²³à³ à²®à²¤à³à²¤à³ à²à²¾à²£à²¿à²à³ à²µà²¿à²µà²°à²à²³à²¨à³à²¨à³ à²µà³à²à³à²·à²¿à²¸à²¿.'],'donations.html':['à²¨à²¿à²µà²¾à²¸à²¿à²à²³ à²¦à³à²£à²¿à²à³à²à²³à³','à²¦à³à²µà²¾à²²à²¯à²¦ à²à²à³à²µà²à²¿à²à³à²à²³à²¿à²à³ à²¨à²¿à²µà²¾à²¸à²¿à²à²³à²¾à²à²¿ à²à²¾à²£à²¿à²à³ à²¸à²²à³à²²à²¿à²¸à²¿.'],'gallery.html':['à²¦à³à²µà²¾à²²à²¯à²¦ à²à²¿à²¤à³à²°à²¶à²¾à²²à³','à²¦à³à²µà²¾à²²à²¯à²¦ à²ªà³à²à³à²à²³à³, à²¸à²®à²¾à²°à²à²­à²à²³à³ à²®à²¤à³à²¤à³ à²¸à²®à³à²¦à²¾à²¯à²¦ à²à³à²·à²£à²à²³à³.'],'announcements.html':['à²à²§à²¿à²à³à²¤ à²ªà³à²°à²à²à²£à³à²à²³à³','à²à²°à²µà²¿à²à²¦à³ à²à²¯à²¸à²¿à²¸à³ à²¸à²®à³à²¦à²¾à²¯à²à³à²à²¾à²à²¿ à²ªà³à²°à²à²à²¿à²¸à²²à²¾à²¦ à²®à²¾à²¹à²¿à²¤à²¿à²à²³à³.'],'committee.html':['à²¦à³à²µà²¾à²²à²¯ à²¸à²®à²¿à²¤à²¿','à²¦à³à²µà²¾à²²à²¯à²¦ à²à²¡à²³à²¿à²¤ à²®à²¤à³à²¤à³ à²à²§à²¿à²à³à²¤ à²¸à²à²ªà²°à³à² à²®à²¾à²¹à²¿à²¤à²¿.'],'history.html':['à²¨à³à²à²¦à²£à²¿ à²à²¤à²¿à²¹à²¾à²¸','à²¨à²¿à²®à³à²® à²¹à²¿à²à²¦à²¿à²¨ à²ªà³à²à²¾ à²¨à³à²à²¦à²£à²¿à²à²³à²¨à³à²¨à³ à²µà³à²à³à²·à²¿à²¸à²¿.'],'form.html':['à²ªà³à²à³ à²¨à³à²à²¦à²£à²¿','à²à³à²²à²µà³ à²¸à²°à²³ à²¹à²à²¤à²à²³à²²à³à²²à²¿ à²¨à²¿à²®à³à²® à²¸à³à²µà²¾ à²¨à³à²à²¦à²£à²¿à²¯à²¨à³à²¨à³ à²ªà³à²°à³à²£à²à³à²³à²¿à²¸à²¿.'],'payment.html':['à²ªà²¾à²µà²¤à²¿ à²®à²¾à²¹à²¿à²¤à²¿','à²¦à³à²µà²¾à²²à²¯à²¦ à²à²¾à²£à²¿à²à³à²à²³à²¿à²à³ à²à²§à²¿à²à³à²¤ à²ªà²¾à²µà²¤à²¿ à²µà²¿à²µà²°à²à²³à³.'],'receipt.html':['à²¨à³à²à²¦à²£à²¿ à²°à²¸à³à²¦à²¿','à²¨à²¿à²®à³à²® à²¦à³à²µà²¾à²²à²¯à²¦ à²¨à³à²à²¦à²£à²¿ à²¸à³à²µà³à²à³à²¤à²¿.'],'adminhome.html':['à²à²¡à²³à²¿à²¤ à²¡à³à²¯à²¾à²¶à³âà²¬à³à²°à³à²¡à³','à²¨à³à²à²¦à²£à²¿à²à²³à³, à²¨à²¿à²µà²¾à²¸à²¿à²à²³à³ à²®à²¤à³à²¤à³ à²à²¾à²£à²¿à²à³à²à²³à²¨à³à²¨à³ à²¨à²¿à²°à³à²µà²¹à²¿à²¸à²¿.'],'flatsort.html':['à²¨à²¿à²µà²¾à²¸à²¿ à²®à²¤à³à²¤à³ à²«à³à²²à²¾à²à³ à²¦à²¾à²à²²à³à²à²³à³','à²¨à²¿à²µà²¾à²¸à²¿ à²¦à²¾à²à²²à³à²à²³à³ à²®à²¤à³à²¤à³ à²¨à³à²à²¦à²£à²¿ à²µà²¿à²µà²°à²à²³à²¨à³à²¨à³ à²¹à³à²¡à³à²à²¿.'],'event.html':['à²¨à³à²à²¦à²£à²¿ à²¨à²¿à²°à³à²µà²¹à²£à³','à²¨à³à²à²¦à²£à²¿à²à²³à²¨à³à²¨à³ à²ªà²°à²¿à²¶à³à²²à²¿à²¸à²¿ à²®à²¤à³à²¤à³ à²µà²°à²¦à²¿à²à²³à²¨à³à²¨à³ à²°à²«à³à²¤à³ à²®à²¾à²¡à²¿.'],'chart.html':['à²à²¾à²£à²¿à²à³ à²µà²°à²¦à²¿à²à²³à³','à²à²¾à²°à³à²¯à²à³à²°à²®à²µà²¾à²°à³ à²à²¾à²£à²¿à²à³à²à²³ à²¸à²¾à²°à²¾à²à²¶à²µà²¨à³à²¨à³ à²µà³à²à³à²·à²¿à²¸à²¿.'],'donation-verification.html':['à²¦à³à²£à²¿à²à³ à²ªà²°à²¿à²¶à³à²²à²¨à³','à²µà²¹à²¿à²µà²¾à²à²¿à²¨ à²µà²¿à²µà²°à²à²³à²¨à³à²¨à³ à²ªà²°à²¿à²¶à³à²²à²¿à²¸à²¿ à²®à²¤à³à²¤à³ à²¸à³à²¥à²¿à²¤à²¿à²¯à²¨à³à²¨à³ à²¨à²µà³à²à²°à²¿à²¸à²¿.'],'terms.html':['à²¨à²¿à²¯à²®à²à²³à³ à²®à²¤à³à²¤à³ à²·à²°à²¤à³à²¤à³à²à²³à³','à²¦à³à²µà²¾à²²à²¯à²¦ à²µà³à²¬à³âà²¸à³à²à³ à²®à²¤à³à²¤à³ à²¨à²¿à²µà²¾à²¸à²¿ à²¸à³à²µà³à²à²³ à²¬à²³à²à³à²¯ à²¨à²¿à²¯à²®à²à²³à²¨à³à²¨à³ à²à²¦à²¿.']};
  const brand = `<a class="site-brand" href="main.html"><img src="assets/branding/logos/logo3.avif" alt="Temple emblem"><span><span class="site-brand__name">Shri Varasiddhi<br>Vinayaka Temple</span><span class="site-brand__sub">Arvind Oasis</span></span></a>`;
  function hasResidentSession(){return localStorage.getItem('input')==='true'&&!!localStorage.getItem('flatNumber')&&!!localStorage.getItem('residentName')&&!!localStorage.getItem('email');}
  function accountControl(){const signedIn=hasResidentSession();const href=signedIn?'profile.html':'resident-access.html';const en=signedIn?'My profile':'Resident account';const kn=signedIn?'à²¨à²¨à³à²¨ à²ªà³à²°à³à²«à³à²²à³':'à²¨à²¿à²µà²¾à²¸à²¿ à²à²¾à²¤à³';return `<a class='account-button' href='${href}' aria-label='${en}' title='${en}'><span class='account-avatar' aria-hidden='true'><svg viewBox='0 0 24 24' width='19' height='19' fill='none' stroke='currentColor' stroke-width='1.8'><circle cx='12' cy='8' r='3.5'/><path d='M4.8 20c.7-3.4 3.2-5.2 7.2-5.2s6.5 1.8 7.2 5.2'/></svg></span><span class='account-label' data-en='${en}' data-kn='${kn}'>${en}</span></a>`;}
  function publicHeader(showLanguage=false){return `<header class="site-header"><div class="site-topline"><span>Official temple website</span><span>Arvind Oasis Â· Bengaluru</span></div><div class="site-header__inner">${brand}<button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false">â°</button><nav class="site-nav" aria-label="Main navigation"><a href="main.html" data-en="Home" data-kn="à²®à³à²à²ªà³à²">Home</a><details class="nav-dropdown"><summary data-en="Temple" data-kn="à²¦à³à²µà²¾à²²à²¯">Temple</summary><div class="nav-dropdown__menu"><a href="history.html" data-en="Temple history" data-kn="à²¦à³à²µà²¾à²²à²¯à²¦ à²à²¤à²¿à²¹à²¾à²¸">Temple history</a><a href="committee.html" data-en="Committee" data-kn="à²¸à²®à²¿à²¤à²¿">Committee</a><a href="terms.html" data-en="Terms & policies" data-kn="à²¨à²¿à²¯à²®à²à²³à³">Terms & policies</a></div></details><details class="nav-dropdown"><summary data-en="Worship" data-kn="à²ªà³à²à³à²à²³à³">Worship</summary><div class="nav-dropdown__menu"><a href="events.html" data-en="Pujas & sevas" data-kn="à²ªà³à²à³à²à²³à³ à²®à²¤à³à²¤à³ à²¸à³à²µà³à²à²³à³">Pujas & sevas</a><a href="events.html#events" data-en="Contribution details" data-kn="à²à²¾à²£à²¿à²à³ à²µà²¿à²µà²°à²à²³à³">Contribution details</a></div></details><a href="events.html" data-en="Events" data-kn="à²à²¾à²°à³à²¯à²à³à²°à²®à²à²³à³">Events</a><a href="announcements.html" data-en="Notices" data-kn="à²ªà³à²°à²à²à²£à³à²à²³à³">Notices</a><a href="gallery.html" data-en="Gallery" data-kn="à²à²¿à²¤à³à²°à²¶à²¾à²²à³">Gallery</a><a href="committee.html" data-en="Contact" data-kn="à²¸à²à²ªà²°à³à²">Contact</a></nav><div class="site-actions">${showLanguage?`<button class="language-button" type="button" data-language-toggle aria-label="Switch language">à²à²¨à³à²¨à²¡ / EN</button>`:""}${accountControl()}</div></div></header>`;}
  function residentHeader(){return `<header class="site-header site-header--resident"><div class="site-topline"><span>Resident services</span><span>Shri Varasiddhi Vinayaka Temple</span></div><div class="site-header__inner">${brand}<button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false">â°</button><nav class="site-nav" aria-label="Resident navigation"><a href="resident-dashboard.html">Dashboard</a><a href="events.html">Pujas &amp; Sevas</a><a href="form.html">Register</a><a href="donations.html">Donations</a><a href="history.html">History</a><a href="announcements.html">Notices</a></nav><div class="site-actions">${accountControl()}</div></div></header>`;}
  function adminHeader(){return `<header class="site-header site-header--admin"><div class="site-topline"><span>Restricted administration</span><span>Shri Varasiddhi Vinayaka Temple</span></div><div class="site-header__inner">${brand}<button class="nav-toggle" type="button" aria-label="Open administration navigation" aria-expanded="false">â°</button><nav class="site-nav" aria-label="Administration navigation"><a href="adminhome.html">Overview</a><a href="flatsort.html">Residents</a><a href="event.html">Registrations</a><a href="donation-verification.html">Donations</a><a href="Chart.html">Reports</a></nav><span class="admin-label">Administration</span><div class="site-actions"><a class="resident-button" href="main.html">View website</a><button class="resident-button" type="button" data-admin-logout>Log out</button></div></div></header>`;}
  function footer(admin=false){return `<footer class="site-footer${admin?' site-footer--admin':''}"><div class="site-footer__inner"><div><h3>Shri Varasiddhi Vinayaka Temple</h3><p>A place of devotion, tradition and community at Arvind Oasis.</p><p>Official temple information and resident services.</p></div><div><h3>Explore</h3><div class="site-footer__links"><a href="history.html">Temple history</a><a href="events.html">Pujas & sevas</a><a href="announcements.html">Announcements</a><a href="gallery.html">Gallery</a></div></div><div><h3>Resident services</h3><div class="site-footer__links"><a href="resident-access.html">Resident access</a><a href="donations.html">Donations</a><a href="history.html">Registration history</a><a href="committee.html">Contact & committee</a></div></div></div><div class="site-footer__bottom"><span>Â© ${new Date().getFullYear()} Shri Varasiddhi Vinayaka Temple Â· Arvind Oasis</span><span>Arvind Oasis Â· Bengaluru</span></div></footer>`;}
  function authHeader(){const sub=file==='pass.html'?'Arvind Oasis Â· Administration':'Arvind Oasis Â· Resident access';return `<div class='auth-brand'><img src='assets/branding/logos/logo3.avif' alt='Temple emblem'><div><strong>Shri Varasiddhi Vinayaka Temple</strong><small>${sub}</small></div></div>`;}
  function setPageIntro(){const info=pageInfo[file];if(!info||file==='main.html'||file==='index.html'||authPages.has(file))return;const intro=document.createElement('section');intro.className='site-page-intro';const kn=pageKannada[file]||[info[0],info[1]];intro.innerHTML=`<span class="site-page-intro__eyebrow">${adminPages.has(file)?'Temple administration':'Shri Varasiddhi Vinayaka Temple Â· Arvind Oasis'}</span><h1 data-en="${info[0]}" data-kn="${kn[0]}">${info[0]}</h1><p data-en="${info[1]}" data-kn="${kn[1]}">${info[1]}</p>`;const main=$('main');if(main)main.before(intro);else{const first=[...document.body.children].find(el=>!['SCRIPT','STYLE'].includes(el.tagName)&&!el.classList.contains('legacy-chrome'));if(first)first.before(intro);else document.body.append(intro);}}
  function wrapContent(){if(file==='main.html'||file==='index.html'||authPages.has(file))return;const main=$('main');if(main){main.classList.add('site-content');return;}const nodes=[...document.body.children].filter(el=>!['SCRIPT','STYLE'].includes(el.tagName)&&!el.classList.contains('site-header')&&!el.classList.contains('site-page-intro')&&!el.classList.contains('site-footer')&&!el.classList.contains('legacy-chrome')&&el.tagName!=='DIALOG');if(!nodes.length)return;const content=document.createElement('main');content.className='site-content';nodes[0].before(content);nodes.forEach(node=>content.append(node));}
  const translationMemory=new Map();const translationPending=new Map();let translationRun=0;
  const fallbackTranslations={
    'Home':'à²®à³à²à²ªà³à²','Temple':'à²¦à³à²µà²¾à²²à²¯','Events':'à²à²¾à²°à³à²¯à²à³à²°à²®à²à²³à³','Notices':'à²ªà³à²°à²à²à²£à³à²à²³à³','Gallery':'à²à²¿à²¤à³à²°à²¶à²¾à²²à³','Contact':'à²¸à²à²ªà²°à³à²','Resident access':'à²¨à²¿à²µà²¾à²¸à²¿ à²ªà³à²°à²µà³à²¶','Resident Login':'à²¨à²¿à²µà²¾à²¸à²¿ à²²à²¾à²à²¿à²¨à³','My profile':'à²¨à²¨à³à²¨ à²ªà³à²°à³à²«à³à²²à³','Log out':'à²²à²¾à²à³ à²à²à³','Dashboard':'à²¡à³à²¯à²¾à²¶à³âà²¬à³à²°à³à²¡à³','Register':'à²¨à³à²à²¦à²£à²¿','Donations':'à²¦à³à²£à²¿à²à³à²à²³à³','History':'à²à²¤à²¿à²¹à²¾à²¸','Submit':'à²¸à²²à³à²²à²¿à²¸à²¿','Cancel':'à²°à²¦à³à²¦à³à²®à²¾à²¡à²¿','Search':'à²¹à³à²¡à³à²à²¿','Name':'à²¹à³à²¸à²°à³','Full name':'à²ªà³à²°à³à²£ à²¹à³à²¸à²°à³','Email':'à²à²®à³à²²à³','Mobile number':'à²®à³à²¬à³à²²à³ à²¸à²à²à³à²¯à³','Flat number':'à²«à³à²²à²¾à²à³ à²¸à²à²à³à²¯à³','Preferred date':'à²à²¦à³à²¯à²¤à³à²¯ à²¦à²¿à²¨à²¾à²à²','Loading...':'à²²à³à²¡à³ à²à²à³à²¤à³à²¤à²¿à²¦à³...','View details':'à²µà²¿à²µà²°à²à²³à²¨à³à²¨à³ à²µà³à²à³à²·à²¿à²¸à²¿','Read more':'à²à²¨à³à²¨à²·à³à²à³ à²à²¦à²¿','Back':'à²¹à²¿à²à²¦à³','Save':'à²à²³à²¿à²¸à²¿','Close':'à²®à³à²à³à²à²¿','Puja registration':'à²ªà³à²à³ à²¨à³à²à²¦à²£à²¿','Temple donations':'à²¦à³à²µà²¾à²²à²¯à²¦ à²¦à³à²£à²¿à²à³à²à²³à³','Registration history':'à²¨à³à²à²¦à²£à²¿ à²à²¤à²¿à²¹à²¾à²¸','Official announcements':'à²à²§à²¿à²à³à²¤ à²ªà³à²°à²à²à²£à³à²à²³à³'
  };
  async function translateText(text,lang){
    if(!text.trim())return text;
    const key='temple:'+lang+':'+text;
    if(translationMemory.has(key))return translationMemory.get(key);
    try{const saved=localStorage.getItem(key);if(saved){translationMemory.set(key,saved);return saved;}}catch(e){}
    if(lang==='kn'&&fallbackTranslations[text])return fallbackTranslations[text];
    if(lang==='en'){const match=Object.entries(fallbackTranslations).find(([,kn])=>kn===text);if(match)return match[0];}
    if(translationPending.has(key))return translationPending.get(key);
    const task=(async()=>{
      const source=lang==='kn'?'en':'kn';const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),9000);
      try{const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl='+source+'&tl='+lang+'&dt=t&q='+encodeURIComponent(text);const response=await fetch(url,{signal:controller.signal,mode:'cors'});if(!response.ok)throw new Error('Translation service unavailable');const data=await response.json();const translated=(data[0]||[]).map(part=>part[0]||'').join('');if(!translated)throw new Error('Empty translation');translationMemory.set(key,translated);try{localStorage.setItem(key,translated);}catch(e){}return translated;}catch(error){return lang==='kn'?(fallbackTranslations[text]||text):text;}finally{clearTimeout(timer);}
    })();
    translationPending.set(key,task);
    try{return await task;}finally{translationPending.delete(key);}
  }
  function collectTranslationTargets(lang){
    const nodes=[];const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);let node;
    while((node=walker.nextNode())){
      const parent=node.parentElement;if(!parent||parent.closest('script,style,noscript,svg,code,pre,textarea,input,[translate="no"],.site-brand,.language-button,[data-en][data-kn]'))continue;
      if(node.__templeRenderedText!==undefined&&node.nodeValue!==node.__templeRenderedText){node.__templeOriginalText=node.nodeValue;node.__templeTranslatedLang='';node.__templeRenderedText=undefined;}
      const original=node.__templeOriginalText===undefined?node.nodeValue:node.__templeOriginalText;
      if(!original||!original.trim()||/^[\s\d\W]+$/.test(original)||node.__templeTranslatedLang===lang)continue;
      node.__templeOriginalText=original;nodes.push(node);
    }
    const attrs=[];
    document.querySelectorAll('input,button,a,img,[aria-label],[title],meta[name="description"]').forEach(el=>{
      if(el.closest('.site-brand')||el.matches('[data-en][data-kn]')||el.classList.contains('language-button')||el.classList.contains('account-button'))return;
      const names=['placeholder','title','aria-label','alt',...(el.matches('meta[name="description"]')?['content']:[]),...(el.matches('input[type=submit],input[type=button],input[type=reset]')?['value']:[])];
      names.forEach(attr=>{
        if(!el.hasAttribute(attr))return;
        const suffix=attr.replace(/(^|-)([a-z])/g,(_,a,b)=>b.toUpperCase());const marker='templeOriginal'+suffix;const translatedMarker='templeTranslated'+suffix;const renderedMarker='templeRendered'+suffix;
        if(el.dataset[renderedMarker]!==undefined&&el.getAttribute(attr)!==el.dataset[renderedMarker]){el.dataset[marker]=el.getAttribute(attr);delete el.dataset[translatedMarker];delete el.dataset[renderedMarker];}
        if(!el.dataset[marker])el.dataset[marker]=el.getAttribute(attr);
        const original=el.dataset[marker];if(original&&original.trim()&&el.dataset[translatedMarker]!==lang)attrs.push({el,attr,marker,translatedMarker,renderedMarker,original});
      });
    });
    return {nodes,attrs};
  }
  async function applyAutomaticTranslation(lang){
    const run=++translationRun;const {nodes,attrs}=collectTranslationTargets(lang);const isKannada=text=>/[\u0C80-\u0CFF]/.test(text);const needsTranslation=text=>lang==='kn'?!isKannada(text):isKannada(text);
    const restoreNodes=nodes.filter(node=>!needsTranslation(node.__templeOriginalText));restoreNodes.forEach(node=>{node.nodeValue=node.__templeOriginalText;node.__templeTranslatedLang=lang;node.__templeRenderedText=node.__templeOriginalText;});
    const restoreAttrs=attrs.filter(item=>!needsTranslation(item.original));restoreAttrs.forEach(({el,attr,marker,translatedMarker,renderedMarker})=>{const original=el.dataset[marker];el.setAttribute(attr,original);el.dataset[translatedMarker]=lang;el.dataset[renderedMarker]=original;});
    const workNodes=nodes.filter(node=>needsTranslation(node.__templeOriginalText));const workAttrs=attrs.filter(item=>needsTranslation(item.original));const unique=[...new Set([...workNodes.map(n=>n.__templeOriginalText),...workAttrs.map(a=>a.original)])];const translated=new Map();let cursor=0;
    async function worker(){while(cursor<unique.length){const text=unique[cursor++];translated.set(text,await translateText(text,lang));}}
    await Promise.all(Array.from({length:Math.min(5,unique.length)},worker));if(run!==translationRun)return;
    workNodes.forEach(node=>{const original=node.__templeOriginalText;if(node.isConnected&&translated.has(original)){const value=translated.get(original);node.nodeValue=value;node.__templeTranslatedLang=lang;node.__templeRenderedText=value;}});
    workAttrs.forEach(({el,attr,translatedMarker,renderedMarker,original})=>{if(el.isConnected&&translated.has(original)){const value=translated.get(original);el.setAttribute(attr,value);el.dataset[translatedMarker]=lang;el.dataset[renderedMarker]=value;}});
  }
  function applyLanguage(lang){if(!isHomePage)lang='en';lang=lang==='kn'?'kn':'en';document.documentElement.lang=lang;if(isHomePage){localStorage.setItem('templeLanguage',lang);window.dispatchEvent(new CustomEvent('templelanguagechange',{detail:{language:lang}}));}document.querySelectorAll('[data-en][data-kn]').forEach(el=>{el.textContent=lang==='kn'?el.dataset.kn:el.dataset.en;});document.querySelectorAll('[data-language-toggle]').forEach(btn=>{btn.textContent=lang==='kn'?'English':'à²à²¨à³à²¨à²¡';btn.setAttribute('aria-label',lang==='kn'?'Switch to English':'à²à²¨à³à²¨à²¡à²à³à²à³ à²¬à²¦à²²à²¾à²¯à²¿à²¸à²¿');btn.title=lang==='kn'?'Switch to English':'à²à²¨à³à²¨à²¡à²à³à²à³ à²¬à²¦à²²à²¾à²¯à²¿à²¸à²¿';});document.body.classList.toggle('language-kn',lang==='kn');document.querySelectorAll('.account-button').forEach(link=>{const label=lang==='kn'?'à²¨à²¨à³à²¨ à²ªà³à²°à³à²«à³à²²à³':'My profile';link.setAttribute('aria-label',label);link.title=label;});if(isHomePage)applyAutomaticTranslation(lang);}
  window.toggleLanguage=()=>applyLanguage(document.documentElement.lang==='kn'?'en':'kn');window.toggleSiteLanguage=window.toggleLanguage;
  let languageObserver;function observeDynamicContent(){if(languageObserver)return;languageObserver=new MutationObserver(records=>{const changed=records.some(record=>(record.addedNodes&&record.addedNodes.length)||record.type==='attributes'||record.type==='characterData');if(changed)applyAutomaticTranslation(document.documentElement.lang==='kn'?'kn':'en');});languageObserver.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label','alt','value']});}
  function installTempleLoading(){
    if(window.TempleLoading)return;
    const overlay=document.createElement('div');overlay.className='temple-loading-overlay';overlay.id='templeLoadingOverlay';overlay.setAttribute('role','status');overlay.setAttribute('aria-live','polite');overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML='<div class="temple-loading-card"><span class="temple-loading-mark" aria-hidden="true"></span><span class="temple-loading-copy"><strong>Just a moment</strong><span data-loading-message>Preparing your page securely</span><span class="temple-loading-bar" aria-hidden="true"></span></span></div>';
    document.body.appendChild(overlay);
    let hideTimer;
    const show=(message='Please wait while we load your information')=>{clearTimeout(hideTimer);const label=overlay.querySelector('[data-loading-message]');if(label)label.textContent=message;overlay.classList.add('is-visible');overlay.setAttribute('aria-hidden','false');};
    const hide=()=>{overlay.classList.remove('is-visible');overlay.setAttribute('aria-hidden','true');};
    const button=(el,message='Working...')=>{if(!el||el.dataset.loadingActive==='true')return;el.dataset.loadingActive='true';el.setAttribute('aria-busy','true');el.dataset.originalLoadingText=el.innerHTML;el.innerHTML='<span class="temple-button-spinner" aria-hidden="true"></span>'+message;hideTimer=setTimeout(()=>{el.innerHTML=el.dataset.originalLoadingText||el.innerHTML;el.dataset.loadingActive='false';el.removeAttribute('aria-busy');delete el.dataset.originalLoadingText;},18000);};
    window.TempleLoading={show,hide,button};
    document.addEventListener('click',event=>{
      const link=event.target.closest('a[href]');
      if(link&&!event.defaultPrevented&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&(!link.target||link.target==='_self')&&!link.hasAttribute('download')){
        const href=link.getAttribute('href')||'';
        if(href&&!href.startsWith('#')&&!/^(mailto:|tel:|javascript:)/i.test(href)){
          try{const url=new URL(href,location.href);if(url.origin===location.origin&&url.pathname!==location.pathname){show('Opening '+(link.textContent.trim().replace(/\s+/g,' ').slice(0,45)||'the next page'));}}
          catch(e){}
        }
      }
      const btn=event.target.closest('button,[type="submit"],input[type="submit"]');
      if(btn&&!btn.form&&(/search|refresh|load|fetch|verify|register|submit|save|export|donat|continue|view records/i.test((btn.innerText||btn.value||btn.getAttribute('aria-label')||'').trim())||btn.hasAttribute('data-loading'))){button(btn);}
    },true);
    document.addEventListener('submit',event=>{const form=event.target;if(form&&form.tagName==='FORM'){show('Submitting securely. Please do not close this page');const submit=form.querySelector('button[type="submit"],input[type="submit"],button:not([type])');if(submit){submit.setAttribute('aria-busy','true');submit.dataset.loadingActive='true';}}},true);
    window.addEventListener('pageshow',hide);
    window.addEventListener('pagehide',()=>show('Moving to the next page'));
  }
  function init(){
    if(document.body.dataset.shellReady==='true')return;
    document.body.dataset.shellReady='true';
    installTempleLoading();
    document.body.classList.add('page-'+file.replace(/[^a-z0-9]+/g,'-'));
    if(!document.querySelector('link[data-temple-ux]')){const ux=document.createElement('link');ux.rel='stylesheet';ux.href='ux-improvements.css';ux.dataset.templeUx='true';document.head.appendChild(ux);}
    if(!document.querySelector('link[data-temple-polish]')){const polish=document.createElement('link');polish.rel='stylesheet';polish.href='site-polish.css';polish.dataset.templePolish='true';document.head.appendChild(polish);}
    if(['main.html','index.html','events.html','gallery.html','announcements.html','committee.html','terms.html','404.html'].includes(file))document.body.dataset.area='public';
    if(residentPages.has(file))document.body.dataset.area='resident';
    if(adminPages.has(file)||file==='pass.html')document.body.dataset.area='admin';
    // Hide old navigation/footer chrome but retain legacy elements required by existing page scripts.
    document.querySelectorAll('.hamburger2,.scrolling-container,.main-header,.main-footer,.main-footer2').forEach(el=>el.classList.add('legacy-chrome'));
    if(file==='donation-verification.html'){const h=$('body>header');const f=$('body>footer');if(h)h.classList.add('legacy-chrome');if(f)f.classList.add('legacy-chrome');}
    if(isHomePage)document.body.insertAdjacentHTML('afterbegin',publicHeader(true));
    else if(adminPages.has(file))document.body.insertAdjacentHTML('afterbegin',adminHeader());
    else if(residentPages.has(file))document.body.insertAdjacentHTML('afterbegin',residentHeader());
    else if(authPages.has(file))document.body.insertAdjacentHTML('afterbegin',authHeader());
    else document.body.insertAdjacentHTML('afterbegin',publicHeader(false));
    setPageIntro();wrapContent();
    document.querySelectorAll('.site-nav a').forEach(link=>{const target=(link.getAttribute('href')||'').split('#')[0].toLowerCase();if(target===file){link.setAttribute('aria-current','page');}});
    if(hasResidentSession()&&isHomePage){document.querySelectorAll('.home-hero .hero-actions a,.resident-cta a').forEach(link=>{if(link.getAttribute('href')==='resident-access.html'){link.href='profile.html';link.textContent=localStorage.getItem('templeLanguage')==='kn'?'à²¨à²¨à³à²¨ à²ªà³à²°à³à²«à³à²²à³':'My profile';}});}

    if(!['redirectupi.html'].includes(file))document.body.insertAdjacentHTML('beforeend',footer(adminPages.has(file)));
    const toggle=$('.nav-toggle');if(toggle){toggle.addEventListener('click',()=>{const header=toggle.closest('.site-header');const open=header.classList.toggle('menu-open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Ã':'â°';});}
    document.querySelectorAll('[data-language-toggle]').forEach(btn=>btn.addEventListener('click',()=>window.toggleLanguage()));
    document.querySelectorAll('[data-logout]').forEach(btn=>btn.addEventListener('click',()=>{['email','flatNumber','input','residentName','residentDocId','residentSessionAt','residentUid'].forEach(k=>localStorage.removeItem(k));location.href='login.html';}));
    document.querySelectorAll('[data-admin-logout]').forEach(btn=>btn.addEventListener('click',()=>{sessionStorage.removeItem('login');location.href='pass.html';}));
    const fieldLabels={name:['Full name','à²ªà³à²°à³à²£ à²¹à³à²¸à²°à³'],date:['Preferred date','à²à²¦à³à²¯à²¤à³à²¯ à²¦à²¿à²¨à²¾à²à²'],mobileNumber:['Mobile number','à²®à³à²¬à³à²²à³ à²¸à²à²à³à²¯à³'],event:['Select puja / seva','à²ªà³à²à³ / à²¸à³à²µà³ à²à²¯à³à²à³à²®à²¾à²¡à²¿'],occasion:['Occasion','à²¸à²à²¦à²°à³à²­'],otherOccasion:['Specify occasion','à²¸à²à²¦à²°à³à²­à²µà²¨à³à²¨à³ à²¨à²®à³à²¦à²¿à²¸à²¿'],otherOccasionInput:['Specify other occasion','à²à²¤à²°à³ à²¸à²à²¦à²°à³à²­à²µà²¨à³à²¨à³ à²¨à²®à³à²¦à²¿à²¸à²¿'],receiptNumber:['Receipt number','à²°à²¸à³à²¦à²¿ à²¸à²à²à³à²¯à³'],monthFilter:['Month','à²¤à²¿à²à²à²³à³'],flatNumber:['Flat number','à²«à³à²²à²¾à²à³ à²¸à²à²à³à²¯à³'],filter:['Record type','à²¦à²¾à²à²²à³ à²ªà³à²°à²à²¾à²°'],password:['Admin password','à²¨à²¿à²°à³à²µà²¾à²¹à²à²° à²ªà²¾à²¸à³âà²µà²°à³à²¡à³'],donorName:['Donor name','à²¦à²¾à²¨à²¿à²à²³ à²¹à³à²¸à²°à³'],donationAmount:['Donation amount (â¹)','à²¦à³à²£à²¿à²à³ à²®à³à²¤à³à²¤ (â¹)'],utrNumber:['UPI transaction reference (UTR)','à²¯à³à²ªà²¿à² à²µà²¹à²¿à²µà²¾à²à²¿à²¨ à²à²²à³à²²à³à² (UTR)']};Object.entries(fieldLabels).forEach(([id,labels])=>{const field=document.getElementById(id);if(field&&!document.querySelector(`label[for="${id}"]`)){const label=document.createElement('label');label.htmlFor=id;label.textContent=labels[0];label.dataset.en=labels[0];label.dataset.kn=labels[1];field.before(label);}});
    const lang=isHomePage?(localStorage.getItem('templeLanguage')||'en'):'en';applyLanguage(lang);if(isHomePage)observeDynamicContent();else{document.querySelectorAll('.auth-language,.language-button,[data-language-toggle],#languageToggle,.language-toggle,[data-lang-toggle]').forEach(btn=>btn.remove());document.documentElement.lang='en';}
    if(authPages.has(file)&&file!=='pass.html'&&hasResidentSession())location.replace('profile.html');
    // Resident-only areas remain gated by the existing resident session flow.
    if(residentPages.has(file)&&!hasResidentSession())location.replace('resident-access.html');
    if(adminPages.has(file)&&sessionStorage.getItem('login')!=='true')location.replace('pass.html');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
