// DOM helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Loader
window.addEventListener('load', () => {
  const loader = $('#page-loader');
  if(loader){ loader.style.opacity = 0; setTimeout(()=> loader.remove(), 600); }

  // reveal initial fades
  setTimeout(()=> {
    document.querySelectorAll('.fade').forEach(el => el.classList.add('visible'));
  }, 250);
});

// Intersection reveal for elements as they enter viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.15});

document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// Back to top
const back = $('#backTop');
if(back){
  window.addEventListener('scroll', () => {
    if(window.scrollY > 400) back.style.display = 'block'; else back.style.display = 'none';
  });
  back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
}

// Theme toggle with persistence
const themeToggle = $('#theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('bosstly-theme');
if(saved === 'light') root.classList.add('light');

if(themeToggle){
  themeToggle.addEventListener('click', () => {
    root.classList.toggle('light');
    if(root.classList.contains('light')) localStorage.setItem('bosstly-theme','light');
    else localStorage.removeItem('bosstly-theme');
  });
}

// Smooth nav links (also close mobile nav if implemented)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const href = a.getAttribute('href');
    const el = document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Set year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

