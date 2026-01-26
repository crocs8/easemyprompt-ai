const input = document.getElementById("promptInput");
const outputBox = document.getElementById("outputBox");
const runBtn = document.getElementById("runPrompt");

runBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;

  // Token Check
  const COST = 20;
  let currentTokens = parseInt(localStorage.getItem("derekTokens") || "0");
  
  if (currentTokens < COST) {
    alert(`Insufficient tokens! This task requires ${COST} tokens.`);
    return;
  }
  
  currentTokens -= COST;
  localStorage.setItem("derekTokens", currentTokens);
  window.dispatchEvent(new Event("tokensUpdated"));

  outputBox.style.display = "block";
  outputBox.textContent = "Running prompt...";

  // simulate ChatGPT response (frontend only)
  setTimeout(() => {
    outputBox.textContent =
`✅ ChatGPT Response (mock)

This is where the ChatGPT output will appear once the OpenAI API
is connected to the backend.

Your prompt structure looks valid and detailed.
You can now judge accuracy, clarity, and usefulness.`;
  }, 900);
});

// GSAP entrance
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
tl.from(".chatgpt-title", { y: 30, opacity: 0, duration: 0.8 })
  .from(".chatgpt-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
  .from("#promptInput", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
