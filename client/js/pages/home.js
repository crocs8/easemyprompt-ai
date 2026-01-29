document.addEventListener("DOMContentLoaded", () => {

  // Prevent dummy links
  document.querySelectorAll('a[href="#"]').forEach(a =>
    a.addEventListener("click", e => e.preventDefault())
  );

  // ================= BACKGROUND =================
  const canvas = document.getElementById("network-bg");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];

    const config = {
      particleColor: "rgba(106,255,156,0.5)",
      lineColor: "rgba(106,255,156,0.15)",
      particleRadius: 1.5,
      maxSpeed: 0.4,
      connectionDistanceSq: 120 * 120
    };

    function resize() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      init();
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

    function init() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 9000);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const d = dx * dx + dy * dy;
          if (d < config.connectionDistanceSq) {
            ctx.beginPath();
            ctx.strokeStyle = config.lineColor;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    }

    addEventListener("resize", resize);
    resize();
    animate();
  }

  // ================= GSAP =================
  gsap.from(".hero-title", { y: 40, opacity: 0, duration: 0.8 });
  gsap.from(".hero-sub", { y: 20, opacity: 0, duration: 0.6, delay: 0.2 });
  gsap.from(".derek-input-box", { y: 20, opacity: 0, duration: 0.6, delay: 0.4 });

  // ================= MODALS =================
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");

  function openModal(m) {
    m.style.display = "flex";
    document.body.style.overflow = "hidden";
    gsap.fromTo(m, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }

  function closeModal(m) {
    gsap.to(m, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        m.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  }

  document.getElementById("headerLoginBtn")
    ?.addEventListener("click", () => openModal(loginModal));

  document.querySelectorAll(".close-auth-modal")
    .forEach(b => b.onclick = () => closeModal(b.closest(".modal-overlay")));

  document.getElementById("switchToSignup")
    ?.addEventListener("click", () => { closeModal(loginModal); openModal(signupModal); });

  document.getElementById("switchToLogin")
    ?.addEventListener("click", () => { closeModal(signupModal); openModal(loginModal); });

  // ================= AUTH =================
// LOGIN
document.getElementById("homeLoginForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("homeLoginEmail").value;
    const password = document.getElementById("homeLoginPassword").value;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setToken(data.token);
      window.location.href = "../pages/preferences.html";

    } catch (err) {
      alert(err.message || "Login failed");
    }
  });

  // SIGNUP
document.getElementById("homeSignupForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("homeSignupName").value;
    const email = document.getElementById("homeSignupEmail").value;
    const password = document.getElementById("homeSignupPassword").value;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setToken(data.token);
      window.location.href = "../pages/preferences.html";

    } catch (err) {
      alert(err.message || "Signup failed");
    }
  });


