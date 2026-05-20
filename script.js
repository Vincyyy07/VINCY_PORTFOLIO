/* =====================================================
   PORTFOLIO SCRIPT — Raj Vincy Degapati
===================================================== */

// ───────────────────────────────────────────
// Theme-Synced Intro
// ───────────────────────────────────────────
document.body.classList.add('no-scroll');

const introOverlay = document.getElementById('introOverlay');
const syncText1 = document.getElementById('syncText1');
const syncText2 = document.getElementById('syncText2');
const actionContainer = document.querySelector('.intro-action');
const actionText = document.getElementById('actionText');
const actionLine = document.getElementById('actionLine');

function playSyncIntro() {
  if (!introOverlay) return;

  // 1. Reveal brand text (Smooth entry)
  setTimeout(() => {
    if (syncText1) syncText1.classList.add('visible');
  }, 400);

  // 2. Reveal tagline & action container (Followed by brand)
  setTimeout(() => {
    if (syncText2) syncText2.classList.add('visible');
    if (actionContainer) actionContainer.classList.add('visible');
  }, 1400);

  // 3. Line strikes and reveals text (The climax)
  setTimeout(() => {
    if (actionLine) actionLine.classList.add('strike');

    // Trail the text reveal slightly behind the line
    setTimeout(() => {
      if (actionText) actionText.classList.add('reveal-text');
    }, 150);

  }, 2200);

  // 4. Smooth Fade out overlay after action is complete
  setTimeout(() => {
    introOverlay.style.opacity = '0';
    introOverlay.style.filter = 'blur(20px)'; // Extra polish on fade out

    // 5. Cleanup and init AOS
    setTimeout(() => {
      introOverlay.remove();
      document.body.classList.remove('no-scroll');
      if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 850, easing: 'ease-out-cubic' });
      }
    }, 1000);
  }, 4000);
}

// Start intro sequence
window.addEventListener('load', playSyncIntro);

// ───────────────────────────────────────────
// Typed.js
// ───────────────────────────────────────────
new Typed('#typed', {
  strings: [
    'Front-End Developer',
    'CSE Student @ AEC',
    'Graphic Designer',
    'Problem Solver',
    'UI/UX Explorer'
  ],
  typeSpeed: 55,
  backSpeed: 32,
  backDelay: 1800,
  loop: true
});

// ───────────────────────────────────────────
// Theme Toggle
// ───────────────────────────────────────────
function toggleMode() {
  document.body.classList.toggle('light');
  const icon = document.querySelector('#themeToggle i');
  if (document.body.classList.contains('light')) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

// Persist theme
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = 'fas fa-sun';
  }
})();

// ───────────────────────────────────────────
// Cursor Glow
// ───────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ───────────────────────────────────────────
// Particles
// ───────────────────────────────────────────
(function spawnParticles() {
  const container = document.getElementById('particles');
  const count = 30;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const dur = Math.random() * 18 + 10;
    const delay = Math.random() * 20;
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    container.appendChild(dot);
  }
})();

// ───────────────────────────────────────────
// Active Nav Dot (Intersection Observer)
// ───────────────────────────────────────────
const sectionIds = ['home', 'about', 'skills', 'projects', 'internships', 'achievements', 'contact'];
const navLinks = {};
sectionIds.forEach(id => {
  navLinks[id] = document.getElementById('nav-' + id);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sectionIds.forEach(id => {
        if (navLinks[id]) navLinks[id].classList.remove('active');
      });
      const id = entry.target.id;
      if (navLinks[id]) navLinks[id].classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// ───────────────────────────────────────────
// Back-to-Top Button
// ───────────────────────────────────────────
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ───────────────────────────────────────────
// Topbar shadow on scroll
// ───────────────────────────────────────────
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    topbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
  } else {
    topbar.style.boxShadow = 'none';
  }
});

// ───────────────────────────────────────────
// Contact Form Handler
// ───────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const subject = document.getElementById('cSubject').value.trim();
  const message = document.getElementById('cMessage').value.trim();
  const fb = document.getElementById('formFeedback');
  const btn = e.target.querySelector('button[type="submit"]');

  if (!name || !email || !subject || !message) {
    fb.textContent = '⚠ Please fill in all fields.';
    fb.className = 'form-feedback error';
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  // Simulated send (mailto fallback)
  setTimeout(() => {
    const mailto = `mailto:degapatirajvincy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    window.location.href = mailto;

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    fb.textContent = '✅ Message ready! Your email client will open.';
    fb.className = 'form-feedback success';
    e.target.reset();

    setTimeout(() => { fb.textContent = ''; fb.className = 'form-feedback'; }, 5000);
  }, 1200);
}

// ───────────────────────────────────────────
// Skill Pill hover ripple effect
// ───────────────────────────────────────────
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      width: 100px; height: 100px;
      left: ${e.offsetX - 50}px;
      top: ${e.offsetY - 50}px;
      animation: rippleOut 0.5s ease forwards;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleOut {
    from { transform: scale(0); opacity: 1; }
    to   { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ───────────────────────────────────────────
// Project card glow on mouse move
// ───────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.project-glow');
    if (glow) {
      glow.style.left = x - 100 + 'px';
      glow.style.top = y - 100 + 'px';
    }
  });
});

// ───────────────────────────────────────────
// AI Chatbot Logic (VincyBot)
// ───────────────────────────────────────────
let isChatbotOpen = false;
let isMinimized = false;

const chatbotWindow = document.getElementById('chatbotWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

// Initialize Chatbot with a Welcome Message if empty
function initChatbot() {
  if (chatMessages && chatMessages.children.length === 0) {
    appendBotMessage("Hey there! 👋 I'm **Vinc**, Raj Vincy's AI assistant. Ask me anything about his skills, projects, certifications, or experience, and I'll answer instantly! 🤖");
  }
}

// Toggle Open/Close
function toggleChatbot() {
  isChatbotOpen = !isChatbotOpen;
  if (isChatbotOpen) {
    chatbotWindow.classList.add('open');
    initChatbot();
    // Scroll to bottom
    setTimeout(() => {
      const chatBody = document.getElementById('chatBody');
      if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    }, 100);
  } else {
    chatbotWindow.classList.remove('open');
  }
}

// Toggle Minimize
function toggleMinimize() {
  isMinimized = !isMinimized;
  const minBtn = document.getElementById('chatMinBtn');
  if (isMinimized) {
    chatbotWindow.classList.add('minimized');
    if (minBtn) minBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  } else {
    chatbotWindow.classList.remove('minimized');
    if (minBtn) minBtn.innerHTML = '<i class="fas fa-minus"></i>';
  }
}

// Append User Message to Chat Window
function appendUserMessage(text) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msgHtml = `
    <div class="chat-message user">
      <div class="msg-content">${escapeHTML(text)}</div>
      <span class="msg-time">${time}</span>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', msgHtml);
  scrollToBottom();
}

// Append Bot Message (supports basic markdown formatting like bold/links)
function appendBotMessage(text) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedText = parseBotMarkdown(text);

  const msgHtml = `
    <div class="chat-message bot">
      <div class="msg-content">${formattedText}</div>
      <span class="msg-time">${time}</span>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', msgHtml);
  scrollToBottom();
}

// Display typing indicator while generating response
function showTypingIndicator() {
  const indicatorHtml = `
    <div class="typing-indicator" id="typingIndicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', indicatorHtml);
  scrollToBottom();
}

function removeTypingIndicator() {
  const indicator = document.getElementById('typingIndicator');
  if (indicator) indicator.remove();
}

function scrollToBottom() {
  const chatBody = document.getElementById('chatBody');
  if (chatBody) {
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
  }
}

// Escape HTML tags to prevent XSS
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Basic custom markdown parser for links, bold, and linebreaks
function parseBotMarkdown(text) {
  // Convert [text](url) to <a href="url" target="_blank" rel="noopener noreferrer">text</a>
  let parsed = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Convert **text** to <strong>text</strong>
  parsed = parsed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Convert bullet points starting with * or • to linebreaks
  parsed = parsed.replace(/\n/g, '<br>');
  return parsed;
}

// Handle Form Submissions
function handleChatSubmit(e) {
  e.preventDefault();
  const query = chatInput.value.trim();
  if (!query) return;

  chatInput.value = '';
  processQuery(query);
}

// Handle suggestion chip clicks
function handleSuggestion(suggestionText) {
  processQuery(suggestionText);
}

// Process user queries (Local Offline Logic)
function processQuery(query) {
  appendUserMessage(query);
  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    const localResponse = getLocalBotResponse(query);
    appendBotMessage(localResponse);
  }, 1000);
}


// Local Semantic Matcher loaded with Portfolio Knowledge Base
function getLocalBotResponse(input) {
  const text = input.toLowerCase().trim();

  const categories = [
    {
      id: 'greeting',
      keywords: ['hi', 'hello', 'hey', 'greetings', 'yo', 'sup', 'bot', 'vincybot', 'who are you', 'what is your name', 'start'],
      response: "Hey there! 👋 I'm **Vinc**, Raj Vincy's custom AI assistant. I'm here to answer questions about his skills, projects, achievements, and background! Feel free to ask me anything or click the suggestion chips below."
    },
    {
      id: 'about',
      keywords: ['about', 'profile', 'who is', 'raj', 'vincy', 'degapati', 'college', 'study', 'education', 'aditya', 'cgpa', 'student', 'btech', 'school'],
      response: "Raj Vincy Degapati is a highly motivated **Computer Science & Engineering student** at **Aditya Engineering College (A), Surampalem** (B.Tech, 2023 - Present) with an impressive **CGPA of 8.45**.<br><br>He has a strong passion for front-end development, graphic design, and UI/UX engineering, always striving to build clean, responsive, and premium web interfaces."
    },
    {
      id: 'skills',
      keywords: ['skills', 'skill', 'technologies', 'programming', 'languages', 'frontend', 'backend', 'react', 'javascript', 'html', 'css', 'typescript', 'tailwind', 'bootstrap', 'python', 'dsa', 'database', 'mongodb', 'mysql', 'sqlite', 'c++', 'c language'],
      response: "Here are Raj Vincy's technical proficiencies:<br><br>• 💻 **Languages:** C, C++, Python, JavaScript, TypeScript<br>• 🌐 **Web Development:** HTML5, CSS3, React, Tailwind CSS, Bootstrap, Vite<br>• 🗄️ **Databases:** MongoDB, MySQL, SQLite<br>• 🛠️ **Developer Tools:** Git, GitHub, VS Code<br>• 🧠 **Core Competencies:** Problem Solving, Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), and Responsive UI/UX Design."
    },
    {
      id: 'projects',
      keywords: ['projects', 'project', 'portfolio', 'portfolio site', 'mocmate', 'secure password', 'password checker', 'interview', 'ai platform', 'build', 'work'],
      response: "Raj Vincy has built some highly polished, interactive web applications:<br><br>1. 🛡️ **Secure Password**: A React & TypeScript password strength checker that validates inputs based on advanced complexity criteria and provides secure suggestions.<br>👉 [GitHub Repo](https://github.com/Vincyyy07/secure-password) | [Live Demo](https://secure-password-lac.vercel.app)<br><br>2. 🤖 **MocMate AI**: An AI-powered interview simulator built using React, TypeScript, and Tailwind CSS. It features custom question sheets, analytics, and rich dashboards.<br>👉 [GitHub Repo](https://github.com/Vincyyy07/MocMate-AI) | [Live Demo](https://team-code-zenith-main.onrender.com/)"
    },
    {
      id: 'internships',
      keywords: ['internship', 'internships', 'experience', 'work experience', '1stop', 'job', 'trainee', 'training'],
      response: "Raj completed a trainee internship as a **Front-End Developer** at **1Stop.ai** (May 2025 – June 2025).<br><br>During this time, he was trained in HTML, CSS, and JavaScript, earned certification, and built hands-on front-end projects including his first fully responsive portfolio interface."
    },
    {
      id: 'achievements',
      keywords: ['achievements', 'achievement', 'coding profiles', 'codechef', 'leetcode', 'hackerrank', 'geeksforgeeks', 'gfg', 'stars', 'problems', 'solved'],
      response: "Raj Vincy is highly active on competitive programming and algorithmic solving platforms:<br><br>• 🍽️ **CodeChef:** 1-Star Coder with a Max Rating of **1179**.<br>• 💻 **LeetCode:** Solved **150+ problems** and regularly active.<br>• ⭐ **HackerRank:** Achieved **5⭐ in Problem Solving**, **5⭐ in C**, and **4⭐ in C++**.<br>• 🍃 **GeeksforGeeks:** Actively practices data structures and algorithms."
    },
    {
      id: 'certifications',
      keywords: ['certifications', 'cert', 'certificate', 'certification', 'ibm', 'springboard', 'linkedin learning', 'hacker rank'],
      response: "Raj has earned several reputable industry certifications:<br><br>• 🧠 **IBM SkillsBuild:** Web Development Fundamentals<br>• ⚛️ **HackerRank:** Frontend Developer (React), Problem Solving (Basic & Intermediate), SQL (Basic)<br>• 💼 **HackerRank:** Software Engineer Intern Certification<br>• 📚 **LinkedIn Learning:** Object Oriented Design, React Essential Training<br>• 🤖 **Infosys Springboard:** AI Foundation Certification"
    },
    {
      id: 'contact',
      keywords: ['contact', 'email', 'phone', 'call', 'reach', 'socials', 'linkedin', 'github', 'mail', 'connect', 'location', 'address', 'where do you live'],
      response: "You can easily get in touch with Raj Vincy here:<br><br>• 📧 **Email:** [degapatirajvincy@gmail.com](mailto:degapatirajvincy@gmail.com)<br>• 📞 **Phone:** [+91 6305575411](tel:+916305575411)<br>• 📍 **Location:** Andhra Pradesh, India<br>• 💼 **LinkedIn:** [raj-vincy-degapati](https://linkedin.com/in/raj-vincy-degapati)<br>• 💻 **GitHub:** [Vincyyy07](https://github.com/Vincyyy07)<br><br>Feel free to shoot him an email or fill out the contact form directly in the **Contact** section of the website!"
    },
    {
      id: 'resume',
      keywords: ['resume', 'cv', 'biodata', 'hire', 'hiring', 'resume.pdf'],
      response: "You can view or download Raj's official resume here:<br><br>👉 [Download Resume / CV](assets/resume.pdf) (PDF Format)<br><br>He is actively seeking internship and front-end development opportunities!"
    },
    {
      id: 'joke',
      keywords: ['joke', 'funny', 'laugh', 'tell me a joke'],
      response: "Here's one for you:<br><br>*Why do front-end developers eat lunch alone?*<br>Because they don't know how to **join** tables! 😂 (Get it? SQL joins!)"
    }
  ];

  // Score each category based on keyword matches
  let bestMatch = null;
  let highestScore = 0;

  categories.forEach(cat => {
    let score = 0;
    cat.keywords.forEach(keyword => {
      // Escape regex special characters to prevent syntax crashes with terms like 'c++'
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regexFull = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
      const matchesFull = text.match(regexFull);
      if (matchesFull) {
        score += matchesFull.length * 3;
      } else if (text.includes(keyword)) {
        score += 1;
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = cat;
    }
  });

  if (highestScore > 0 && bestMatch) {
    return bestMatch.response;
  }

  // Default fallback response
  return "I'm not quite sure about that specific question, but I'd love to help! You can ask me about Raj's **skills**, **projects**, **education**, **certifications**, or **how to contact him**. <br><br>Or just click one of the quick chips below! 👇";
}
