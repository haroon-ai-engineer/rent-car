// ============================================================
//  FAST & COOL TRANSPORT — Main Script
// ============================================================

// --- Sticky navbar shadow ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(0,0,0,.15)'
      : '0 2px 10px rgba(0,0,0,.1)';
  }
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Mobile dropdown toggle
  const dropdowns = navLinks.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });
}

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// --- FAQ accordion ---
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// --- Scroll reveal animation ---
const revealElements = document.querySelectorAll(
  '.feature-card, .service-card, .industry-card, .coverage-card, .testimonial-card, .about-stat, .why-choose-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});
  });
};

if (themeButtons.length > 0) {
  const savedTheme = localStorage.getItem(themeStorageKey);
  applyTheme(savedTheme || document.body.dataset.theme || 'premium');

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const newTheme = button.dataset.theme || 'premium';
      applyTheme(newTheme);
      localStorage.setItem(themeStorageKey, newTheme);
    });
  });
}

