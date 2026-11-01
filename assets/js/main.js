// ==========================================================================
// PRIYA DHARA — BRIDAL MAKEOVER & ACADEMY Controller
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Typewriter Effect
  const twElement = document.getElementById('heroTypewriter');
  if (twElement) {
    const phrases = [
      'Signature Bengali Bridal Artistry',
      'Airbrush HD Glass Skin Finish',
      'Intricate White & Red Chandan Art',
      'Royal Reception & Sangeet Glam',
      'Professional Makeup Academy Diplomas'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        twElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        twElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 35 : 75;

      if (!isDeleting && charIndex === current.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // 3. Before / After Transformation Slider
  const baRange = document.getElementById('baRange');
  const baOverlay = document.getElementById('baOverlay');
  if (baRange && baOverlay) {
    baRange.addEventListener('input', (e) => {
      const val = e.target.value;
      baOverlay.style.width = val + '%';
    });
  }

  // 4. Interactive Bridal Package & Date Estimator
  const bridalPackage = document.getElementById('bridalPackage');
  const skinFinish = document.getElementById('skinFinish');
  const estTime = document.getElementById('estTime');
  const estInclusions = document.getElementById('estInclusions');
  const bridalWaBtn = document.getElementById('bridalWaBtn');

  function updateBridalEstimator() {
    if (!bridalPackage || !skinFinish) return;
    const pkgVal = bridalPackage.value;
    const finishVal = skinFinish.value;

    let timeSlot = '3.5 Hours Draping & Makeover';
    let inclusions = 'Includes Chandan Art, Saree Pleating, Hair Styling';

    if (pkgVal.includes('Reception')) {
      timeSlot = '2.5 Hours Glam Session';
      inclusions = 'Includes Hollywood Waves, Smokey Glam, Lashes';
    } else if (pkgVal.includes('3-Day')) {
      timeSlot = 'Dedicated Bridal Artist Across All 3 Events';
      inclusions = 'Haldi, Wedding & Reception Looks + Draping';
    } else if (pkgVal.includes('Academy')) {
      timeSlot = '1 Month Hands-On Certification';
      inclusions = 'Includes ISO Diploma, Airbrush Kit & Live Models';
    }

    if (estTime) estTime.textContent = timeSlot;
    if (estInclusions) estInclusions.textContent = inclusions;

    if (bridalWaBtn) {
      const msg = `Hello Priya Dhara Studio! I am interested in booking the ${pkgVal} with ${finishVal}. Session: ${timeSlot}. Please check wedding date availability.`;
      bridalWaBtn.href = `https://wa.me/919804531965?text=${encodeURIComponent(msg)}`;
    }
  }

  if (bridalPackage && skinFinish) {
    bridalPackage.addEventListener('change', updateBridalEstimator);
    skinFinish.addEventListener('change', updateBridalEstimator);
    updateBridalEstimator();
  }

  // 5. Hero Video Toggle
  const heroVid = document.getElementById('heroVideo');
  const vidToggle = document.getElementById('vidToggle');
  if (heroVid && vidToggle) {
    vidToggle.addEventListener('click', () => {
      if (heroVid.paused) {
        heroVid.play();
        vidToggle.innerHTML = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      } else {
        heroVid.pause();
        vidToggle.innerHTML = '<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      }
    });
  }

  // 6. Scroll Animations
  const revealElements = document.querySelectorAll('.bento-card, .review-card, .estimator-card, .section-header');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
