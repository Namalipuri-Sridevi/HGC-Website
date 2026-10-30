(() => {
const products=window.HGC_PRODUCTS||[], categories=window.HGC_CATEGORIES||[], categoryCopy=window.HGC_CATEGORY_COPY||{};
const app=document.getElementById('app');
const categoryBySlug=Object.fromEntries(categories.map(c=>[c.slug,c]));
const catImage=slug=>`assets/categories-hd/${slug}.jpg`;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeHex=(hex,fallback='#e7ece5')=>/^#[0-9A-F]{6}$/i.test(hex||'')?hex:fallback;
const hexLightness=hex=>{const h=safeHex(hex).slice(1);const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return (0.2126*r+0.7152*g+0.0722*b)/255};
const productPath=p=>`#/product/${p.categorySlug}/${p.slug}`;
const productByRoute=(cat,slug)=>products.find(p=>p.categorySlug===cat&&p.slug===slug);
const productCount=slug=>products.filter(p=>p.categorySlug===slug).length;
const colorLabel=p=>p.darkHex||p.lightHex||'#e6e9e4';
const shadeGroup=p=>{const n=((p.name||'')+' '+(p.ciNumber||'')).toLowerCase(); if(/yellow|gold/.test(n))return'Yellow';if(/orange/.test(n))return'Orange';if(/pink|magenta|rose/.test(n))return'Pink';if(/red|scarlet|maroon/.test(n))return'Red';if(/blue|navy|turquoise|cyan/.test(n))return'Blue';if(/violet|purple/.test(n))return'Violet';if(/green|olive/.test(n))return'Green';if(/brown|tan|chocolate|umber/.test(n))return'Brown';if(/black|grey|gray/.test(n))return'Black';return'Others'};
function navActive(route){document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===route));}
function headerMenuClose(){document.querySelector('.main-nav')?.classList.remove('open')}
document.getElementById('mobileMenu').addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',headerMenuClose));
function crumb(items){return `<div class="breadcrumbs"><a href="#/home">Home</a> ${items.map(it=>`/ ${it.href?`<a href="${it.href}">${esc(it.label)}</a>`:esc(it.label)}`).join(' ')}</div>`}
function categoryCard(c,i){return `<a class="category-card" href="#/products/${c.slug}" aria-label="Explore ${esc(c.name)}"><span class="category-num">${String(i+1).padStart(2,'0')}</span><span class="category-name">${esc(c.name)}</span><span class="category-image"><img src="${catImage(c.slug)}" alt="Illustration for ${esc(c.name)}" loading="lazy"></span><span class="card-arrow" aria-hidden="true">→</span></a>`}
function categoryGrid(){return `<div class="category-grid">${categories.map(categoryCard).join('')}</div>`}
function productSwatch(p){if(!p.darkHex&&!p.lightHex)return `<span class="shade-swatch missing" title="No HEX shade supplied"></span>`;if(!p.darkHex&&p.lightHex)return `<span class="shade-swatch" style="background:${p.lightHex}" title="Light HEX shade supplied; dark HEX unavailable"></span>`;const a=safeHex(p.darkHex),b=safeHex(p.lightHex,p.darkHex);return `<span class="shade-swatch" style="background:linear-gradient(90deg,${a} 0 50%,${b} 50% 100%)" title="${esc(p.name)} shade"></span>`}
function home(){
 navActive('home');
 return `<section class="hero home-hero">
   <div class="wrap hero-grid">
     <div class="hero-copy">
       <div class="eyebrow">Since 1963</div>
       <h1>Trusted suppliers<br>of dyes and<br>chemicals <span class="green">since 1963.</span></h1>
       <p class="body-copy">H. Gokaldas &amp; Co. trades in dyes, pigments and process chemicals, supplying manufacturers across India from established producers and trusted principals.</p>
       <a class="cta-link" href="#/products"><span class="round-arrow">→</span>Explore Our Products</a>
     </div>
     <div class="hero-art hero-reference-art" aria-label="H. Gokaldas &amp; Co. storefront with the exact Indian textile motif composition from the supplied reference">
       <img class="hero-office-reference" src="assets/hero-office-motif-reference.png" alt="H. Gokaldas &amp; Co. storefront surrounded by Indian textile motifs">
       <img class="hero-spool-overlay" src="assets/motif-spool-thread.png" alt="" aria-hidden="true">
     </div>
   </div>
 </section>
 <section class="section home-products" id="our-products">
   <div class="wrap">
     <div class="section-head"><div><div class="eyebrow">Our Products</div><h2>A wide range of <span class="green">dyes,</span><br><span class="green">pigments</span> and chemicals.</h2></div>
       <div class="side-copy"><p>From textile dyes to industrial chemicals, we supply high-quality products for a variety of applications.</p><a class="cta-link" href="#/products"><span class="round-arrow">→</span>View All Products</a></div>
     </div>
     ${categoryGrid()}
   </div>
 </section>
 <section class="finder-section home-finder-section motif-finder-section" id="product-finder">
   <div class="wrap finder-layout">
     <div class="finder-heading"><div class="eyebrow">Find the right product</div><h2>Product <span>Finder</span></h2><p>Search and filter our product range to find the right dyes, pigments or chemicals for your application.</p></div>
     <div class="finder-controls">${finderForm('home-finder')}<div id="homeFinderResults" class="home-finder-results"></div></div>
   </div>
 </section>
 <section class="go-section"><div class="wrap split">
   <div class="go-copy"><div class="eyebrow">GO DYES</div><h2>Vibrant colours<br>for your <span class="green">applications.</span></h2><p>A selected range of high-quality GO DYES for textile applications, offering bright shades, good fastness and consistent performance.</p><a class="cta-link" href="#/products/ucp-go-dyes"><span class="round-arrow">→</span>Explore GO DYES</a></div>
   <div class="go-art-wrap"><img class="go-art" src="assets/go-dyes-hd.png" alt="GO DYES colour swatches and textile worker illustration"></div>
 </div></section>
 <section class="global-section"><div class="wrap global-grid">
   <div class="global-copy"><div class="eyebrow">Our Reach</div><h2>Working with<br>trusted partners<br><span class="green">across the globe.</span></h2><p class="body-copy">Supplying manufacturers worldwide with consistent quality and dependable supply.</p></div>
   <div class="globe-visual globe-visual-rotating" aria-label="Three-dimensional rotating globe with India highlighted in green">
     <div class="hgc-globe-stage" id="hgc-globe-stage" role="img" aria-label="A rotating 3D Earth with India highlighted in green and named country markers">
       <div class="globe-label-layer" aria-hidden="true"></div>
     </div>
   </div>
 </div></section>
 <section class="contact-strip"><div class="contact-strip-grid"><img class="contact-art-piece contact-band-left" src="assets/contact-band-left-reference.jpg" alt="Thread spool and Indian textile motifs"><div class="contact-strip-copy"><div class="eyebrow">Get in touch</div><h2>Let's discuss<br>your <span class="green">requirements.</span></h2><p class="body-copy">We are here to help with product information, availability and enquiries.</p><a class="cta-link" href="#/contact"><span class="round-arrow">→</span>Contact Us</a></div><img class="contact-art-piece contact-band-right" src="assets/contact-band-right-reference.jpg" alt="Indian textile foliage and diamond motifs" aria-hidden="true"></div></section>`;
}
function finderForm(id,preCat=''){const cats=categories.map(c=>`<option value="${c.slug}" ${preCat===c.slug?'selected':''}>${esc(c.name)}</option>`).join('');return `<form class="finder-form" id="${id}"><div class="search-row"><span class="search-icon">⌕</span><input name="q" type="search" placeholder="Search by product name, CI number, shade or application..." aria-label="Search products"><button class="search-submit" type="submit" aria-label="Search">→</button></div><div class="filter-row"><div class="filter-field"><label>Product Category</label><select name="category"><option value="">All Categories</option>${cats}</select></div><div class="filter-field"><label>Dye Class</label><select name="dyeClass"><option value="">All Dye Classes</option>${[...new Set(products.map(p=>p.sourceType))].sort().map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join('')}</select></div><div class="filter-field"><label>Application</label><select name="application"><option value="">All Applications</option><option value="cellulosic">Cellulosic materials</option><option value="textile">Textiles</option><option value="paper">Paper</option><option value="leather">Leather</option><option value="silk">Silk</option><option value="jute">Jute</option></select></div><div class="filter-field"><label>Colour Shade</label><select name="shade"><option value="">All Shades</option>${['Yellow','Orange','Red','Blue','Violet','Green','Brown','Black','Pink','Others'].map(v=>`<option>${v}</option>`).join('')}</select></div></div><button class="finder-find-button" type="submit"><span class="finder-find-arrow">→</span> Find Products</button></form>`}
function matches(p,filters){const q=(filters.q||'').trim().toLowerCase();if(q&&!`${p.name} ${p.ciNumber} ${p.sourceType} ${categoryBySlug[p.categorySlug]?.name||''} ${p.usedIn||''} ${p.darkHex||''} ${p.lightHex||''} ${(categoryCopy[p.categorySlug]?.applications)||''}`.toLowerCase().includes(q))return false;if(filters.category&&p.categorySlug!==filters.category)return false;if(filters.dyeClass&&p.sourceType!==filters.dyeClass)return false;if(filters.shade&&shadeGroup(p)!==filters.shade)return false;if(filters.application){const app=filters.application;const text=((p.usedIn||'')+' '+(categoryCopy[p.categorySlug]?.applications||'')).toLowerCase();if(!text.includes(app))return false;}return true}
function resultTable(list,limit=0){if(!list.length)return `<div class="empty-state">No matching products found. Try another search or <a href="#/contact"><u>contact HGC</u></a> for help.</div>`;const shown=limit?list.slice(0,limit):list;return `<div class="table-wrap"><table class="product-table"><thead><tr><th>SHADE</th><th>PRODUCT NAME</th><th>CI NUMBER</th><th>PRODUCT TYPE</th><th></th></tr></thead><tbody>${shown.map(p=>`<tr onclick="location.hash='${productPath(p).replace(/'/g,"\\'")}'" tabindex="0" onkeydown="if(event.key==='Enter')location.hash='${productPath(p)}'"><td>${productSwatch(p)}</td><td><span class="product-name">${esc(p.name)}</span></td><td>${esc(p.ciNumber||'-')}</td><td>${esc(p.sourceType)}</td><td class="row-arrow">→</td></tr>`).join('')}</tbody></table></div>${limit&&list.length>limit?`<p class="results-summary">Showing ${shown.length} of ${list.length} matching products. <a href="#/finder"><u>View all results →</u></a></p>`:''}`}
function bindFinder(formId,outputId,limit=0){const form=document.getElementById(formId),out=document.getElementById(outputId);if(!form||!out)return;const run=()=>{const fd=new FormData(form);const filters={q:fd.get('q')||'',category:fd.get('category')||'',dyeClass:fd.get('dyeClass')||'',application:fd.get('application')||'',shade:fd.get('shade')||''};const list=products.filter(p=>matches(p,filters));out.innerHTML=`<div class="results-summary">${list.length} matching product${list.length===1?'':'s'}</div>${resultTable(list,limit)}`};form.addEventListener('submit',e=>{e.preventDefault();run()});form.querySelectorAll('select').forEach(s=>s.addEventListener('change',run));form.querySelector('input[name=q]').addEventListener('input',()=>{if(form.querySelector('input[name=q]').value.length>=2||!form.querySelector('input[name=q]').value)run()});if(formId==='home-finder')form.addEventListener('submit',()=>document.getElementById('homeFinderResults')?.scrollIntoView({behavior:'smooth',block:'start'}));}
function allProducts(){navActive('products');return `<section class="page-hero"><div class="wrap"><div class="eyebrow">Our Products</div><div class="page-title-row"><div><h1 class="serif">Our Product Range</h1><p class="body-copy">Explore HGC's range of dyes, pigments and chemicals. Select a category to view available products and shades.</p></div><img class="category-hero-art" src="assets/categories-hd/basic-dyes.jpg" alt="Illustrated product materials"></div></div></section><section class="section"><div class="wrap">${categoryGrid()}</div></section><section class="finder-section"><div class="wrap"><div class="finder-top"><div><div class="eyebrow">Find the right product</div><h2>Product <span class="green">Finder</span></h2></div><p>Search the catalogue by product name, CI number, category or shade.</p></div>${finderForm('all-products-finder')}<div id="allProductsResults"></div></div></section>`}
function categoryPage(slug){const c=categoryBySlug[slug];if(!c)return notFound();navActive('products');const copy=categoryCopy[slug]||{overview:`Explore the products listed under ${c.name}. For product-specific chemistry, specifications and suitability, contact H. Gokaldas & Co.`,applications:'Application details are not mapped to individual products in the supplied spreadsheet. Contact HGC with the product name and intended material for guidance.'};const list=products.filter(p=>p.categorySlug===slug);return `<section class="page-hero"><div class="wrap">${crumb([{label:'All Products',href:'#/products'},{label:c.name}])}<div class="page-title-row"><div><h1 class="serif">${esc(c.name)}</h1><p class="body-copy">${esc(copy.overview)}</p></div><img class="category-hero-art" src="${catImage(slug)}" alt="Illustration for ${esc(c.name)}"></div></div></section><section class="wrap"><div class="tabs" role="tablist"><button class="tab-btn active" data-tab="overview" role="tab" aria-selected="true">Overview</button><button class="tab-btn" data-tab="applications" role="tab" aria-selected="false">Applications</button><button class="tab-btn" data-tab="structure" role="tab" aria-selected="false">Chemical Structure</button></div><div class="tab-panel" id="categoryTabPanel">${esc(copy.overview)}</div></section><section class="shade-section"><div class="wrap"><div class="shade-head"><h2>All Shades <span class="small-note">(${list.length} listed)</span></h2><div class="inline-search"><input id="categorySearch" type="search" placeholder="Search by product name, CI number or shade..." aria-label="Search this category"><button id="categorySearchBtn" aria-label="Search">⌕</button></div></div><div class="shade-chips" id="shadeChips">${['All','Yellow','Orange','Red','Blue','Violet','Green','Brown','Black','Pink','Others'].map((v,i)=>`<button class="shade-chip ${i===0?'active':''}" data-shade="${v}">${v}</button>`).join('')}</div><div id="categoryProducts">${resultTable(list)}</div><div class="category-finder"><h3>Can't find your shade?</h3><p>Search across our full product range or contact us for assistance.</p><form id="categoryFinderForm"><div class="search-row"><span class="search-icon">⌕</span><input name="q" type="search" placeholder="Search by product name, CI number, shade or application..." aria-label="Search all products"><button class="search-submit" type="submit" aria-label="Search">→</button></div></form><div class="finder-bottom"><a class="outline-btn" href="#/finder?category=${slug}">Use our Product Finder</a><a class="solid-btn" href="#/contact">Contact Us</a></div></div></div></section>`}
function bindCategory(slug){let active='All';const input=document.getElementById('categorySearch'),out=document.getElementById('categoryProducts');const run=()=>{const q=(input.value||'').toLowerCase().trim();let list=products.filter(p=>p.categorySlug===slug);if(active!=='All')list=list.filter(p=>shadeGroup(p)===active);if(q)list=list.filter(p=>`${p.name} ${p.ciNumber} ${p.sourceType}`.toLowerCase().includes(q));out.innerHTML=resultTable(list)};input.addEventListener('input',run);document.getElementById('categorySearchBtn').addEventListener('click',run);document.querySelectorAll('[data-shade]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.shade;document.querySelectorAll('[data-shade]').forEach(x=>x.classList.toggle('active',x===b));run()}));document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-tab]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-selected',x===b?'true':'false')});const panel=document.getElementById('categoryTabPanel');if(b.dataset.tab==='overview')panel.innerHTML=esc((categoryCopy[slug]||{}).overview||`Explore products in ${categoryBySlug[slug].name}. Contact HGC for product-specific technical information.`);if(b.dataset.tab==='applications')panel.innerHTML=esc((categoryCopy[slug]||{}).applications||'Application details are not mapped to individual products in the supplied spreadsheet. Contact HGC with the product name and intended material for guidance.');if(b.dataset.tab==='structure')panel.innerHTML=`<div class="chemistry-card"><strong>Chemical Structure</strong><p>Product-specific molecular structures were not included in the supplied catalogue data. The diagram below is a general chemistry motif, not the structure of any listed product.</p><svg viewBox="0 0 560 150" role="img" aria-label="Illustrative molecular motif, not a product-specific chemical structure"><g fill="none" stroke="#1b7042" stroke-width="2.5"><path d="M65 75 L115 45 L165 75 L165 125 L115 145 L65 115 Z"/><path d="M165 75 L215 45 L265 75 L315 45 L365 75 L415 45 L465 75"/><path d="M315 45 L315 100 L365 130 L415 100 L415 45"/></g><g fill="#68B92E" stroke="#fff" stroke-width="2"><circle cx="65" cy="75" r="7"/><circle cx="115" cy="45" r="7"/><circle cx="165" cy="75" r="7"/><circle cx="165" cy="125" r="7"/><circle cx="115" cy="145" r="7"/><circle cx="65" cy="115" r="7"/><circle cx="215" cy="45" r="7"/><circle cx="265" cy="75" r="7"/><circle cx="315" cy="45" r="7"/><circle cx="315" cy="100" r="7"/><circle cx="365" cy="75" r="7"/><circle cx="365" cy="130" r="7"/><circle cx="415" cy="100" r="7"/><circle cx="415" cy="45" r="7"/><circle cx="465" cy="75" r="7"/></g></svg><p class="small-note">Illustrative only. Ask HGC for verified structure information for a specific grade.</p></div>`}));const form=document.getElementById('categoryFinderForm');form.addEventListener('submit',e=>{e.preventDefault();const q=form.elements.q.value.trim();location.hash=`#/finder?q=${encodeURIComponent(q)}`})}
function productDetail(cat,slug){const p=productByRoute(cat,slug);if(!p)return notFound();navActive('products');const c=categoryBySlug[p.categorySlug];const dark=safeHex(p.darkHex,p.lightHex||'#f1f3ef'),light=safeHex(p.lightHex,p.darkHex||'#f1f3ef');const darkText=hexLightness(dark)<.56;return `<section class="wrap product-detail-top">${crumb([{label:'All Products',href:'#/products'},{label:c.name,href:`#/products/${c.slug}`},{label:p.name}])}<div class="product-detail-grid"><div class="shade-artwork"><div class="shade-panel dark" style="background:${dark};color:${darkText?'#fff':'#151515'}"><span>Masstone · ${p.darkHex||'Not provided'}</span></div><div class="shade-panel" style="background:${light};color:${hexLightness(light)<.56?'#fff':'#222'}"><span>Reduction · ${p.lightHex||'Not provided'}</span></div></div><div class="detail-info"><div class="eyebrow">${esc(c.name)}</div><h1>${esc(p.name)}</h1><p class="small-note">Category: <a href="#/products/${c.slug}"><u>${esc(c.name)}</u></a></p><div class="product-meta"><div class="meta-item"><small>C.I. Number / Name</small><strong>${esc(p.ciNumber||'Not provided')}</strong></div><div class="meta-item"><small>Source Category</small><strong>${esc(p.sourceType)}</strong></div><div class="meta-item"><small>Shade HEX</small><strong>${esc(p.darkHex||'Not provided')}</strong></div><div class="meta-item"><small>Reduction HEX</small><strong>${esc(p.lightHex||'Not provided')}</strong></div></div><p class="detail-copy">This listing reflects the shade and identifiers available in the HGC product spreadsheet. Contact HGC to confirm grade-specific technical information, availability and suitability for your application.</p><div class="detail-actions"><a class="solid-btn" href="#/contact?product=${encodeURIComponent(p.name)}">Request this grade</a><a class="outline-btn" href="mailto:mail@gokaldas.com?subject=${encodeURIComponent('Product enquiry: '+p.name)}&body=${encodeURIComponent('Hello H. Gokaldas & Co.,\n\nI would like information about '+p.name+' in '+c.name+'.\n\nPlease share availability and relevant technical details.')}" >Email enquiry</a></div></div></div></section><section class="wrap detail-columns"><div><h2>Identification</h2><div class="spec-list"><div class="spec-row"><span>Product name</span><strong>${esc(p.name)}</strong></div><div class="spec-row"><span>C.I. number / name</span><strong>${esc(p.ciNumber||'Not provided')}</strong></div><div class="spec-row"><span>Category</span><strong>${esc(c.name)}</strong></div><div class="spec-row"><span>Type in source file</span><strong>${esc(p.sourceType)}</strong></div></div></div><div><h2>Applications</h2><p class="detail-copy">${esc((categoryCopy[p.categorySlug]||{}).applications||'The supplied spreadsheet does not specify product-level applications for this item. Contact HGC to confirm suitability for your material and process.')}</p><a class="cta-link" href="#/contact?product=${encodeURIComponent(p.name)}"><span class="round-arrow">→</span>Ask about this product</a></div></section>`}
function finderPage(){navActive('finder');return `<section class="page-hero"><div class="wrap"><div class="eyebrow">Find the right product</div><h1>Product <span class="green">Finder</span></h1><p class="body-copy">Search by product name, CI number, category or shade. Filter the catalogue to find the closest match.</p></div></section><section class="section"><div class="wrap">${finderForm('full-finder')}<div id="fullFinderResults" class="finder-results"></div></div></section>`}
function productCard(p){return `<a class="product-card" href="${productPath(p)}"><div class="swatches"><span style="background:${safeHex(p.darkHex)}"></span><span style="background:${safeHex(p.lightHex,p.darkHex||'#e6e9e4')}"></span></div><h3>${esc(p.name)}</h3><p>${esc(p.ciNumber||'C.I. number not provided')} · ${esc(categoryBySlug[p.categorySlug]?.name||p.sourceType)}</p></a>`}
function contactPage(){navActive('contact');const params=new URLSearchParams(location.hash.split('?')[1]||'');const product=params.get('product')||'';return `<section class="wrap contact-page"><div class="contact-grid"><div class="contact-info"><div class="eyebrow">Get in touch</div><h1>Let's discuss your <span class="green">requirements.</span></h1><p class="body-copy">We are here to help with product information, availability and enquiries.</p><div class="contact-details"><p><strong>Address</strong><br>2-4-1, Pat Bazar, Secunderabad - 500003, Hyderabad, India</p><p><strong>Phone</strong><br><a href="tel:+9127712850">+91 27712850, 2771085</a></p><p><strong>Email</strong><br><a href="mailto:mail@gokaldas.com">mail@gokaldas.com</a></p></div></div><form class="contact-form" id="contactForm"><h2>Send an enquiry</h2><p class="small-note">Complete the form and your email app will open with the enquiry details ready to send.</p><div class="form-grid"><div class="form-field"><label for="name">Your name *</label><input id="name" name="name" required autocomplete="name"></div><div class="form-field"><label for="company">Company</label><input id="company" name="company" autocomplete="organization"></div><div class="form-field"><label for="email">Email *</label><input id="email" name="email" type="email" required autocomplete="email"></div><div class="form-field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel"></div><div class="form-field full"><label for="product">Product / category</label><input id="product" name="product" value="${esc(product)}"></div><div class="form-field full"><label for="message">Your enquiry *</label><textarea id="message" name="message" required placeholder="Tell us what product or shade you are looking for..."></textarea></div></div><button class="solid-btn" type="submit">Prepare Email Enquiry →</button><div id="contactNotice" class="small-note" style="margin-top:12px"></div></form></div></section>`}
function legalPage(kind){return `<section class="wrap legal-page"><div class="eyebrow">H. Gokaldas &amp; Co.</div><h1>${kind==='privacy'?'Privacy Policy':'Terms & Conditions'}</h1><p class="body-copy">This page needs company-approved legal wording before publication. Please contact HGC for the applicable policy.</p><a class="outline-btn" href="#/contact">Contact Us</a></section>`}
function notFound(){return `<section class="wrap legal-page"><h1>Page not found</h1><p>The page may have moved.</p><a class="solid-btn" href="#/home">Return Home</a></section>`}
function render(){const raw=location.hash||'#/home';const [path,query='']=raw.slice(1).split('?');const parts=path.split('/').filter(Boolean);headerMenuClose();const isHome=parts.length===0||parts[0]==='home';document.body.classList.remove('home-reference-mode');if(window.hgcGlobeCleanup){window.hgcGlobeCleanup();window.hgcGlobeCleanup=null;}if(isHome){app.innerHTML=home();bindFinder('home-finder','homeFinderResults',5);startHgcGlobe();}else if(parts[0]==='products'&&parts.length===1){app.innerHTML=allProducts();bindFinder('all-products-finder','allProductsResults',8)}else if(parts[0]==='products'&&parts.length===2){app.innerHTML=categoryPage(parts[1]);bindCategory(parts[1])}else if(parts[0]==='product'&&parts.length>=3){app.innerHTML=productDetail(parts[1],parts.slice(2).join('/'))}else if(parts[0]==='finder'){app.innerHTML=finderPage();bindFinder('full-finder','fullFinderResults');const params=new URLSearchParams(query);const form=document.getElementById('full-finder');['q','category','dyeClass','application','shade'].forEach(k=>{if(params.get(k)&&form.elements[k])form.elements[k].value=params.get(k)});if(params.toString())form.requestSubmit()}else if(parts[0]==='contact'){app.innerHTML=contactPage();bindContactForm()}else if(parts[0]==='privacy'){app.innerHTML=legalPage('privacy')}else if(parts[0]==='terms'){app.innerHTML=legalPage('terms')}else{app.innerHTML=notFound()}window.scrollTo({top:0,behavior:'instant'});app.focus({preventScroll:true});}

function startHgcGlobe(){
 const host=document.getElementById('hgc-globe-stage');
 if(!host)return;
 const labelLayer=host.querySelector('.globe-label-layer');
 if(!window.THREE){host.classList.add('globe-fallback');return;}
 const THREE=window.THREE;
 let renderer,frame=0,alive=true,resize,texture;
 const resources=[];
 try{
   const scene=new THREE.Scene();
   const width=Math.max(1,host.clientWidth),height=Math.max(1,host.clientHeight);
   renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8));
   renderer.setSize(width,height,false);
   if('outputColorSpace' in renderer && THREE.SRGBColorSpace)renderer.outputColorSpace=THREE.SRGBColorSpace;
   else if('outputEncoding' in renderer && THREE.sRGBEncoding)renderer.outputEncoding=THREE.sRGBEncoding;
   renderer.setClearColor(0xffffff,0);
   host.insertBefore(renderer.domElement,host.firstChild);
   const camera=new THREE.PerspectiveCamera(34,width/height,.1,100);
   camera.position.set(0,0,3.35);
   const globeGroup=new THREE.Group();scene.add(globeGroup);
   const geometry=new THREE.SphereGeometry(1,96,64);resources.push(geometry);
   const material=new THREE.MeshPhongMaterial({color:0xffffff,specular:new THREE.Color(0x263b43),shininess:9});resources.push(material);
   const earth=new THREE.Mesh(geometry,material);globeGroup.add(earth);
   const loader=new THREE.TextureLoader();
   loader.load('assets/earth-map-india-green.png',tex=>{
     if(!alive){tex.dispose();return;}
     texture=tex;resources.push(tex);
     if(THREE.SRGBColorSpace)texture.colorSpace=THREE.SRGBColorSpace;else if(THREE.sRGBEncoding)texture.encoding=THREE.sRGBEncoding;
     texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
     material.map=texture;material.needsUpdate=true;
   },undefined,err=>console.warn('Earth texture failed to load',err));
   const atmosphereGeometry=new THREE.SphereGeometry(1.018,72,48);resources.push(atmosphereGeometry);
   const atmosphereMaterial=new THREE.MeshBasicMaterial({color:0x68b92e,transparent:true,opacity:.10,side:THREE.BackSide});resources.push(atmosphereMaterial);
   globeGroup.add(new THREE.Mesh(atmosphereGeometry,atmosphereMaterial));
   scene.add(new THREE.AmbientLight(0xffffff,1.25));
   const keyLight=new THREE.DirectionalLight(0xffffff,1.55);keyLight.position.set(-2,2,4);scene.add(keyLight);
   const fillLight=new THREE.DirectionalLight(0xe2eee6,.42);fillLight.position.set(3,-1,2);scene.add(fillLight);
   const toVec=(lat,lon,r=1.012)=>{
     const phi=(90-lat)*Math.PI/180,theta=(lon+180)*Math.PI/180;
     return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));
   };
   const india=toVec(22.5,79.0,1.018);
   globeGroup.rotation.y=(Math.atan2(-india.x,india.z)+Math.PI*2)%(Math.PI*2);
   const addDot=(point,radius,color)=>{
     const g=new THREE.SphereGeometry(radius,16,12);const m=new THREE.MeshBasicMaterial({color});resources.push(g,m);
     const dot=new THREE.Mesh(g,m);dot.position.copy(point);globeGroup.add(dot);return dot;
   };
   const makeLabel=(name,origin=false)=>{
     const node=document.createElement('span');node.className='globe-country-label'+(origin?' is-origin':'');node.textContent=name;
     labelLayer.appendChild(node);return node;
   };
   const labelNodes=[];
   addDot(india,.026,0x68b92e);
   const indiaRingGeometry=new THREE.TorusGeometry(.043,.003,6,40),indiaRingMaterial=new THREE.MeshBasicMaterial({color:0x68b92e});resources.push(indiaRingGeometry,indiaRingMaterial);
   const indiaRing=new THREE.Mesh(indiaRingGeometry,indiaRingMaterial);indiaRing.position.copy(india);indiaRing.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),india.clone().normalize());globeGroup.add(indiaRing);
   labelNodes.push({node:makeLabel('India',true),point:india.clone()});
   // Country markers only — intentionally no route lines or arrows.
   const destinations=[
     {name:'United States',lat:38.9,lon:-77.0},
     {name:'United Kingdom',lat:51.5,lon:-.12},
     {name:'UAE',lat:25.2,lon:55.27},
     {name:'Kenya',lat:-1.29,lon:36.82},
     {name:'Singapore',lat:1.35,lon:103.82},
     {name:'Japan',lat:35.68,lon:139.69},
     {name:'Australia',lat:-33.87,lon:151.21}
   ];
   destinations.forEach(d=>{const point=toVec(d.lat,d.lon,1.014);addDot(point,.014,0x16894b);labelNodes.push({node:makeLabel(d.name),point:point.clone()});});
   resize=()=>{if(!alive)return;const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
   window.addEventListener('resize',resize,{passive:true});
   const animate=()=>{
     if(!alive)return;frame=requestAnimationFrame(animate);
     globeGroup.rotation.y+=.0017;
     renderer.render(scene,camera);
     const w=host.clientWidth,h=host.clientHeight;
     labelNodes.forEach(({node,point})=>{
       const world=globeGroup.localToWorld(point.clone());
       const facing=world.clone().normalize().dot(camera.position.clone().normalize());
       const projected=world.project(camera);const visible=facing>.16&&projected.z<1&&projected.z>-1;
       node.style.display=visible?'block':'none';
       if(visible){node.style.left=((projected.x*.5+.5)*w)+'px';node.style.top=((-projected.y*.5+.5)*h)+'px';}
     });
   };
   animate();
   window.hgcGlobeCleanup=()=>{alive=false;cancelAnimationFrame(frame);window.removeEventListener('resize',resize);labelNodes.forEach(({node})=>node.remove());resources.forEach(r=>r?.dispose?.());renderer?.dispose();renderer?.domElement?.remove();};
 }catch(err){console.warn('3D globe could not be initialized',err);host.classList.add('globe-fallback');}
}
function bindContactForm(){const f=document.getElementById('contactForm');f.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(f);const subject=`HGC Website Enquiry${fd.get('product')?' - '+fd.get('product'):''}`;const body=`Name: ${fd.get('name')}\nCompany: ${fd.get('company')}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone')}\nProduct/category: ${fd.get('product')}\n\nEnquiry:\n${fd.get('message')}`;document.getElementById('contactNotice').textContent='Opening your email app with the enquiry details…';location.href=`mailto:mail@gokaldas.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`})}
window.addEventListener('hashchange',render);render();
})();