// ============================================================
//  FAST & COOL TRANSPORT — Main Script
// ============================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- First-session loader transition ---
const pageLoader = document.getElementById('page-loader');
const loaderSessionKey = 'fc_loader_seen';

if (pageLoader) {
  const loaderSeen = sessionStorage.getItem(loaderSessionKey) === '1';

  if (loaderSeen || prefersReducedMotion) {
    pageLoader.classList.add('is-hidden');
    window.setTimeout(() => pageLoader.remove(), 80);
  } else {
    window.addEventListener('load', () => {
      window.setTimeout(() => {
        pageLoader.classList.add('is-hidden');
        sessionStorage.setItem(loaderSessionKey, '1');
        window.setTimeout(() => pageLoader.remove(), 620);
      }, 380);
    });
  }
}

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
    document.body.style.overflow = isOpen && window.innerWidth <= 768 ? 'hidden' : '';
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && link.classList.contains('dropdown-toggle')) {
        return;
      }
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
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

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
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

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min((window.scrollY / maxScroll) * 100, 100) : 0;
  navbar?.style.setProperty('--scroll-progress', `${progress}%`);
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

const heroSection = document.querySelector('.hero');

if (heroSection && !prefersReducedMotion) {
  let ticking = false;

  const updateHeroParallax = () => {
    const rect = heroSection.getBoundingClientRect();
    const inView = rect.bottom > 0 && rect.top < window.innerHeight;

    if (inView) {
      const shift = Math.max(-24, Math.min(68, window.scrollY * 0.12));
      heroSection.style.setProperty('--hero-parallax-y', `${shift}px`);
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeroParallax);
      ticking = true;
    }
  });

  updateHeroParallax();
}

// --- Section parallax accents ---
const parallaxSections = document.querySelectorAll(
  '.why-us, .services, .coverage, .testimonials, .cold-delivery'
);

if (!prefersReducedMotion && parallaxSections.length > 0) {
  parallaxSections.forEach(section => section.classList.add('parallax-section'));

  let parallaxTicking = false;

  const updateSectionParallax = () => {
    parallaxSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const viewMid = window.innerHeight * 0.5;
      const sectionMid = rect.top + rect.height * 0.5;
      const distance = (sectionMid - viewMid) / window.innerHeight;
      const shift = Math.max(-42, Math.min(42, distance * -48));
      section.style.setProperty('--section-parallax-y', `${shift}px`);
    });
    parallaxTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(updateSectionParallax);
      parallaxTicking = true;
    }
  });

  updateSectionParallax();
}

// --- Heading reveal masks ---
const sectionHeadings = document.querySelectorAll('section h2');

sectionHeadings.forEach((heading) => {
  heading.classList.add('heading-reveal');
});

if (prefersReducedMotion) {
  sectionHeadings.forEach((heading) => heading.classList.add('is-in'));
} else {
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        headingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });

  sectionHeadings.forEach((heading) => headingObserver.observe(heading));
}

const staggerGroups = document.querySelectorAll(
  '.features-grid, .services-grid, .industries-grid, .coverage-grid, .testimonials-grid, .why-choose-grid'
);

staggerGroups.forEach(group => {
  Array.from(group.children).forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
  });
});

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
  if (prefersReducedMotion) {
    el.style.opacity = '1';
    el.style.transform = 'none';
    return;
  }
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  revealObserver.observe(el);
});

// --- Hero counter animation ---
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count || 0);
  const prefix = counter.dataset.prefix || '';
  const suffix = counter.dataset.suffix || '';
  const duration = 1300;
  const start = performance.now();

  const tick = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    counter.textContent = `${prefix}${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

if (counters.length > 0) {
  if (prefersReducedMotion) {
    counters.forEach(counter => {
      const prefix = counter.dataset.prefix || '';
      const suffix = counter.dataset.suffix || '';
      counter.textContent = `${prefix}${counter.dataset.count || 0}${suffix}`;
    });
  } else {
    const counterPanel = document.querySelector('.hero-side-panel');
    let hasRunCounters = false;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!hasRunCounters && entry.isIntersecting) {
          counters.forEach(animateCounter);
          hasRunCounters = true;
          counterObserver.disconnect();
        }
      });
    }, { threshold: 0.45 });

    if (counterPanel) {
      counterObserver.observe(counterPanel);
    } else {
      counters.forEach(animateCounter);
    }
  }
}

