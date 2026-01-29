document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../auth/login.html";
    return;
  }

  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const tokensEl = document.getElementById("profileTokens");
  const avatarEl = document.getElementById("profileAvatar");
  const logoutBtn = document.getElementById("logoutBtn");

  // Decode JWT (safe, no backend call needed)
  function parseJwt(token) {
    try {
      const base64 = token.split(".")[1];
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

  const decoded = parseJwt(token);

  if (!decoded) {
    localStorage.removeItem("token");
    window.location.href = "../auth/login.html";
    return;
  }

  // Fetch fresh user data (source of truth)
  fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      nameEl.textContent = data.name;
      emailEl.textContent = data.email;
      tokensEl.textContent = data.tokens;

      // Avatar initial
      avatarEl.textContent = data.name.charAt(0).toUpperCase();
    })
    .catch(() => {
      nameEl.textContent = "Error loading profile";
    });

  // Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "../auth/login.html";
  });
});
