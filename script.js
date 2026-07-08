/* ============================================
   COFFEE FEST HALIFAX — INTERACTIVE SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // LOADING SCREEN
  // =============================================
  const loader = document.getElementById('loader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800);
  });

  // Fallback: hide loader after 4s regardless
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 4000);

  // =============================================
  // NAVIGATION — Scroll Effect
  // =============================================
  const navbar = document.getElementById('navbar');
  
  const handleNavScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // =============================================
  // NAVIGATION — Mobile Toggle
  // =============================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // =============================================
  // SMOOTH SCROLLING (anchor links)
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    });
  });

  // =============================================
  // HERO PARTICLES (Steam Effect)
  // =============================================
  const particlesContainer = document.getElementById('heroParticles');

  function createParticles() {
    if (!particlesContainer) return;
    const count = 30;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.opacity = Math.random() * 0.3;
      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

  // =============================================
  // COUNTDOWN TIMER — October 3, 2026
  // =============================================
  const targetDate = new Date('2026-10-03T09:00:00-03:00'); // ADT

  const countDays = document.getElementById('countDays');
  const countHours = document.getElementById('countHours');
  const countMinutes = document.getElementById('countMinutes');
  const countSeconds = document.getElementById('countSeconds');

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countDays.textContent = '000';
      countHours.textContent = '00';
      countMinutes.textContent = '00';
      countSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countDays.textContent = String(days).padStart(3, '0');
    countHours.textContent = String(hours).padStart(2, '0');
    countMinutes.textContent = String(minutes).padStart(2, '0');
    countSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // =============================================
  // SCROLL REVEAL ANIMATIONS
  // =============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =============================================
  // NEWSLETTER FORM
  // =============================================
  const signupForm = document.getElementById('signupForm');
  const emailInput = document.getElementById('emailInput');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    if (!email) return;

    const btn = signupForm.querySelector('button');
    const originalText = btn.textContent;
    
    // Loading state
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Send to Google Sheet
    fetch('https://script.google.com/macros/s/AKfycbzjlPUAPURurlAJ59VpZf-t633FkpkX6FsG_hizmXx7NUwvI_v0Vgyu9LcwTDXp8_oK/exec', {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams({
        'email': email
      })
    })
    .then(response => {
      // Success state
      btn.textContent = ' You\'re In!';
      btn.style.background = 'linear-gradient(135deg, #2d7d46 0%, #1a5c2e 100%)';
      emailInput.value = '';
      
      // Reset after 3 seconds
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    })
    .catch(error => {
      console.error('Error!', error.message);
      btn.textContent = 'Error. Try Again.';
      
      // Reset after 3 seconds
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    });
  });

  // =============================================
  // PARALLAX — Subtle hero movement
  // =============================================
  const heroBg = document.querySelector('.hero-bg img');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!heroBg) return;
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          const parallax = scrolled * 0.3;
          heroBg.style.transform = `scale(1.05) translateY(${parallax}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // =============================================
  // STAT COUNTER ANIMATION
  // =============================================
  const statValues = document.querySelectorAll('.about-stat-value');
  let statsCounted = false;

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        animateStats();
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const aboutStats = document.querySelector('.about-stats');
  if (aboutStats) {
    statObserver.observe(aboutStats);
  }

  function animateStats() {
    statValues.forEach(stat => {
      const text = stat.textContent;
      const numMatch = text.match(/\d+/);
      if (!numMatch) return;

      const target = parseInt(numMatch[0]);
      const suffix = text.replace(numMatch[0], '');
      let current = 0;
      const increment = target / 40;
      const duration = 1500;
      const stepTime = duration / 40;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + suffix;
      }, stepTime);
    });
  }

  // =============================================
  // IMAGE HOVER TILT (Showcase items)
  // =============================================
  const showcaseItems = document.querySelectorAll('.showcase-item');

  showcaseItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      item.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
      item.style.transition = 'transform 0.5s ease';
      setTimeout(() => {
        item.style.transition = '';
      }, 500);
    });
  });

  // =============================================
  // HERO LOGO — Steam / Fog Effect
  // =============================================
  const logoWrap = document.querySelector('.hero-logo-wrap');
  const logoImg  = document.querySelector('.hero-logo-img');

  if (logoWrap && logoImg) {
    // Create canvas overlay
    const canvas = document.createElement('canvas');
    canvas.classList.add('steam-canvas');
    logoWrap.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let steamParticles = [];
    let isHovering = false;
    let animFrameId = null;

    const OVERFLOW_TOP = 320; // px steam can rise above the logo
    const OVERFLOW_SIDE = 60;

    function resizeCanvas() {
      const imgRect  = logoImg.getBoundingClientRect();
      const wrapRect = logoWrap.getBoundingClientRect();
      canvas.width  = imgRect.width  + OVERFLOW_SIDE * 2;
      canvas.height = imgRect.height + OVERFLOW_TOP;
      // Shift left by side overflow, and UP by top overflow
      canvas.style.left = (imgRect.left - wrapRect.left - OVERFLOW_SIDE) + 'px';
      canvas.style.top  = (imgRect.top  - wrapRect.top  - OVERFLOW_TOP)  + 'px';
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class SteamParticle {
      constructor(burst = false) {
        const cw = canvas.width;
        const ch = canvas.height;

        // Spawn from coffee surface — offset by OVERFLOW_TOP since canvas extends above
        // Center horizontally, spawn in the cup area (lower portion of logo)
        const spawnXmin = cw * 0.35;
        const spawnXmax = cw * 0.65;
        // Y: OVERFLOW_TOP pushes the logo start down in canvas coords
        // Cup surface is roughly 45-65% from top of the logo
        const logoTopInCanvas = OVERFLOW_TOP;
        const logoH = ch - OVERFLOW_TOP;
        const spawnYmin = logoTopInCanvas + logoH * 0.45;
        const spawnYmax = logoTopInCanvas + logoH * 0.65;

        this.x = spawnXmin + Math.random() * (spawnXmax - spawnXmin);
        this.y = spawnYmin + Math.random() * (spawnYmax - spawnYmin);

        this.vx = (Math.random() - 0.5) * (burst ? 1.6 : 0.8);
        this.vy = -(Math.random() * (burst ? 3.2 : 2.2) + (burst ? 1.2 : 0.8));
        this.alpha  = burst ? (Math.random() * 0.5  + 0.25) : (Math.random() * 0.32 + 0.1);
        this.size   = Math.random() * (burst ? 70 : 50) + (burst ? 28 : 16);
        this.decay  = Math.random() * 0.003 + (burst ? 0.004 : 0.002); // slower = longer life
        this.grow   = Math.random() * 0.6  + 0.25;  // expands bigger as it rises
        this.wobble = (Math.random() - 0.5) * 0.045;
        this.angle  = 0;
      }

      update() {
        this.x     += this.vx;
        this.y     += this.vy;
        this.vx    += this.wobble;
        this.alpha -= this.decay;
        this.size  += this.grow;
        this.angle += (Math.random() - 0.5) * 0.02;
      }

      draw() {
        if (this.alpha <= 0) return;
        const grad = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        grad.addColorStop(0,   `rgba(240, 230, 210, ${this.alpha})`);
        grad.addColorStop(0.4, `rgba(220, 205, 180, ${this.alpha * 0.6})`);
        grad.addColorStop(1,   `rgba(200, 180, 150, 0)`);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      dead() { return this.alpha <= 0; }
    }

    function spawnSteam(count = 1, burst = false) {
      for (let i = 0; i < count; i++) {
        steamParticles.push(new SteamParticle(burst));
      }
    }

    function animate() {
      animFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn continuously while hovering
      if (isHovering) spawnSteam(2);

      steamParticles = steamParticles.filter(p => !p.dead());
      steamParticles.forEach(p => { p.update(); p.draw(); });

      // Stop the loop when no particles left and not hovering
      if (!isHovering && steamParticles.length === 0) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }

    function startLoop() {
      if (!animFrameId) animate();
    }

    logoImg.addEventListener('mouseenter', () => {
      isHovering = true;
      startLoop();
    });

    logoImg.addEventListener('mouseleave', () => {
      isHovering = false;
    });

    logoImg.addEventListener('click', () => {
      spawnSteam(30, true);
      startLoop();
    });
  }

  // =============================================
  // SCROLL STORY LOGIC
  // =============================================
  const storyContainer = document.getElementById('storyContainer');
  const bookLayer = document.getElementById('bookLayer');
  const book3d = document.querySelector('.book-3d');
  const bookCover = document.querySelector('.book-cover');
  const latteLayer = document.getElementById('latteLayer');
  const latteImg = document.getElementById('latteImg');
  const latteContent = document.getElementById('latteContent');
  const croissantLayer = document.getElementById('croissantLayer');
  const croissantImg = document.getElementById('croissantImg');
  const croissantContent = document.getElementById('croissantContent');

  if (storyContainer) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // Calculate progress (0 to 1) for each 100vh segment
      const progress1 = Math.max(0, Math.min(1, scrollY / vh));
      const progress2 = Math.max(0, Math.min(1, (scrollY - vh) / vh));
      const progress3 = Math.max(0, Math.min(1, (scrollY - 2 * vh) / vh));

      // SCENE 1: The Book
      if (progress1 < 1) {
        bookLayer.style.opacity = 1 - progress1;
        // Zoom into the book
        const scale = 1 + (progress1 * 4);
        if (book3d) book3d.style.transform = `scale(${scale})`;
        // Open the cover
        const coverAngle = -160 * progress1;
        if (bookCover) bookCover.style.transform = `rotateY(${coverAngle}deg)`;
      } else {
        bookLayer.style.opacity = 0;
      }

      // SCENE 2: Latte Art
      if (progress1 > 0.3 && progress3 === 0) {
        latteLayer.style.opacity = progress2 < 1 ? (progress1 - 0.3) * 1.4 : 1 - progress3;
        
        // Zoom into latte art
        const latteScale = 1.0 + (progress2 * 0.4);
        if (latteImg) latteImg.style.transform = `scale(${latteScale})`;

        // Fade in content
        if (progress2 > 0.1) {
          const contentProg = Math.min(1, (progress2 - 0.1) * 2.5);
          if (latteContent) {
            latteContent.style.opacity = contentProg;
            latteContent.style.transform = `translateY(${50 - (contentProg * 50)}px)`;
          }
        } else {
          if (latteContent) latteContent.style.opacity = 0;
        }
      } else if (progress3 > 0) {
        latteLayer.style.opacity = 0;
      }

      // SCENE 3: Croissant
      if (progress2 > 0.5) {
        croissantLayer.style.opacity = Math.min(1, (progress2 - 0.5) * 2);
        
        // Zoom into croissant
        const crossScale = 1.0 + (progress3 * 0.4);
        if (croissantImg) croissantImg.style.transform = `scale(${crossScale})`;

        // Fade in content
        if (progress3 > 0.1) {
          const contentProg = Math.min(1, (progress3 - 0.1) * 2.5);
          if (croissantContent) {
            croissantContent.style.opacity = contentProg;
            croissantContent.style.transform = `translateY(${50 - (contentProg * 50)}px)`;
          }
        } else {
          if (croissantContent) croissantContent.style.opacity = 0;
        }
      } else {
        croissantLayer.style.opacity = 0;
      }
    }, { passive: true });
    
    // Trigger scroll once to set initial state
    window.dispatchEvent(new Event('scroll'));
  }

});
