const themeBtn = document.getElementById("themeBtn");
const logoutBtn = document.querySelector(".setting-btn.danger");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

logoutBtn.addEventListener("click", () => {
  // For a frontend-only mock, we redirect to the login page.
  window.location.href = "../auth/login.html";
});

// Entrance animation
gsap.from(".settings-card", {
  y: 20,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out"
});
