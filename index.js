// ===================================================
// DALLY R — AI DEVELOPER PORTFOLIO
// Main JavaScript — Particles, Animations, Interactions
// ===================================================

// ---- MOBILE MENU ----
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('hamburger-btn');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', function (e) {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger-btn');
  if (menu && hamburger) {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  }
});

// ---- NAV SCROLL EFFECT ----
window.addEventListener('scroll', function () {
  const nav = document.getElementById('desktop-nav');
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// ---- PARTICLE CANVAS ----
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    particles.forEach(p => {
      p.x = Math.random() * W;
      p.y = Math.random() * H;
    });
  });

  const PARTICLE_COUNT = Math.min(80, Math.floor(W * H / 15000));
  const CONNECTION_DISTANCE = 130;

  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.size = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.2;
      // Purple/violet/cyan color
      const colors = [
        '139, 92, 246',   // purple
        '167, 139, 250',  // violet
        '6, 182, 212',    // cyan
        '124, 58, 237',   // indigo
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DISTANCE) {
          const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();
})();

// ---- DYNAMIC TEXT TYPEWRITER ----
(function initTypewriter() {
  const words = ['AI Products', 'AI Agents', 'ML Systems', 'Edge AI', 'Smart Apps', 'The Future'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const el = document.getElementById('dynamic-text');
  if (!el) return;

  function type() {
    const current = words[wordIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
})();

// ---- SCROLL ANIMATIONS (Intersection Observer) ----
(function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Animate section headers
  document.querySelectorAll('.section-header, .about-grid, .skills-grid, .projects-grid, .contact-container').forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(el);
  });

  // Animate project cards individually
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
  });

  // Animate about cards
  document.querySelectorAll('.about-card').forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
  });

  // Animate skill categories
  document.querySelectorAll('.skill-category').forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${i * 0.12}s`;
    observer.observe(el);
  });
})();

// ---- ACTIVE NAV LINK ----
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#desktop-nav .nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#a78bfa';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
})();

// ---- CURSOR GLOW EFFECT ----
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
})();

// ---- STATS COUNTER ANIMATION ----
(function initCounters() {
  function animateCounter(el, target, duration = 1200) {
    let start = null;
    const startVal = 0;
    const isSymbol = isNaN(parseInt(target));

    if (isSymbol) return; // Skip ∞

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(startVal + (parseInt(target) - startVal) * eased) + (target.includes('+') ? '+' : '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }

    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(el => {
          animateCounter(el, el.textContent.trim());
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  const stats = document.querySelector('.hero-stats');
  if (stats) statsObserver.observe(stats);
})();

console.log(
  '%c🤖 Dally R | AI Developer',
  'color: #8b5cf6; font-size: 20px; font-weight: bold; font-family: monospace;'
);
console.log(
  '%cBuilding AI products, one commit at a time 🚀',
  'color: #94a3b8; font-size: 13px; font-family: monospace;'
);