const input = document.getElementById("derekInput");
const outputBox = document.getElementById("outputBox");
const generateBtn = document.getElementById("generateBtn");

const examples = [
  "generate an image of a banana wearing a cap",
  "generate a video of a swimming cow",
  "create a cinematic shot of a futuristic city",
  "design a logo for an AI startup"
];

let exampleIndex = 0;
let charIndex = 0;
let typingInterval = null;
let isDeleting = false;
let isPaused = false;
let isWaiting = false;

function startTyping() {
  if (typingInterval) return;

  typingInterval = setInterval(() => {
    if (isPaused || isWaiting || input.value.length > 0) return;

    const current = examples[exampleIndex];

    if (!isDeleting) {
      input.placeholder = current.slice(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        isWaiting = true;
        setTimeout(() => { isWaiting = false; }, 1000);
      }
    } else {
      input.placeholder = current.slice(0, charIndex--);
      if (charIndex === 0) {
        isDeleting = false;
        exampleIndex = (exampleIndex + 1) % examples.length;
      }
    }
  }, 70);
}

function stopTyping() {
  clearInterval(typingInterval);
  typingInterval = null;
}

// INPUT EVENTS
input.addEventListener("focus", () => {
  isPaused = true;
});

input.addEventListener("blur", () => {
  isPaused = false;
  if (!input.value) startTyping();
});

input.addEventListener("input", () => {
  if (input.value.length > 0) {
    input.placeholder = "";
  }
  // Auto-expand textarea
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

// FAKE GENERATE (for now)
generateBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;

  // Token Check
  const COST = 50;
  let currentTokens = parseInt(localStorage.getItem("derekTokens") || "0");
  
  if (currentTokens < COST) {
    alert(`Insufficient tokens! This task requires ${COST} tokens.`);
    return;
  }
  
  currentTokens -= COST;
  localStorage.setItem("derekTokens", currentTokens);
  window.dispatchEvent(new Event("tokensUpdated"));

  outputBox.style.display = "block";
  outputBox.textContent =
    "Detailed prompt will be generated here by your AI model.";
});

// START
startTyping();

// GSAP ENTRY
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
tl.from(".derek-title", { y: 30, opacity: 0, duration: 0.8 })
  .from(".derek-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
  .from(".derek-input-box", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
