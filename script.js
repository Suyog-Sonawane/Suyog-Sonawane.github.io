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
// Animated stat counters
// ============================================
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  if (reduceMotion) { el.textContent = target; return; }
  let current = 0;
  const duration = 900;
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
// Scroll reveal (fade-up only, no gimmicks)
// ============================================
const revealTargets = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => observer.observe(el));

  // hero stats strip isn't inside a .reveal ancestor with stat-num query working
  // above, so also observe it directly in case markup nesting differs
  document.querySelectorAll('.stat-num').forEach(el => {
    if (!el.closest('.reveal')) {
      const parentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            parentObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      parentObserver.observe(el);
    }
  });
} else {
  revealTargets.forEach(el => {
    el.classList.add('in');
    el.querySelectorAll('.stat-num').forEach(el2 => el2.textContent = el2.getAttribute('data-count'));
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
        link.style.color = 'var(--accent)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => navObserver.observe(sec));
}
