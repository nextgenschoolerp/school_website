/**
 * Knowva Systems — School ERP Frontend Interactions & Motion
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initStatCounters();
  initHeroTilt();
  initMobileNav();
  initRoleTabs();
  initPricingCalculator();
  initCapabilitiesFilter();
  initDemoForm();
  initAccordions();
});

/* ==========================================================================
   1. Scroll-triggered Reveal Animations
   ========================================================================== */
function initScrollReveals() {
  const revealItems = document.querySelectorAll('.reveal-item');
  if (revealItems.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   2. Animated Number Counters
   ========================================================================== */
function initStatCounters() {
  const countUp = (el, target, isDecimal = false) => {
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const step = target / steps;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (isDecimal && target === 99.98) {
        el.textContent = current >= target ? '99.98' : current.toFixed(2);
      } else {
        el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      }
    }, stepTime);
  };

  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const integers = entry.target.querySelectorAll('.counter-val');
          integers.forEach(num => {
            const target = parseFloat(num.getAttribute('data-target'));
            if (!isNaN(target)) countUp(num, target, false);
          });

          const decimals = entry.target.querySelectorAll('.counter-decimal');
          decimals.forEach(num => {
            const target = parseFloat(num.getAttribute('data-target'));
            if (!isNaN(target)) countUp(num, target, true);
          });

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    const statsSections = document.querySelectorAll('section.bg-slate-100, [data-stats-section]');
    statsSections.forEach(sec => statObserver.observe(sec));
  }
}

/* ==========================================================================
   3. 3D Tilt Micro-Interaction for Hero Mockup
   ========================================================================== */
function initHeroTilt() {
  const tiltWrapper = document.getElementById('heroDashboardMockup');
  if (tiltWrapper && window.matchMedia('(pointer: fine)').matches) {
    const tiltInner = tiltWrapper.querySelector('.tilt-card-inner') || tiltWrapper;
    tiltWrapper.addEventListener('mousemove', (e) => {
      const rect = tiltWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      tiltInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltWrapper.addEventListener('mouseleave', () => {
      tiltInner.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-nav-close');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileMenu.classList.contains('hidden')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close when clicking outside or pressing Escape
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   5. Role Switcher Tabs (Solutions page & Home page)
   ========================================================================== */
function initRoleTabs() {
  const tabContainers = document.querySelectorAll('[data-role-tabs]');
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('[data-role-tab]');
    const panels = container.querySelectorAll('[data-role-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetRole = tab.getAttribute('data-role-tab');

        tabs.forEach(t => {
          t.classList.remove('active', 'border-primary', 'text-primary', 'bg-white', 'shadow-sm');
          t.classList.add('text-on-surface-variant');
        });
        tab.classList.add('active', 'border-primary', 'text-primary', 'bg-white', 'shadow-sm');
        tab.classList.remove('text-on-surface-variant');

        panels.forEach(panel => {
          if (panel.getAttribute('data-role-panel') === targetRole) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        });
      });
    });
  });
}

/* ==========================================================================
   6. Pricing Calculator (Pricing page)
   ========================================================================== */
function initPricingCalculator() {
  const slider = document.getElementById('student-count-slider');
  const countDisplay = document.getElementById('student-count-display');
  const annualTotal = document.getElementById('calculator-total-amount');
  const perStudentRate = document.getElementById('calculator-per-student-rate');
  const boardRadios = document.querySelectorAll('input[name="board_tier"]');
  const addonCheckboxes = document.querySelectorAll('.calculator-addon');

  if (!slider) return;

  function updatePricing() {
    const students = parseInt(slider.value, 10);
    if (countDisplay) {
      countDisplay.textContent = students.toLocaleString('en-IN');
    }

    let baseRate = 99;
    if (students > 3000) baseRate = 85;
    else if (students > 1500) baseRate = 92;

    let boardMultiplier = 1.0;
    boardRadios.forEach(radio => {
      if (radio.checked) {
        if (radio.value === 'icse') boardMultiplier = 1.1;
        else if (radio.value === 'ib') boardMultiplier = 1.25;
      }
    });

    let addonsPerStudent = 0;
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        addonsPerStudent += parseFloat(cb.getAttribute('data-price') || 0);
      }
    });

    const effectiveRate = Math.round((baseRate * boardMultiplier) + addonsPerStudent);
    const total = effectiveRate * students;

    if (perStudentRate) {
      perStudentRate.textContent = `₹${effectiveRate}`;
    }
    if (annualTotal) {
      if (total >= 10000000) {
        annualTotal.textContent = `₹${(total / 10000000).toFixed(2)} Cr`;
      } else if (total >= 100000) {
        annualTotal.textContent = `₹${(total / 100000).toFixed(2)} Lakh`;
      } else {
        annualTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
      }
    }
  }

  slider.addEventListener('input', updatePricing);
  boardRadios.forEach(r => r.addEventListener('change', updatePricing));
  addonCheckboxes.forEach(cb => cb.addEventListener('change', updatePricing));

  updatePricing();
}

/* ==========================================================================
   7. Capabilities Filter & Search (Capabilities page)
   ========================================================================== */
function initCapabilitiesFilter() {
  const searchInput = document.getElementById('capability-search');
  const filterButtons = document.querySelectorAll('[data-cap-filter]');
  const capRows = document.querySelectorAll('[data-capability-row]');
  const countBadge = document.getElementById('capabilities-count-badge');

  if (!searchInput && filterButtons.length === 0) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function applyFilter() {
    let visibleCount = 0;

    capRows.forEach(row => {
      const category = (row.getAttribute('data-category') || '').toLowerCase();
      const text = row.textContent.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || category === activeCategory);
      const matchesSearch = (!searchTerm || text.includes(searchTerm));

      if (matchesCategory && matchesSearch) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });

    if (countBadge) {
      countBadge.textContent = `${visibleCount} features`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyFilter();
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary', 'text-white');
        b.classList.add('bg-surface-container-low', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-white');
      btn.classList.remove('bg-surface-container-low', 'text-on-surface-variant');

      activeCategory = btn.getAttribute('data-cap-filter') || 'all';
      applyFilter();
    });
  });
}

/* ==========================================================================
   8. Demo Form Submission (Demo page)
   ========================================================================== */
function initDemoForm() {
  const demoForm = document.getElementById('book-demo-form');
  if (!demoForm) return;

  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = demoForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin mr-2">progress_activity</span> Confirming...';
    }

    setTimeout(() => {
      const isSubpage = window.location.pathname.includes('/pages/');
      const target = isSubpage ? 'demo-success.html' : 'pages/demo-success.html';
      window.location.href = target;
    }, 400);
  });
}

/* ==========================================================================
   9. Accordions / FAQ Toggles
   ========================================================================== */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('[data-accordion-toggle]');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const targetId = header.getAttribute('data-accordion-toggle');
      const content = document.getElementById(targetId);
      const icon = header.querySelector('.accordion-chevron');

      if (!content) return;

      const isOpen = !content.classList.contains('hidden');
      if (isOpen) {
        content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}
