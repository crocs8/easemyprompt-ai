 
document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // AUTH CHECK
  // =====================
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../auth/login.html";
    return;
  }

  // =====================
  // DOM ELEMENTS
  // =====================
  const input = document.getElementById("promptInput");
  const outputBox = document.getElementById("outputBox");
  const runBtn = document.getElementById("runPrompt");

  // =====================
  // GPT CALL
  // =====================
  runBtn.addEventListener("click", async () => {
    const prompt = input.value.trim();
    if (!prompt) return;

    outputBox.style.display = "block";
    outputBox.textContent = "Running prompt...";
    runBtn.disabled = true;
    runBtn.textContent = "Processing...";

    // SIMULATE API CALL
    setTimeout(() => {
      outputBox.textContent = `✅ ChatGPT Response (Mock for Demo)

This is a simulated response to ensure your frontend demo works perfectly without a backend connection.

Your prompt: "${prompt}"

Analysis: The prompt is well-structured.
Suggestion: Consider adding more constraints for better output.`;
      
      runBtn.disabled = false;
      runBtn.textContent = "Run Prompt";
    }, 1500);
  });

  // =====================
  // GSAP ANIMATION
  // =====================
  if (window.gsap) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".chatgpt-title", { y: 30, opacity: 0, duration: 0.8 })
      .from(".chatgpt-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
      .from("#promptInput", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
  }
});
