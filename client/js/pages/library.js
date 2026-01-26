const promptsData = [
  {
    category: "Resume & Arts",
    items: [
      { id: 1, title: "Weak Resume → Strong Rewrite", likes: "1.2k", content: "Please rewrite my resume to transform it from weak to strong.\n\nCurrent Resume: [Paste your resume here]\n\nPlease:\n- Reorganize sections in a logical order (Summary, Experience, Skills, Education, Projects)\n- Fill in gaps with relevant content suggestions\n- Strengthen all section headings and formatting for clarity\n- Convert paragraphs to bullet points where applicable\n- Identify and remove irrelevant or outdated information\n- Create a complete revised version with explanations for key changes\n- Ensure it tells a cohesive career story." },
      { id: 2, title: "Experienced Professional Improvement", likes: "950", content: "I am an experienced professional seeking to upgrade my resume for senior or leadership roles.\n\nTarget Role: [e.g., Senior Product Manager]\nYears of Experience: [e.g., 8+ years]\nMy Resume: [Paste your resume here]\n\nPlease:\n- Elevate my professional summary to reflect leadership and strategic impact\n- Convert my bullet points from task-based to achievement-based (using CAR/STAR method)\n- Quantify achievements with metrics wherever possible\n- Prioritize recent and relevant experience\n- Suggest power verbs and industry-specific keywords\n- Ensure a polished, executive-level tone" },
      { id: 3, title: "Resume Feedback with Reasons", likes: "800", content: "Please provide detailed feedback on my resume with clear reasons for each suggestion.\n\nMy Resume: [Paste your resume here]\n\nFor each section, please:\n- Note what’s working well and why\n- Identify areas for improvement with specific examples\n- Explain the underlying principle\n- Suggest 1–2 actionable fixes per issue\n- Rate the overall resume on a scale of 1–10\n- Summarize the top 3 priorities for improvement" },
      { id: 4, title: "Resume Wording Enhancement", likes: "1.1k", content: "Please enhance the wording and bullet points in my resume to be more impactful and ATS-friendly.\n\nMy Resume: [Paste your resume here]\n\nPlease:\n- Replace weak verbs with strong action verbs\n- Add quantifiable results to at least 5 bullet points\n- Remove jargon, clichés, and passive language\n- Ensure each bullet starts with a power verb and follows the “action → result → impact” structure\n- Improve conciseness\n- Provide a side-by-side comparison of 3–4 improved bullets" },
      { id: 5, title: "Technical Skills Matrix Resume", likes: "1.5k", content: "Build a technical resume with a clear skills matrix for [Engineering/IT/Data/Design] roles.\n\nInclude:\n- Skills categorized by proficiency (Advanced, Intermediate, Familiar)\n- Tools, languages, frameworks, and platforms in separate groups\n- Projects tied directly to skill application\n- Certifications linked to skill validation\n- ATS-friendly format that still showcases technical depth" }
    ]
  },
  {
    category: "Job Seekers",
    items: [
      { id: 6, title: "Tell Me About Yourself", likes: "2.5k", content: "Craft a 2-minute “Tell me about yourself” answer for a [Job Title] interview.\n\nStructure:\n- Present: Current role and focus\n- Past: Relevant experience and skills\n- Future: How this role aligns with goals\n\nInclude a hook and keep it relevant to the job." },
      { id: 7, title: "Strengths & Weaknesses Answer", likes: "1.9k", content: "Generate a balanced strengths and weaknesses answer.\n\nFor strengths, pick 2–3 job-relevant ones with examples.\nFor weaknesses, choose 1 real one with steps taken to improve.\n\nEnsure weaknesses are not deal-breakers and show self-awareness." },
      { id: 8, title: "Project Explanation (Portfolio)", likes: "1.3k", content: "Prepare a clear, interview-ready project explanation for [Project Name].\n\nCover:\n- Problem Statement\n- My Role & Actions\n- Tools & Technologies\n- Challenges & Solutions\n- Final Outcome & Metrics" },
      { id: 9, title: "5-Year Career Roadmap", likes: "1.8k", content: "Create a 5-year career roadmap for someone currently in [Current Role] aiming to become a [Target Role].\n\nInclude:\n- Year 1–5 skill plans, promotions, certifications, leadership goals, and salary targets.\n- Add quarterly checkpoints and measurable success metrics." },
      { id: 10, title: "Industry Leadership Roadmap", likes: "1.4k", content: "Build a roadmap to become an industry leader/expert in [Field/Specialization].\n\nCover:\n- Knowledge building\n- Network expansion\n- Content creation\n- Credibility markers\n- Monetization path" }
    ]
  },
  {
    category: "Cover Letter Prompts",
    items: [
      { id: 11, title: "Internship Cover Letter", likes: "900", content: "Write a 150–180 word cover letter for an internship at [Company Name] for the role of [Internship Title].\n\nInclude enthusiasm, relevant coursework, why the company interests you, and availability." },
      { id: 12, title: "Job Application Cover Letter", likes: "1.6k", content: "Draft a professional cover letter for a full-time role as [Job Title] at [Company].\n\nMy Background: [Brief experience]\nJob Requirements: [From JD]\nWhy I’m a Fit: [Key achievements]\n\nTone should be confident and value-focused." },
      { id: 13, title: "Career Switch Cover Letter", likes: "1.2k", content: "Compose a cover letter explaining my transition from [Previous Career] to [New Career].\n\nAddress transferable skills, preparation steps, and value addition." },
      { id: 14, title: "Short Email-Style Cover Letter", likes: "2.1k", content: "Create a 150-word cover letter suitable for email body or LinkedIn Easy Apply.\n\nInclude intro, one achievement, one reason for interest, and CTA." },
      { id: 15, title: "Offer Letter Acceptance Email", likes: "3.0k", content: "Write a professional acceptance email for a job offer.\n\nInclude gratitude, confirmation of role, start date, and enthusiasm." },
      { id: 16, title: "Offer Letter Review Prompt", likes: "850", content: "Review this job offer letter and explain:\n- Red flags\n- Negotiation points\n- Clauses to clarify\n- Whether the offer is fair for my experience" },
      { id: 17, title: "Salary Negotiation Note", likes: "2.8k", content: "Help me write a polite salary negotiation response after receiving an offer.\n\nBalance confidence with professionalism. Request a specific increase based on market data and value." },
      { id: 18, title: "Rejection Follow-Up Email", likes: "1.1k", content: "Draft a professional follow-up email after job rejection asking for feedback. Keep it polite and keep the door open for future opportunities." },
      { id: 19, title: "LinkedIn Easy Apply Text", likes: "1.7k", content: "Create a concise, punchy cover text optimized for LinkedIn Easy Apply.\n\nFocus on immediate value and fit." },
      { id: 20, title: "Referral Request Message", likes: "1.5k", content: "Write a polite referral request message for someone working at [Company].\n\nExplain connection, interest in role, and ask for guidance." }
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("libraryContainer");
  const modal = document.getElementById("promptModal");
  const toast = document.getElementById("toast");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalCopyBtn = document.getElementById("modalCopyBtn");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  // Render Library
  promptsData.forEach(cat => {
    const catSection = document.createElement("section");
    catSection.className = "category";
    
    const catTitle = document.createElement("h2");
    catTitle.className = "category-title";
    catTitle.textContent = cat.category;
    catSection.appendChild(catTitle);

    const row = document.createElement("div");
    row.className = "prompt-row";

    cat.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "prompt-card";
      card.setAttribute("data-id", item.id);
      
      card.innerHTML = `
        <div class="card-header">
          <span class="likes">❤️ ${item.likes}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.content.substring(0, 80)}...</p>
        <div class="card-actions">
          <button class="action-btn copy-btn">Copy</button>
          <button class="action-btn view-btn">View</button>
        </div>
      `;

      // Event Listeners
      const copyBtn = card.querySelector(".copy-btn");
      const viewBtn = card.querySelector(".view-btn");

      copyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        copyToClipboard(item.content);
      });

      viewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(item);
      });

      card.addEventListener("click", () => openModal(item));

      row.appendChild(card);
    });

    catSection.appendChild(row);
    container.appendChild(catSection);
  });

  // Modal Logic
  function openModal(item) {
    modalTitle.textContent = item.title;
    modalBody.textContent = item.content;
    modal.style.display = "flex";
    
    // Reset scroll to top for focused reading view
    const scrollArea = modal.querySelector(".modal-scroll-area");
    if (scrollArea) scrollArea.scrollTop = 0;

    // Lock body scroll to preserve library context
    document.body.style.overflow = "hidden";

    gsap.fromTo(modal.querySelector(".modal-box"), { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    
    modalCopyBtn.onclick = () => copyToClipboard(item.content);
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast())
        .catch(err => {
          console.warn("Clipboard API failed, using fallback", err);
          fallbackCopy(text);
        });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Avoid scrolling to bottom
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast();
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
    document.body.removeChild(textArea);
  }

  function showToast() {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }

  // GSAP Entrance
  gsap.from(".category", { y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" });
});