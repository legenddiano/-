const header=document.querySelector('.site-header');
const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
const modal=document.querySelector('#productModal');
const modalImage=document.querySelector('#modalImage');
const modalCode=document.querySelector('#modalCode');
const modalTitle=document.querySelector('#modalTitle');
const modalDesc=document.querySelector('#modalDesc');

window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>20);
  const sections=[...document.querySelectorAll('main section[id]')];
  const y=window.scrollY+120;
  sections.forEach(section=>{
    const link=document.querySelector(`.desktop-nav a[href="#${section.id}"]`);
    if(link) link.classList.toggle('active',section.offsetTop<=y && section.offsetTop+section.offsetHeight>y);
  });
},{passive:true});

menuToggle?.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  mobileMenu.setAttribute('aria-hidden',String(!open));
});

document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
  mobileMenu.setAttribute('aria-hidden','true');
}));

const filters=document.querySelectorAll('.filter');
const cards=document.querySelectorAll('.product-card[data-category]');
filters.forEach(filter=>filter.addEventListener('click',()=>{
  filters.forEach(x=>x.classList.remove('active'));
  filter.classList.add('active');
  const value=filter.dataset.filter;
  cards.forEach(card=>{
    const show=value==='all'||card.dataset.category===value;
    card.style.display=show?'block':'none';
  });
}));

function openModal(card){
  modalImage.src=card.dataset.image;
  modalImage.alt=card.dataset.name;
  modalCode.textContent=card.dataset.code;
  modalTitle.textContent=card.dataset.name;
  modalDesc.textContent=card.dataset.desc;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.product-open').forEach(button=>button.addEventListener('click',()=>openModal(button.closest('.product-card'))));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target;
    const target=Number(el.dataset.count);
    const start=performance.now();
    const duration=900;
    const tick=now=>{
      const progress=Math.min((now-start)/duration,1);
      const value=Math.round(target*(1-Math.pow(1-progress,3)));
      el.textContent=new Intl.NumberFormat('fa-IR').format(value)+(target===100?'٪':'+');
      if(progress<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.6});
counters.forEach(el=>counterObserver.observe(el));

document.querySelector('#year').textContent=new Date().getFullYear();
