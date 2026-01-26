const form = document.getElementById("customForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", e => {
  e.preventDefault();

  const btn = form.querySelector(".submit-btn");
  btn.textContent = "Sending...";
  btn.disabled = true;

  // frontend-only simulation
  setTimeout(() => {
    btn.textContent = "Submit Request";
    btn.disabled = false;
    successMsg.style.display = "block";
    form.reset();
  }, 900);
});

// GSAP entrance
gsap.from(".custom-container", {
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});
