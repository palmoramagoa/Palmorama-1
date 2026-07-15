/* =============================================================
   Palmorama × Vaayu — vanilla JS port
   - Lenis smooth scroll
   - GSAP ScrollTrigger for parallax & horizontal gallery
   - IntersectionObserver for reveal animations
   - Loader, nav, drawer, testimonial carousel, contact form
   ============================================================= */

(() => {
  // -----------------------------------------------------------
  // LOADER
  // -----------------------------------------------------------
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderPct = document.getElementById('loaderPct');
  let pct = 0;
  const loaderTimer = setInterval(() => {
    pct += Math.random() * 9 + 4;
    if (pct >= 100) {
      pct = 100;
      clearInterval(loaderTimer);
      setTimeout(() => {
        loader.classList.add('is-hidden');
        document.body.classList.add('is-loaded');
        initIntro();
      }, 450);
    }
    loaderFill.style.width = pct + '%';
    loaderPct.textContent = Math.floor(pct) + '%';
  }, 110);

  // Intro reveals on hero + nav after loader finishes
  function initIntro() {
    document.getElementById('nav').classList.add('is-ready');
    document.getElementById('scrollProgress').classList.add('is-ready');
    document.querySelectorAll('.hero .reveal, .hero .line-mask').forEach((el, i) => {
      const d = parseInt(el.querySelector('.line')?.dataset.revealDelay || el.dataset.revealDelay || (i * 120), 10);
      setTimeout(() => el.classList.add('is-in'), d);
    });
  }

  // -----------------------------------------------------------
  // LENIS SMOOTH SCROLL
  // -----------------------------------------------------------
  const lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync GSAP ScrollTrigger with Lenis
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Anchor smooth scrolling
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -40, duration: 1.4 });
      closeDrawer();
    }
  });

  // -----------------------------------------------------------
  // NAV scroll state + progress bar
  // -----------------------------------------------------------
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('scrollProgress');
  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    nav.classList.toggle('is-scrolled', y > 60);
    const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const pct = Math.min(1, y / max);
    progressBar.style.width = (pct * 100) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -----------------------------------------------------------
  // MOBILE DRAWER
  // -----------------------------------------------------------
  const drawer = document.getElementById('drawer');
  const drawerOpen = document.getElementById('navBurger');
  const drawerCloseBtn = document.getElementById('drawerClose');
  function openDrawer() { drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); }
  function closeDrawer() { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); }
  drawerOpen.addEventListener('click', openDrawer);
  drawerCloseBtn.addEventListener('click', closeDrawer);

  // -----------------------------------------------------------
  // REVEAL ON SCROLL (IntersectionObserver)
  // -----------------------------------------------------------
  // Wrap each word of .reveal-words elements in span
  document.querySelectorAll('.reveal-words').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map((w) => `<span class="word"><span>${w}</span></span>`)
      .join(' ');
  });

  // Wrap hero title lines (already done in HTML with .line-mask)
  // Add staggered delays via CSS variables
  document.querySelectorAll('.reveal[data-reveal-delay]').forEach((el) => {
    el.style.setProperty('--reveal-delay', el.dataset.revealDelay + 'ms');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        // Stagger words within a reveal-words element
        if (entry.target.classList.contains('reveal-words')) {
          entry.target.querySelectorAll('.word > span').forEach((span, i) => {
            span.style.transitionDelay = (i * 60) + 'ms';
          });
        }
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '-10% 0px -10% 0px', threshold: 0 });

  document.querySelectorAll('.reveal, .reveal-words, .line-mask, .curtain').forEach((el) => {
    // Skip hero reveals (handled by loader)
    if (el.closest('.hero')) return;
    io.observe(el);
  });

  // -----------------------------------------------------------
  // PARALLAX (GSAP ScrollTrigger)
  // -----------------------------------------------------------
  if (window.gsap && window.ScrollTrigger) {
    // Hero background subtle zoom + drift
    gsap.to('.hero__bg', {
      yPercent: 22,
      scale: 1.18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    gsap.to('.hero__content', {
      yPercent: -30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Generic [data-parallax-y] — translate by percent based on scroll
    document.querySelectorAll('[data-parallax-y]').forEach((el) => {
      const amount = parseFloat(el.dataset.parallaxY) || 20;
      gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    // Story watermark — slower scroll
    gsap.to('.story__watermark', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: true },
    });
    gsap.to('.testimonials__watermark', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: { trigger: '.testimonials', start: 'top bottom', end: 'bottom top', scrub: true },
    });

    // -------------------------------------------------------
    // GALLERY — pinned horizontal scroll
    // -------------------------------------------------------
    const track = document.getElementById('galleryTrack');
    const gallerySection = document.querySelector('.gallery');
    if (track && gallerySection) {
      // Calculate how far to translate
      const calcDistance = () => track.scrollWidth - window.innerWidth + 40;
      gsap.to(track, {
        x: () => -calcDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: gallerySection,
          start: 'top top',
          end: () => '+=' + calcDistance(),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    // Refresh on font/image load
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  // -----------------------------------------------------------
  // TESTIMONIALS CAROUSEL
  // -----------------------------------------------------------
  const testimonials = document.querySelectorAll('.testimonial');
  const dotsWrap = document.getElementById('tDots');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');
  let tIndex = 0;
  let tTimer;

  // Build dots
  testimonials.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 't-dot' + (i === 0 ? ' active' : '');
    b.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });
  const dots = dotsWrap.querySelectorAll('.t-dot');

  function goTo(i) {
    tIndex = (i + testimonials.length) % testimonials.length;
    testimonials.forEach((el, idx) => el.classList.toggle('active', idx === tIndex));
    dots.forEach((el, idx) => el.classList.toggle('active', idx === tIndex));
    restartTimer();
  }
  function restartTimer() {
    clearInterval(tTimer);
    tTimer = setInterval(() => goTo(tIndex + 1), 6500);
  }
  prevBtn.addEventListener('click', () => goTo(tIndex - 1));
  nextBtn.addEventListener('click', () => goTo(tIndex + 1));
  restartTimer();

  // -----------------------------------------------------------
  // CONTACT FORM (mailto handoff)
  // -----------------------------------------------------------
  const form = document.getElementById('contactForm');
  const sent = document.getElementById('contactSent');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name') || 'website';
    const email = fd.get('email') || '';
    const message = fd.get('message') || '';
    const subject = encodeURIComponent('Enquiry from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    window.location.href = 'mailto:palmorama.goa@gmail.com?subject=' + subject + '&body=' + body;
    sent.classList.add('is-visible');
    setTimeout(() => sent.classList.remove('is-visible'), 4000);
  });

  // -----------------------------------------------------------
  // FOOTER YEAR
  // -----------------------------------------------------------
  document.getElementById('footerYear').textContent = new Date().getFullYear();
})();
