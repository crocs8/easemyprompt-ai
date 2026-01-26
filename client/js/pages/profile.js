// GSAP Entrance Animation
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.from(".profile-header", { y: 20, opacity: 0, duration: 0.6 })
  .from(".profile-section", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");

// Logout functionality
const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // In a real app, you'd clear tokens here.
    // For the mock, we just redirect.
    window.location.href = "../auth/login.html";
  });
}
