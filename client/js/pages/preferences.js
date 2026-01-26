document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".pref-card");
  const continueBtn = document.getElementById("continueBtn");
  const countSpan = document.getElementById("selectionCount");
  
  let selectedCount = 0;

  // Entrance Animation
  gsap.fromTo(".pref-header", 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
  );
  
  gsap.fromTo(".pref-card", 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.2 }
  );
  
  gsap.fromTo(".pref-footer", 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, delay: 0.8 }
  );

  // Interaction
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("selected");
      
      if (card.classList.contains("selected")) {
        selectedCount++;
        // Subtle pop animation
        gsap.fromTo(card, { scale: 0.98 }, { scale: 1, duration: 0.2 });
      } else {
        selectedCount--;
      }

      countSpan.textContent = selectedCount;
      continueBtn.disabled = selectedCount === 0;
    });
  });

  // Continue
  continueBtn.addEventListener("click", () => {
    // Save preferences logic would go here
    window.location.href = "library.html";
  });
});