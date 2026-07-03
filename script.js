// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// Mobile menu toggle
// ============================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// Typing effect (hero role line)
// ============================================
const typedTextEl = document.getElementById('typedText');
const phrases = [
  'Backend Developer — Java & Spring Boot',
  'Building REST APIs that scale',
  'Master\'s student, MCA — 2026'
];

function typeLoop() {
  if (reduceMotion || !typedTextEl) {
    if (typedTextEl) typedTextEl.textContent = phrases[0];
    return;
  }
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      typedTextEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      typedTextEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 28 : 55);
  }
  tick();
}
typeLoop();

// ============================================
// Animated stat counters
// ============================================
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  if (reduceMotion) { el.textContent = target; return; }
  let current = 0;
  const duration = 1200;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ============================================
// Scroll reveal + trigger counters/skill-bars when visible
// ============================================
const revealTargets = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');

        // trigger counters inside hero stats
        entry.target.querySelectorAll('.stat-num').forEach(animateCounter);

        // trigger skill bar fills
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const w = bar.getAttribute('data-width');
          requestAnimationFrame(() => { bar.style.width = w + '%'; });
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => {
    el.classList.add('in');
    el.querySelectorAll('.stat-num').forEach(el2 => el2.textContent = el2.getAttribute('data-count'));
    el.querySelectorAll('.skill-bar-fill').forEach(bar => bar.style.width = bar.getAttribute('data-width') + '%');
  });
}

// ============================================
// Tilt effect on project cards
// ============================================
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    const inner = card.querySelector('.tilt-card-inner');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'rotateX(0) rotateY(0)';
    });
  });
}

// ============================================
// Active nav link on scroll
// ============================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        link.style.color = 'var(--cyan)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => navObserver.observe(sec));
}
