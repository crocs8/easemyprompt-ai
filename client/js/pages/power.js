const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const closeBtn = document.getElementById("closeModal");

document.querySelectorAll(".poster-card").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modal.style.display = "flex";

    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    gsap.fromTo(".modal-box", {
      y: 20,
      opacity: 0,
      scale: 0.95
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.2)",
      delay: 0.05
    });
  });
});

closeBtn.addEventListener("click", () => {
  gsap.to(modal, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => (modal.style.display = "none")
  });
});

// Entrance animation
gsap.from(".poster-card", {
  opacity: 0,
  y: 20,
  stagger: 0.1,
  duration: 0.6,
  ease: "power3.out"
});
