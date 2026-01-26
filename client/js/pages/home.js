document.addEventListener("DOMContentLoaded", () => {
  // --- NETWORK BACKGROUND ANIMATION ---
  const canvas = document.getElementById("network-bg");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    
    const config = {
      particleColor: "rgba(106, 255, 156, 0.5)", // Matches accent color
      lineColor: "rgba(106, 255, 156, 0.15)",
      particleRadius: 1.5,
      minSpeed: 0.1,
      maxSpeed: 0.4,
      connectionDistance: 120,
      connectionDistanceSq: 120 * 120
    };

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * config.maxSpeed;
        this.vy = (Math.random() - 0.5) * config.maxSpeed;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, config.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = config.particleColor;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const isMobile = window.innerWidth < 768;
      // Adjust density: fewer particles on mobile for performance
      const area = canvas.width * canvas.height;
      const densityDivisor = isMobile ? 15000 : 9000; 
      const count = Math.floor(area / densityDivisor);
      
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.update();
        p.draw();
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let distSq = dx * dx + dy * dy;
          if (distSq < config.connectionDistanceSq) {
            ctx.beginPath();
            ctx.strokeStyle = config.lineColor;
            ctx.lineWidth = 1 - distSq / config.connectionDistanceSq;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();
  }

  // --- NAVBAR SCROLL ---
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("open")) {
          otherItem.classList.remove("open");
          gsap.to(otherItem.querySelector(".faq-answer"), {
            maxHeight: 0,
            paddingBottom: "0rem",
            duration: 0.4,
            ease: "power2.inOut"
          });
        }
      });

      // Open or close the clicked item
      if (!isOpen) {
        item.classList.add("open");
        gsap.to(answer, {
          maxHeight: answer.scrollHeight + "px",
          paddingBottom: "1.5rem",
          duration: 0.4,
          ease: "power2.inOut"
        });
      } else {
        item.classList.remove("open");
        gsap.to(answer, {
          maxHeight: 0,
          paddingBottom: "0rem",
          duration: 0.4,
          ease: "power2.inOut"
        });
      }
    });
  });

  // --- ENTRANCE & SCROLL ANIMATIONS ---
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".hero-title", { y: 40, opacity: 0, duration: 0.8 })
    .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
    .from(".derek-input-box", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");

  // --- DEREK ON LANDING PAGE ---
  const derekInput = document.getElementById("derekInput");
  const generateBtn = document.getElementById("generateBtn");
  const outputBox = document.getElementById("outputBox");
  const limitNote = document.getElementById("limitNote");
  const generationLimitModal = document.getElementById("generationLimitModal");
  const closeGenLimitModalBtn = document.getElementById("closeGenLimitModalBtn");

  if (derekInput && generateBtn && outputBox && generationLimitModal && closeGenLimitModalBtn) {
    let generationCount = 0;
    const maxGenerations = 2;

    // --- Typing effect logic ---
    const examples = [
      "generate an image of a banana wearing a cap",
      "create a cinematic shot of a futuristic city",
      "design a logo for an AI startup"
    ];
    let exampleIndex = 0;
    let charIndex = 0;
    let typingInterval = null;
    let isDeleting = false;
    let isPaused = false;
    let isWaiting = false;

    function startTyping() {
      if (typingInterval) return;
      typingInterval = setInterval(() => {
        if (isPaused || isWaiting || derekInput.value.length > 0) return;
        const current = examples[exampleIndex];
        if (!isDeleting) {
          derekInput.placeholder = current.slice(0, charIndex++);
          if (charIndex > current.length) {
            isDeleting = true;
            isWaiting = true;
            setTimeout(() => { isWaiting = false; }, 1000);
          }
        } else {
          derekInput.placeholder = current.slice(0, charIndex--);
          if (charIndex === 0) {
            isDeleting = false;
            exampleIndex = (exampleIndex + 1) % examples.length;
          }
        }
      }, 70);
    }

    derekInput.addEventListener("focus", () => { isPaused = true; });
    derekInput.addEventListener("blur", () => {
      isPaused = false;
      if (!derekInput.value) startTyping();
    });

    derekInput.addEventListener("input", () => {
      if (derekInput.value.length > 0) derekInput.placeholder = "";
      derekInput.style.height = "auto";
      derekInput.style.height = derekInput.scrollHeight + "px";
    });

    startTyping();

    // --- Generation logic ---
    generateBtn.addEventListener("click", () => {
      if (!derekInput.value.trim()) return;

      if (generationCount < maxGenerations) {
        generationCount++;
        outputBox.style.display = "block";
        outputBox.textContent = `(Mock Generation #${generationCount}) This is where the detailed prompt generated by Derek would appear.`;
        
        limitNote.style.display = "block";
        const remaining = maxGenerations - generationCount;
        limitNote.textContent = `You have ${remaining} free generation${remaining === 1 ? '' : 's'} remaining.`;

        if (remaining === 0) {
            limitNote.textContent = "You've used your free generations. Sign up to continue.";
        }
        gsap.fromTo(outputBox, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      } else {
        generationLimitModal.style.display = "flex";
        gsap.fromTo(generationLimitModal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(generationLimitModal.querySelector(".modal-box"), { scale: 0.9, y: -10 }, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
      }
    });

    // --- Modal logic ---
    closeGenLimitModalBtn.addEventListener("click", () => {
      gsap.to(generationLimitModal, { opacity: 0, duration: 0.3, onComplete: () => { generationLimitModal.style.display = "none"; } });
    });
  }

  // --- AUTH MODAL LOGIC ---
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');

  function openModal(modal) {
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modal.querySelector(".auth-card"), { scale: 0.95, y: 0 }, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
  }

  function closeModal(modal) {
    if (!modal) return;
    gsap.to(modal, { opacity: 0, duration: 0.3, onComplete: () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }});
  }

  // Triggers for opening login modal
  const loginTriggers = document.querySelectorAll('.header-login-btn, .nav-login-btn, .copy-trigger, .see-more-trigger, .power-prompts-section a');
  loginTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      // Special check for navbar link on other pages
      if (trigger.classList.contains('nav-login-btn') && !window.location.pathname.endsWith('/') && !window.location.pathname.endsWith('/index.html')) {
        window.location.href = '../auth/login.html';
        return;
      }
      openModal(loginModal);
    });
  });

  // Triggers for opening signup modal from generation limit
  const genLimitSignupBtn = document.getElementById('genLimitSignupBtn');
  if (genLimitSignupBtn) {
    genLimitSignupBtn.addEventListener('click', () => {
      closeModal(document.getElementById('generationLimitModal'));
      openModal(signupModal);
    });
  }

  // Close buttons for auth modals
  document.querySelectorAll('.close-auth-modal').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
  });

  // Switch between login/signup
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToLogin = document.getElementById('switchToLogin');
  if (switchToSignup) switchToSignup.addEventListener('click', e => { e.preventDefault(); closeModal(loginModal); openModal(signupModal); });
  if (switchToLogin) switchToLogin.addEventListener('click', e => { e.preventDefault(); closeModal(signupModal); openModal(loginModal); });

  // Form submission
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  if (loginForm) loginForm.addEventListener('submit', e => { e.preventDefault(); window.location.href = 'preferences.html'; });
  if (signupForm) signupForm.addEventListener('submit', e => { e.preventDefault(); window.location.href = 'preferences.html'; });

  // --- PROMPT CARD INTERACTIONS ---
  // This is now handled by the loginTriggers selector above.

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.fromTo(entry.target,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 }
        );
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections
  const sectionsToAnimate = [".prompts-marquee-section", ".trusted-section", ".orbit-section .section-header", ".orbit-container", ".pricing-card", ".power-card", ".faq-item", ".footer-container"];
  
  document.querySelectorAll(sectionsToAnimate.join(", ")).forEach(el => {
    gsap.set(el, { opacity: 0 }); // Hide initially
    observer.observe(el);

  });
});