/* =====================================================
   PORTFOLIO SCRIPT — Raj Vincy Degapati
===================================================== */

// ───────────────────────────────────────────
// Theme-Synced Intro
// ───────────────────────────────────────────
document.body.classList.add('no-scroll');

const introOverlay = document.getElementById('introOverlay');
const syncText1 = document.getElementById('syncText1');
const syncText2 = document.getElementById('syncText2');
const actionContainer = document.querySelector('.intro-action');
const actionText = document.getElementById('actionText');
const actionLine = document.getElementById('actionLine');

function playSyncIntro() {
  if (!introOverlay) return;

  // 1. Reveal brand text (Smooth entry)
  setTimeout(() => {
    if (syncText1) syncText1.classList.add('visible');
  }, 400);

  // 2. Reveal tagline & action container (Followed by brand)
  setTimeout(() => {
    if (syncText2) syncText2.classList.add('visible');
    if (actionContainer) actionContainer.classList.add('visible');
  }, 1400);

  // 3. Line strikes and reveals text (The climax)
  setTimeout(() => {
    if (actionLine) actionLine.classList.add('strike');

    // Trail the text reveal slightly behind the line
    setTimeout(() => {
      if (actionText) actionText.classList.add('reveal-text');
    }, 150);

  }, 2200);

  // 4. Smooth Fade out overlay after action is complete
  setTimeout(() => {
    introOverlay.style.opacity = '0';
    introOverlay.style.filter = 'blur(20px)'; // Extra polish on fade out

    // 5. Cleanup and init AOS
    setTimeout(() => {
      introOverlay.remove();
      document.body.classList.remove('no-scroll');
      if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 850, easing: 'ease-out-cubic' });
      }
    }, 1000);
  }, 4000);
}

// Start intro sequence
window.addEventListener('load', playSyncIntro);

// ───────────────────────────────────────────
// Typed.js
// ───────────────────────────────────────────
new Typed('#typed', {
  strings: [
    'Front-End Developer',
    'CSE Student @ AEC',
    'Graphic Designer',
    'Problem Solver',
    'UI/UX Explorer'
  ],
  typeSpeed: 55,
  backSpeed: 32,
  backDelay: 1800,
  loop: true
});

// ───────────────────────────────────────────
// Theme Toggle
// ───────────────────────────────────────────
function toggleMode() {
  document.body.classList.toggle('light');
  const icon = document.querySelector('#themeToggle i');
  if (document.body.classList.contains('light')) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

// Persist theme
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = 'fas fa-sun';
  }
})();

// ───────────────────────────────────────────
// Cursor Glow
// ───────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ───────────────────────────────────────────
// Particles
// ───────────────────────────────────────────
(function spawnParticles() {
  const container = document.getElementById('particles');
  const count = 30;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const dur = Math.random() * 18 + 10;
    const delay = Math.random() * 20;
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(dot);
  }
})();

// ───────────────────────────────────────────
// Active Nav Dot (Intersection Observer)
// ───────────────────────────────────────────
const sectionIds = ['home', 'about', 'skills', 'projects', 'internships', 'achievements', 'contact'];
const navLinks = {};
sectionIds.forEach(id => {
  navLinks[id] = document.getElementById('nav-' + id);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sectionIds.forEach(id => {
        if (navLinks[id]) navLinks[id].classList.remove('active');
      });
      const id = entry.target.id;
      if (navLinks[id]) navLinks[id].classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// ───────────────────────────────────────────
// Back-to-Top Button
// ───────────────────────────────────────────
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ───────────────────────────────────────────
// Topbar shadow on scroll
// ───────────────────────────────────────────
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    topbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    topbar.style.boxShadow = 'none';
  }
});

// ───────────────────────────────────────────
// Contact Form Handler
// ───────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const subject = document.getElementById('cSubject').value.trim();
  const message = document.getElementById('cMessage').value.trim();
  const fb = document.getElementById('formFeedback');
  const btn = e.target.querySelector('button[type="submit"]');

  if (!name || !email || !subject || !message) {
    fb.textContent = '⚠ Please fill in all fields.';
    fb.className = 'form-feedback error';
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  // Simulated send (mailto fallback)
  setTimeout(() => {
    const mailto = `mailto:degapatirajvincy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    window.location.href = mailto;

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    fb.textContent = '✅ Message ready! Your email client will open.';
    fb.className = 'form-feedback success';
    e.target.reset();

    setTimeout(() => { fb.textContent = ''; fb.className = 'form-feedback'; }, 5000);
  }, 1200);
}

// ───────────────────────────────────────────
// Skill Pill hover ripple effect
// ───────────────────────────────────────────
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      width: 100px; height: 100px;
      left: ${e.offsetX - 50}px;
      top: ${e.offsetY - 50}px;
      animation: rippleOut 0.5s ease forwards;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleOut {
    from { transform: scale(0); opacity: 1; }
    to   { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ───────────────────────────────────────────
// Project card glow on mouse move
// ───────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.project-glow');
    if (glow) {
      glow.style.left = x - 100 + 'px';
      glow.style.top = y - 100 + 'px';
    }
  });
});
