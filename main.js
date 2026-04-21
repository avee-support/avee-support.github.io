// ===== Navbar: add .scrolled class on scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ===== FAQ accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all others
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-answer').classList.remove('open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== Lightbox =====
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentThumbs = [];
let currentIndex = 0;

function showAt(index) {
  currentIndex = index;
  lightboxImg.src = currentThumbs[currentIndex].src;
  lightboxImg.alt = currentThumbs[currentIndex].alt;
}

function openLightbox(thumbs, index) {
  currentThumbs = thumbs;
  showAt(index);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showPrev() {
  if (!currentThumbs.length) return;
  showAt((currentIndex - 1 + currentThumbs.length) % currentThumbs.length);
}

function showNext() {
  if (!currentThumbs.length) return;
  showAt((currentIndex + 1) % currentThumbs.length);
}

function bindGalleryGroup(selector) {
  const buttons = Array.from(document.querySelectorAll(selector));
  const imgs = buttons.map(btn => btn.querySelector('img'));
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => openLightbox(imgs, i));
  });
}

bindGalleryGroup('.screenshot-thumb');
bindGalleryGroup('.visualization-thumb');

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showPrev();
  if (e.key === 'ArrowRight')  showNext();
});

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Attach to section children
document.querySelectorAll(
  '.feature-card, .screenshot-thumb, .visualization-thumb, .download-banner-link, .faq-item, .section-title, .section-sub'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
