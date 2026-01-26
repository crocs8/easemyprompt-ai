document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    let valid = true;
    form.querySelectorAll("input").forEach(input => {
      if (!input.value.trim()) {
        input.style.outline = "2px solid #ff4d4d";
        valid = false;
      } else {
        input.style.outline = "none";
      }
    });

    if (!valid) return;

    const btn = form.querySelector(".auth-btn");
    const original = btn.textContent;

    btn.textContent = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      alert("Frontend auth success (backend later)");
    }, 900);
  });
});
