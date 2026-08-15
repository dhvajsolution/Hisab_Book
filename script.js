// ─── NAVBAR SCROLL ───────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── MOBILE MENU ────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.querySelector('i').className =
    mobileMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});
function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.querySelector('i').className = 'fas fa-bars';
}

// ─── SMOOTH SCROLL ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    }
  });
});

// ─── SCROLL REVEAL ──────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

// ─── LIGHTBOX ────────────────────────────
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lbImg');
const lbClose    = document.getElementById('lbClose');
const lbPrev     = document.getElementById('lbPrev');
const lbNext     = document.getElementById('lbNext');

const sgItems = Array.from(document.querySelectorAll('.sg-item'));
let current = 0;

function openLightbox(index) {
  current = index;
  const img = sgItems[current].querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showPrev() {
  current = (current - 1 + sgItems.length) % sgItems.length;
  const img = sgItems[current].querySelector('img');
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbImg.style.opacity = '1';
  }, 150);
}

function showNext() {
  current = (current + 1) % sgItems.length;
  const img = sgItems[current].querySelector('img');
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbImg.style.opacity = '1';
  }, 150);
}

lbImg.style.transition = 'opacity 0.15s ease';

sgItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', showPrev);
lbNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'Escape') closeLightbox();
});

// ─── CAROUSEL ────────────────────────────
const screensTrack = document.getElementById('screensTrack');
const scArrPrev = document.getElementById('scArrPrev');
const scArrNext = document.getElementById('scArrNext');

if (screensTrack && scArrPrev && scArrNext) {
  const scrollAmount = 304; // 280px card + 24px gap

  scArrPrev.addEventListener('click', () => {
    screensTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  scArrNext.addEventListener('click', () => {
    screensTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Auto scroll
  setInterval(() => {
    // If user is hovering over track, don't auto scroll (optional, but good UX)
    if (screensTrack.matches(':hover')) return;

    if (screensTrack.scrollLeft + screensTrack.clientWidth >= screensTrack.scrollWidth - 10) {
      screensTrack.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      screensTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, 3000);
}
