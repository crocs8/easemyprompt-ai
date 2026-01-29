 
const navbar = document.createElement("header");
navbar.innerHTML = `
  <nav class="navbar">
    <div class="nav-left">
      <div class="menu-btn" id="menuBtn">
        <span></span>
      </div>
      <div class="brand">easemyprompt.ai</div>
    </div>

    <div class="desktop-menu">
      <a href="derek.html">Derek</a>
      <a href="library.html">Library</a>
      <a href="chatgpt.html">ChatGPT</a>
      <a href="power.html">Power</a>
      <a href="custom.html">Custom</a>
    </div>

    <div class="nav-right">
      <div class="profile-trigger" id="profileTrigger">
        <div class="avatar-circle">AA</div>
      </div>
      
      <!-- PROFILE DROPDOWN -->
      <div class="profile-dropdown" id="profileDropdown">
        <div class="dropdown-header">
          <div class="avatar-circle small">AA</div>
          <div class="user-info">
            <span class="name" id="navUserName">Loading...</span>
            <span class="email" id="navUserEmail">...</span>
            <span class="tokens-badge" id="navTokenDisplay">Loading...</span>
          </div>
        </div>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" id="navUpgrade">
          <span class="icon">⚡</span> Upgrade Plan
        </button>
        <button class="dropdown-item" id="navSettings">
          <span class="icon">⚙️</span> Settings
        </button>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" id="navHelp">
          <span class="icon">❓</span> Help & FAQ
        </button>
        <button class="dropdown-item" id="navLogout">
          <span class="icon">🚪</span> Log out
        </button>
      </div>
    </div>
  </nav>

  <div class="mobile-menu" id="mobileMenu">
    <a href="derek.html">Derek</a>
    <a href="library.html">Prompt Library</a>
    <a href="chatgpt.html">ChatGPT</a>
    <a href="power.html">Power Prompt</a>
    <a href="custom.html">Custom Prompts</a>
  </div>
`;

document.body.prepend(navbar);

// --- INJECT SETTINGS MODAL ---
const settingsModalHTML = `
<div class="settings-overlay" id="settingsModal">
  <div class="settings-container">
    <div class="settings-sidebar">
      <div class="sidebar-header">Settings</div>
      <button class="settings-tab active" data-tab="general"><span class="icon">⚙️</span> General</button>
      <button class="settings-tab" data-tab="personalization"><span class="icon">🎨</span> Personalization</button>
      <button class="settings-tab" data-tab="data"><span class="icon">💾</span> Data Controls</button>
      <button class="settings-tab" data-tab="security"><span class="icon">🔒</span> Security</button>
      <button class="settings-tab" data-tab="account"><span class="icon">👤</span> Account</button>
    </div>
    
    <div class="settings-content">
      <button class="close-settings-mobile" id="backToSidebar">&larr; Back</button>
      <button class="close-settings-btn" id="closeSettings">&times;</button>

      <!-- GENERAL -->
      <div class="settings-panel active" id="panel-general">
        <h2>General</h2>
        <div class="setting-group">
          <label>Theme</label>
          <select class="setting-select" id="themeSelect">
            <option value="system">System</option>
            <option value="dark" selected>Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div class="setting-group">
          <label>Language</label>
          <select class="setting-select">
            <option value="en">English (US)</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div class="setting-group">
          <label>Accent Color</label>
          <div class="color-options">
            <div class="color-circle active" style="background: #6aff9c;"></div>
            <div class="color-circle" style="background: #6a9cff;"></div>
            <div class="color-circle" style="background: #ff6a6a;"></div>
          </div>
        </div>
      </div>

      <!-- PERSONALIZATION -->
      <div class="settings-panel" id="panel-personalization">
        <h2>Personalization</h2>
        <div class="setting-group">
          <label>Prompt Tone</label>
          <p class="setting-desc">Set the default tone for Derek's output.</p>
          <select class="setting-select">
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="creative">Creative</option>
          </select>
        </div>
      </div>

      <!-- DATA CONTROLS -->
      <div class="settings-panel" id="panel-data">
        <h2>Data Controls</h2>
        <div class="setting-group">
          <label>Chat History</label>
          <button class="setting-action-btn danger">Clear all chats</button>
        </div>
        <div class="setting-group">
          <label>Export Data</label>
          <button class="setting-action-btn">Export data</button>
        </div>
      </div>

      <!-- SECURITY -->
      <div class="settings-panel" id="panel-security">
        <h2>Security</h2>
        <div class="setting-group">
          <label>Multi-Factor Authentication</label>
          <button class="setting-action-btn">Enable 2FA</button>
        </div>
        <div class="setting-group">
          <label>Log out of all devices</label>
          <button class="setting-action-btn danger">Log out all</button>
        </div>
      </div>

      <!-- ACCOUNT -->
      <div class="settings-panel" id="panel-account">
        <h2>Account</h2>
        <div class="setting-group">
          <label>Email</label>
          <input type="text" value="aryan@email.com" disabled class="setting-input-disabled">
        </div>
        <div class="setting-group">
          <label>Subscription</label>
          <div class="plan-badge">Free Plan</div>
          <button class="setting-action-btn primary" style="margin-top:1rem;">Upgrade to Pro</button>
        </div>
      </div>

    </div>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', settingsModalHTML);

// --- LOGIC ---
const menuBtn = navbar.querySelector("#menuBtn");
const mobileMenu = navbar.querySelector("#mobileMenu");
const profileTrigger = navbar.querySelector("#profileTrigger");
const profileDropdown = navbar.querySelector("#profileDropdown");
const navSettings = navbar.querySelector("#navSettings");
const navLogout = navbar.querySelector("#navLogout");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");
const settingsTabs = document.querySelectorAll(".settings-tab");
const settingsPanels = document.querySelectorAll(".settings-panel");
const backToSidebar = document.getElementById("backToSidebar");
const settingsContainer = document.querySelector(".settings-container");

// --- ACTIVE NAV LINK ---
const currentPage = window.location.pathname.split("/").pop();
const desktopLinks = document.querySelectorAll(".desktop-menu a");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

function setActive(links) {
    links.forEach(link => {
        if (link.getAttribute("href").endsWith(currentPage)) {
            link.classList.add("active");
        }
    });
}
setActive(desktopLinks);
setActive(mobileLinks);

// Mobile Menu Toggle
menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.style.display === "flex";

  if (!isOpen) {
    mobileMenu.style.display = "flex";
    gsap.fromTo(
      mobileMenu,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(
      mobileMenu.querySelectorAll("a"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.1, ease: "power2.out" }
    );
  } else {
    gsap.to(mobileMenu, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => (mobileMenu.style.display = "none")
    });
  }
});

// Profile Dropdown Toggle
profileTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
    profileDropdown.classList.remove("active");
  }
});

// Open Settings Modal
navSettings.addEventListener("click", () => {
  profileDropdown.classList.remove("active");
  settingsModal.style.display = "flex";
  gsap.fromTo(".settings-container", 
    { scale: 0.95, opacity: 0 }, 
    { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" }
  );
});

// Close Settings Modal
function closeSettingsModal() {
  gsap.to(".settings-container", { 
    scale: 0.95, 
    opacity: 0, 
    duration: 0.2, 
    onComplete: () => {
      settingsModal.style.display = "none";
      settingsContainer.classList.remove("mobile-content-active");
    }
  });
}

closeSettings.addEventListener("click", closeSettingsModal);
settingsModal.addEventListener("click", (e) => {
  if (e.target === settingsModal) closeSettingsModal();
});

// Settings Tabs Switching
settingsTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs and panels
    settingsTabs.forEach(t => t.classList.remove("active"));
    settingsPanels.forEach(p => p.classList.remove("active"));

    // Activate clicked tab
    tab.classList.add("active");
    const target = tab.getAttribute("data-tab");
    document.getElementById(`panel-${target}`).classList.add("active");

    // Mobile: Slide to content
    settingsContainer.classList.add("mobile-content-active");
  });
});

// Mobile Back to Sidebar
backToSidebar.addEventListener("click", () => {
  settingsContainer.classList.remove("mobile-content-active");
});

// Logout
navLogout.addEventListener("click", () => { 
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

// Theme Toggle Logic (Simple implementation)
const themeSelect = document.getElementById("themeSelect");
if(themeSelect) {
    themeSelect.addEventListener("change", (e) => {
        if(e.target.value === "light") document.body.classList.add("light");
        else document.body.classList.remove("light");
    });
}

// --- MOCK USER DATA (For Demo) ---
function loadDemoUser() {
  const tokenDisplay = document.getElementById("navTokenDisplay");
  const nameDisplay = document.getElementById("navUserName");
  const emailDisplay = document.getElementById("navUserEmail");

  if (tokenDisplay) tokenDisplay.textContent = `💎 1000 Tokens`;
  if (nameDisplay) nameDisplay.textContent = "Demo User";
  if (emailDisplay) emailDisplay.textContent = "demo@example.com";
}
async function loadUser() {
  const token = getToken();
  if (!token) return;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: authHeaders()
    });

    if (!res.ok) throw new Error();

    const user = await res.json();

    document.getElementById("navUserName").textContent = user.name;
    document.getElementById("navUserEmail").textContent = user.email;
    document.getElementById("navTokenDisplay").textContent = `💎 ${user.tokens} Tokens`;

  } catch {
    logout();
  }
}
loadUser();


// --- GLOBAL NETWORK BACKGROUND ---
document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("network-bg");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "network-bg";
    document.body.prepend(canvas);
  }

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
});
