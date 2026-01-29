 
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     AUTH CHECK
  ========================= */
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../auth/login.html";
    return;
  }

  /* =========================
     DOM REFERENCES
  ========================= */
  const container = document.getElementById("libraryContainer");

  // Modal elements
  const modal = document.getElementById("promptModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalCopyBtn = document.getElementById("modalCopyBtn");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  // Toast
  const toast = document.getElementById("toast");

  /* =========================
     FETCH & RENDER LIBRARY
  ========================= */
  async function loadLibrary() {
  container.innerHTML = "";

  try {
    // 1. Fetch categories
    const catRes = await fetch(
      `${API_BASE_URL}/library/categories`,
      { headers: authHeaders() }
    );
    const categories = await catRes.json();

    for (const category of categories) {
      // Create category section
      const section = document.createElement("section");
      section.className = "category";

      const title = document.createElement("h2");
      title.className = "category-title";
      title.textContent = category.title;

      const row = document.createElement("div");
      row.className = "prompt-row";

      section.appendChild(title);
      section.appendChild(row);
      container.appendChild(section);

      // Fetch prompts
      const promptRes = await fetch(
        `${API_BASE_URL}/library/prompts/${category.slug}`,
        { headers: authHeaders() }
      );
      const data = await promptRes.json();

      renderPrompts(data.prompts, row);
    }

    // GSAP animation (ONLY ONCE)
    if (window.gsap) {
      gsap.from(".category", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });
    }

  } catch (err) {
    console.error("Library load failed:", err);
  }
}

  



  function renderPrompts(prompts, row) {
    prompts.forEach((item) => {
      const card = document.createElement("div");
      card.className = "prompt-card";

      card.innerHTML = `
        <div class="card-header">
          <span class="likes">❤️ ${item.likes || 0}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.prompt.substring(0, 80)}...</p>
        <div class="card-actions">
          <button class="action-btn copy-btn">Copy</button>
          <button class="action-btn view-btn">View</button>
        </div>
      `;

      // Copy button
      card.querySelector(".copy-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        copyToClipboard(item.prompt);
      });

      // View button
      card.querySelector(".view-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(item);
      });

      // Whole card click → view
      card.addEventListener("click", () => openModal(item));

      row.appendChild(card);
    });
  }

  /* =========================
     MODAL LOGIC (SINGLE SOURCE)
  ========================= */
  function openModal(item) {
    modalTitle.textContent = item.title;
    modalBody.textContent = item.prompt;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    modalCopyBtn.onclick = () => copyToClipboard(item.prompt);

    if (window.gsap) {
      gsap.fromTo(
        modal.querySelector(".modal-box"),
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  /* =========================
     CLIPBOARD + TOAST
  ========================= */
  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(showToast);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showToast();
    }
  }

  function showToast() {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }

  /* =========================
     INIT
  ========================= */
  loadLibrary();
});
