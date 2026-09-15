/* ==========================================================================
   STARTUPINDIA.LAW : CLIENT LOGIC CONTROLLER
   Optimized for High Speed, 60fps Matrix Animation & Zero Dead Code
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // === CRITICAL PATH: runs immediately, needed for first render/interaction ===
  initLegalDisclaimerModal();
  initHeader();
  initFrame1Bell();
  initLegalBot();
  initCalendlyModal();
  initClickableCards();
  initContactFormPrefill();
  initContactForm();

  // === DEFERRED: non-critical enhancements, run in idle time after paint ===
  const defer = window.requestIdleCallback || ((fn) => setTimeout(fn, 100));
  defer(() => {
    initHeroBinaryCanvas();
    initScrollReveal();
    initMagneticButtons();
    initInteractiveCursor();
  });
});

/* ==========================================================================
   1. STATUTORY LEGAL DISCLAIMER MODAL CONTROLLER
   ========================================================================== */
function initLegalDisclaimerModal() {
  const overlay = document.getElementById('disclaimerOverlay');
  const btnAgree = document.getElementById('btnDisclaimerAgree');
  const btnDisagree = document.getElementById('btnDisclaimerDisagree');
  const btnClose = document.getElementById('disclaimerCloseBtn');

  if (!overlay) return;

  const hasAgreed = localStorage.getItem('startupIndiaLaw_disclaimerAgreed');

  if (!hasAgreed) {
    overlay.classList.add('disclaimer-visible');
    document.body.style.overflow = 'hidden';
  } else {
    overlay.classList.remove('disclaimer-visible');
    document.body.style.overflow = '';
  }

  // Allow reopening the statutory disclaimer anytime
  window.openDisclaimerModal = function () {
    overlay.classList.add('disclaimer-visible');
    document.body.style.overflow = 'hidden';
  };

  // Bind any open disclaimer buttons/links
  document.querySelectorAll('[data-open-disclaimer]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.openDisclaimerModal();
    });
  });

  function closeDisclaimer(agreed) {
    if (agreed) {
      localStorage.setItem('startupIndiaLaw_disclaimerAgreed', 'true');
    }
    overlay.classList.remove('disclaimer-visible');
    document.body.style.overflow = '';
  }

  if (btnAgree) {
    btnAgree.addEventListener('click', () => {
      closeDisclaimer(true);
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      closeDisclaimer(false);
    });
  }

  if (btnDisagree) {
    btnDisagree.addEventListener('click', () => {
      window.location.href = 'https://www.google.com';
    });
  }
}

/* ==========================================================================
   2. GLOBAL HEADER & NAVIGATION CONTROLLER
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('siteHeader');
  const hamburger = document.getElementById('headerHamburger');
  const drawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!header) return;

  // Header scroll elevation
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (hamburger && drawer) {
    // Look for or dynamically create backdrop if not present
    let backdrop = document.getElementById('mobileNavBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-nav-backdrop';
      backdrop.id = 'mobileNavBackdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }

    const openDrawer = () => {
      drawer.classList.add('drawer-open');
      backdrop.classList.add('backdrop-open');
      document.body.classList.add('mobile-drawer-open');
      hamburger.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('drawer-open');
      backdrop.classList.remove('backdrop-open');
      document.body.classList.remove('mobile-drawer-open');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.contains('drawer-open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close button inside the drawer
    const internalCloseBtn = document.getElementById('mobileNavCloseBtn');
    if (internalCloseBtn) {
      internalCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDrawer();
      });
    }

    // Close when clicking the backdrop
    backdrop.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });

    // Close on nav link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('drawer-open')) {
        closeDrawer();
      }
    });

    // Mobile consult button in drawer: closes drawer and opens Calendly modal
    const btnMobileConsult = document.getElementById('btnMobileConsult');
    if (btnMobileConsult) {
      btnMobileConsult.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDrawer();
        if (typeof window.openCalendlyModal === 'function') {
          window.openCalendlyModal();
        }
      });
    }

    // Prevent clicks inside drawer content from bubbling to outside listeners
    drawer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Active page indicator check
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.header-nav .nav-link, .mobile-nav-link');

  let activeSection = 'home';
  if (currentPath.includes('services')) {
    activeSection = 'services';
  } else if (currentPath.includes('work')) {
    activeSection = 'work';
  } else if (currentPath.includes('updates')) {
    activeSection = 'updates';
  } else if (currentPath.includes('about')) {
    activeSection = 'about';
  } else if (currentPath.includes('contact')) {
    activeSection = 'contact';
  } else {
    activeSection = 'home';
  }

  navLinks.forEach(link => {
    const dataNav = link.getAttribute('data-nav');
    const href = (link.getAttribute('href') || '').toLowerCase();
    const isCurrent = (dataNav === activeSection) ||
      (activeSection === 'home' && (href === '/' || href.includes('index.html'))) ||
      (activeSection !== 'home' && href.includes(activeSection));

    if (isCurrent) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else if (!href.startsWith('#')) {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/* ==========================================================================
   3. THE STARTUP QUERY BASIN CONTROLLER
   ========================================================================== */
function initFrame1Bell() {
  const queryVessel = document.getElementById('queryVessel');
  const questionStep = document.getElementById('vesselQuestionStep');
  const emailStep = document.getElementById('vesselEmailStep');
  const confirmation = document.getElementById('vesselConfirmation');

  const customQuestionInput = document.getElementById('customQuestionInput');
  const questionForm = document.getElementById('vesselQuestionForm');
  const questionLines = document.querySelectorAll('.question-line');

  const previewQuestionText = document.getElementById('previewQuestionText');
  const btnChangeQuestion = document.getElementById('btnChangeQuestion');
  const emailForm = document.getElementById('vesselEmailForm');
  const nameInput = document.getElementById('vesselNameInput');
  const emailInput = document.getElementById('vesselEmailInput');

  if (!queryVessel) return;

  // 1. Click on initial bar -> Open Question Step
  queryVessel.addEventListener('click', openQuestionStep);
  queryVessel.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openQuestionStep();
    }
  });

  function openQuestionStep() {
    queryVessel.classList.add('hidden');
    questionStep.classList.remove('hidden');
    if (customQuestionInput) {
      customQuestionInput.focus();
    }
  }

  // 2. Submit Question Form -> Advance to Email Step
  if (questionForm) {
    questionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const qText = customQuestionInput.value.trim();
      if (qText) {
        goToEmailStep(qText);
      }
    });
  }

  // 3. Click predefined Question Line -> Advance to Email Step
  questionLines.forEach((line) => {
    line.addEventListener('click', () => {
      const qText = line.getAttribute('data-question') || line.querySelector('.question-text')?.textContent.trim();
      goToEmailStep(qText);
    });

    line.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const qText = line.getAttribute('data-question') || line.querySelector('.question-text')?.textContent.trim();
        goToEmailStep(qText);
      }
    });
  });

  function goToEmailStep(qText) {
    questionStep.classList.add('hidden');
    emailStep.classList.remove('hidden');

    if (previewQuestionText) {
      previewQuestionText.textContent = qText;
    }

    if (nameInput) {
      nameInput.focus();
    } else if (emailInput) {
      emailInput.focus();
    }
  }

  // 4. Change question button -> Return to Question Step
  if (btnChangeQuestion) {
    btnChangeQuestion.addEventListener('click', () => {
      emailStep.classList.add('hidden');
      questionStep.classList.remove('hidden');
      if (customQuestionInput) {
        customQuestionInput.focus();
      }
    });
  }

  // 5. Submit email form -> Send to /api/submit asynchronously
  if (emailForm) {
    emailForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = emailForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<span>Submit Inquiry to Our Team &rarr;</span>';
      const errorAlert = document.getElementById('vesselErrorAlert');
      const errorMsg = document.getElementById('vesselErrorMsg');
      if (errorAlert) errorAlert.style.display = 'none';

      // Populate hidden question input
      const userQ = customQuestionInput ? customQuestionInput.value.trim() : '';
      const questionText = userQ || (previewQuestionText ? previewQuestionText.textContent.trim() : '');
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const websiteInput = document.getElementById('vesselWebsite');
      const website = websiteInput ? websiteInput.value : '';

      const hiddenQInput = document.getElementById('vesselQuestionInput');
      if (hiddenQInput) {
        hiddenQInput.value = questionText;
      }

      if (!name || !email || !questionText) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending to Our Team...</span>';
      }

      try {
        await submitInquiry({
          name: name,
          email: email,
          company: '',
          phone: '',
          practiceArea: 'Startup Inquiry Basin',
          message: questionText,
          website: website,
        });

        emailStep.classList.add('hidden');
        confirmation.classList.remove('hidden');
      } catch (err) {
        console.error('Inquiry Basin submission error:', err);
        if (errorAlert) {
          errorAlert.style.display = 'block';
          if (errorMsg && err.message) {
            errorMsg.textContent = `${err.message} Please try again or message our team on `;
          }
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }
}

/* ==========================================================================
   4. RESEND API INQUIRY SUBMISSION CLIENT
   Posts directly to Cloudflare Pages serverless endpoint /api/submit
   ========================================================================== */
async function submitInquiry(formData) {
  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      company: formData.company || '',
      phone: formData.phone || '',
      practiceArea: formData.practiceArea || '',
      message: formData.message,
      website: formData.website || '', // honeypot, must stay empty
    }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Server returned an unreadable response.');
  }

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong.');
  }
  return data;
}

/* ==========================================================================
   5. INTERACTIVE LEGAL INQUIRY BOT CONTROLLER
   ========================================================================== */
function initLegalBot() {
  const trigger = document.getElementById('legalBotTrigger');
  const botWindow = document.getElementById('legalBotWindow');
  const closeBtn = document.getElementById('botCloseBtn');
  const messagesBody = document.getElementById('botMessagesBody');
  const form = document.getElementById('botForm');
  const input = document.getElementById('botInput');
  const chips = document.querySelectorAll('.bot-chip');

  if (!trigger || !botWindow) return;

  function toggleBot(open) {
    const shouldOpen = open !== undefined ? open : !botWindow.classList.contains('bot-window-open');
    if (shouldOpen) {
      botWindow.classList.add('bot-window-open');
      trigger.setAttribute('aria-expanded', 'true');
      if (input) input.focus();
    } else {
      botWindow.classList.remove('bot-window-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBot();
  });
  if (closeBtn) closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBot(false);
  });

  // Chatbot is strictly individual and only opens via #legalBotTrigger
  window.openInquiry = function (topic) {
    if (topic) {
      window.location.href = `/contact.html?service=${encodeURIComponent(topic)}`;
    } else {
      window.location.href = '/contact.html';
    }
  };

  // Close bot on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && botWindow.classList.contains('bot-window-open')) {
      toggleBot(false);
    }
  });

  // Close bot when clicking outside
  document.addEventListener('click', (e) => {
    if (botWindow.classList.contains('bot-window-open')) {
      if (!botWindow.contains(e.target) && !trigger.contains(e.target)) {
        toggleBot(false);
      }
    }
  });

  // Audio context manager with gesture unlocking
  let botAudioCtx = null;

  function unlockAudio() {
    try {
      if (!botAudioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          botAudioCtx = new AudioContextClass();
        }
      }
      if (botAudioCtx && botAudioCtx.state === 'suspended') {
        botAudioCtx.resume();
      }
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  // Pre-unlock audio on user interaction
  trigger.addEventListener('pointerdown', unlockAudio, { passive: true });
  if (input) {
    input.addEventListener('focus', unlockAudio, { passive: true });
    input.addEventListener('keydown', unlockAudio, { passive: true });
  }

  // Quick Chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      unlockAudio();
      const query = chip.getAttribute('data-query') || chip.textContent.trim();
      handleBotQuery(query);
    });
  });

  // Form Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      unlockAudio();
      const val = input.value.trim();
      if (!val) return;
      handleBotQuery(val);
      input.value = '';
    });
  }

  // Web Audio API synthesized crystalline legal desk ting sound
  function playBotTingSound() {
    try {
      unlockAudio();
      if (!botAudioCtx) return;
      const ctx = botAudioCtx;
      const now = ctx.currentTime;

      // Dual-tone crystalline chime: 1320Hz fundamental + 1760Hz shimmer
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1320, now);
      osc1.frequency.exponentialRampToValueAtTime(1480, now + 0.12);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1760, now);
      osc2.frequency.exponentialRampToValueAtTime(1980, now + 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    } catch (err) {
      console.debug('Audio play blocked or unavailable', err);
    }
  }

  function showTypingIndicator() {
    if (!messagesBody) return null;
    const indicator = document.createElement('div');
    indicator.className = 'bot-msg-wrapper bot-msg-wrapper-bot bot-typing-wrapper';
    indicator.innerHTML = `
      <img src="/aash-avatar.png" alt="Aash" class="bot-bubble-avatar" width="28" height="28" />
      <div class="bot-typing-indicator"><span></span><span></span><span></span></div>
    `;
    messagesBody.appendChild(indicator);
    messagesBody.scrollTop = messagesBody.scrollHeight;
    return indicator;
  }

  function removeTypingIndicator(el) {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  function handleBotQuery(queryText) {
    appendMessage(escapeHtml(queryText), 'user');

    // Natural brief pause (~580ms) with typing indicator and crisp ting sound
    const typingEl = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingEl);
      const answer = generateLegalBotResponse(queryText);
      appendMessage(answer, 'bot');
      playBotTingSound();
    }, 580);
  }

  function getTimeString() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function appendMessage(text, sender) {
    if (!messagesBody) return;
    const timeStr = getTimeString();
    const wrapper = document.createElement('div');
    wrapper.className = `bot-msg-wrapper bot-msg-wrapper-${sender}`;

    if (sender === 'bot') {
      wrapper.innerHTML = `
        <img src="/aash-avatar.png" alt="Aash" class="bot-bubble-avatar" width="28" height="28" />
        <div class="bot-msg bot-msg-bot">
          <div>${text}</div>
          <span class="bot-timestamp">${timeStr}</span>
        </div>
      `;
    } else {
      wrapper.innerHTML = `
        <div class="bot-msg bot-msg-user">
          <div>${text}</div>
          <span class="bot-timestamp">${timeStr}</span>
        </div>
      `;
    }

    messagesBody.appendChild(wrapper);
    messagesBody.scrollTop = messagesBody.scrollHeight;
  }

  function generateLegalBotResponse(query) {
    const q = query.toLowerCase().trim();

    // 1. WhatsApp / Direct Messaging
    if (q.includes('whatsapp') || q.includes('chat directly') || q.includes('message me') || q.includes('message')) {
      return `<p>You can message me directly on WhatsApp.</p>
<a href="https://wa.me/917827963285?text=Hi%20Aash,%20messaging%20you%20directly." target="_blank" rel="noopener noreferrer" class="bot-action-btn">Open WhatsApp &rarr;</a>`;
    }

    // 2. Booking a Call
    if (q.includes('book') || q.includes('consult') || q.includes('call') || q.includes('appointment') || q.includes('schedule') || q.includes('slot')) {
      return `<p>Happy to talk it through. Pick a slot that works for you and I'll block it.</p>
<button type="button" class="bot-action-btn" onclick="window.openCalendlyModal()">Open Booking Calendar &rarr;</button>`;
    }

    // 3. Client Track Record
    if (q.includes('startup') || q.includes('helped') || q.includes('portfolio') || q.includes('case') || q.includes('track record') || q.includes('client work') || q.includes('achievement')) {
      return `<p>A few real ones, kept anonymous at the client's request: an FDA-cleared diagnostic device that raised $3M, India's first AC air purifier out of IIT, a waterless urinal technology backed by DST, a self-balancing scooter, and a platform that scaled to ₹100 crore. Happy to share more on a call.</p>
<a href="https://wa.me/917827963285?text=Hi%20Aash,%20I'd%20like%20to%20know%20more%20about%20your%20work%20with%20similar%20startups." target="_blank" rel="noopener noreferrer" class="bot-action-btn">Ask About a Similar Case &rarr;</a>`;
    }

    // 4. Specialties & Practices / Industries
    if (
      q.includes('specialt') ||
      q.includes('specializ') ||
      q.includes('practice') ||
      q.includes('practices') ||
      q.includes('industry') ||
      q.includes('industries') ||
      q.includes('sector') ||
      q.includes('ipr') ||
      q.includes('patent') ||
      q.includes('trademark') ||
      q.includes('valuation') ||
      q.includes('services') ||
      q.includes('privacy') ||
      q.includes('greentech') ||
      q.includes('agritech') ||
      q.includes('healthcare') ||
      q.includes('automobile')
    ) {
      return `<p>I work across technology, law, and investment - IP, technology and privacy law, fund advisory, and venture strategy. Most often in healthcare, material science, green tech, automobiles, and agritech.</p>
<button type="button" class="bot-action-btn" onclick="window.openCalendlyModal()">Talk Through Your Case &rarr;</button>`;
    }

    // 5. Founder Credentials
    if (q.includes('founder') || q.includes('counsel') || q.includes('aashish') || q.includes('gupta') || q.includes('patent bar') || q.includes('credential') || q.includes('berkeley')) {
      return `<p>B.Tech, LL.B., LL.M. from Berkeley Law. Cleared the USA Patent Bar Exam. I've been working across tech, law, and investment for close to two decades.</p>
<a href="https://wa.me/917827963285?text=Hi%20Aash,%20reaching%20out%20to%20message%20you%20directly." target="_blank" rel="noopener noreferrer" class="bot-action-btn">Message Me Direct &rarr;</a>`;
    }

    // 6. About the Practice
    if (q.includes('about') || q.includes('who are you') || q.includes('firm') || q.includes('team') || q.includes('background') || q.includes('degree')) {
      return `<p>StartupIndia.Law is my practice - technology, law, and finance under one roof instead of split across five advisors. Most of the team has an engineering background, so we actually understand what we're protecting.</p>
<a href="/contact.html" class="bot-action-btn">Get in Touch &rarr;</a>`;
    }

    // 7. Fallback (outside fixed topic set)
    return `<p>That's a bit outside what I can answer here directly - message me on WhatsApp and I'll get back to you personally.</p>
<div style="display: flex; gap: 8px; margin-top: 10px;">
  <a href="https://wa.me/917827963285?text=Hi%20Aash,%20messaging%20you%20from%20startupindia.law" target="_blank" rel="noopener noreferrer" class="bot-action-btn" style="margin: 0; flex: 1; text-align: center; text-decoration: none;">WhatsApp</a>
  <button type="button" class="bot-action-btn" onclick="window.openCalendlyModal()" style="margin: 0; flex: 1;">Book a Call</button>
</div>`;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

/* ==========================================================================
   6. CALENDLY CONSULTATION MODAL CONTROLLER
   ========================================================================== */
function initCalendlyModal() {
  const modal = document.getElementById('calendlyModal');
  const closeBtn = document.getElementById('calendlyCloseBtn');
  const frameContainer = document.getElementById('calendlyFrameContainer');
  const triggers = document.querySelectorAll(
    '#btnHeaderConsult, #btnMobileConsult, #btnHeroConsult, #btnProfileConsult, [data-open-calendly]'
  );

  if (!modal) return;

  let calendlyLoaded = false;

  window.openCalendlyModal = function () {
    modal.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    // Lazy-load: inject iframe src only the first time modal opens
    if (!calendlyLoaded && frameContainer) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://calendly.com/startupindia-info/30min?embed_domain=startupindia.law&embed_type=Inline';
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.frameBorder = '0';
      iframe.title = 'Select Date & Time - Calendly';
      frameContainer.appendChild(iframe);
      calendlyLoaded = true;
    }
  };

  function closeModal() {
    modal.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openCalendlyModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. UNIVERSAL CLICKABLE CARDS CONTROLLER
   Makes any card with data-href or role="link" navigate seamlessly on click
   ========================================================================== */
function initClickableCards() {
  const cards = document.querySelectorAll('[data-href]');

  cards.forEach(card => {
    card.setAttribute('role', 'link');
    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
    }

    card.addEventListener('click', (e) => {
      // Allow native clicks on explicit nested anchors or buttons
      const targetAnchor = e.target.closest('a');
      const targetButton = e.target.closest('button');

      if (targetAnchor && targetAnchor !== card) return;
      if (targetButton && targetButton !== card) return;

      const href = card.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const targetAnchor = e.target.closest('a');
        const targetButton = e.target.closest('button');
        if (targetAnchor && targetAnchor !== card) return;
        if (targetButton && targetButton !== card) return;

        const href = card.getAttribute('data-href');
        if (href) {
          e.preventDefault();
          window.location.href = href;
        }
      }
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM SERVICE PREFILL CONTROLLER
   Pre-selects specialty dropdown if navigated with ?service=... query param
   ========================================================================== */
function initContactFormPrefill() {
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get('service');
  const inquiryParam = params.get('inquiry');
  const practiceSelect = document.getElementById('contactPractice');
  const messageInput = document.getElementById('contactMessage');

  if (serviceParam && practiceSelect) {
    const cleanParam = decodeURIComponent(serviceParam).trim().toLowerCase();
    for (let i = 1; i < practiceSelect.options.length; i++) {
      const optVal = practiceSelect.options[i].value.trim().toLowerCase();
      const optText = practiceSelect.options[i].text.trim().toLowerCase();
      if (
        (optVal && (optVal === cleanParam || optVal.includes(cleanParam) || cleanParam.includes(optVal))) ||
        (optText && (optText === cleanParam || optText.includes(cleanParam) || cleanParam.includes(optText)))
      ) {
        practiceSelect.selectedIndex = i;
        practiceSelect.value = practiceSelect.options[i].value;
        break;
      }
    }
  }

  if (inquiryParam) {
    const cleanInquiry = decodeURIComponent(inquiryParam).trim().toLowerCase();
    if (practiceSelect) {
      if (cleanInquiry.includes('roadmap') || cleanInquiry.includes('sandbox')) {
        practiceSelect.value = 'Intellectual Property Rights (IPR)';
      } else {
        practiceSelect.value = 'General Techno-Legal Inquiry';
      }
    }
    if (messageInput && !messageInput.value) {
      if (cleanInquiry.includes('session') || cleanInquiry.includes('speaking')) {
        messageInput.value = 'Inquiry regarding a keynote session, workshop, or institutional masterclass on technology law and IP strategy.';
      } else if (cleanInquiry.includes('portfolio')) {
        messageInput.value = 'Confidential inquiry regarding client case studies, portfolio achievements, and venture advisory.';
      } else if (cleanInquiry.includes('roadmap') || cleanInquiry.includes('sandbox')) {
        messageInput.value = 'Discussing custom techno-legal roadmap and IP defensibility score calculated via the readiness sandbox.';
      }
    }
  }

  if (serviceParam || inquiryParam) {
    const formCard =
      document.querySelector('.contact-form-card') ||
      document.getElementById('directContactForm');
    if (formCard) {
      setTimeout(() => {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 250);
    }
  }
}

/* ==========================================================================
   8B. CONTACT FORM DIRECT SUBMISSION CONTROLLER
   Direct legal inquiries dispatched asynchronously to /api/submit
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('directContactForm');
  const formHeader = document.getElementById('contactFormHeader');
  const successCard = document.getElementById('contactSuccessState');
  const errorAlert = document.getElementById('contactErrorAlert');
  const errorMsg = document.getElementById('contactErrorMsg');
  const resetBtn = document.getElementById('btnResetContactForm');

  if (!form) return;

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      if (successCard) successCard.style.display = 'none';
      if (formHeader) formHeader.style.display = '';
      form.style.display = '';
      if (errorAlert) errorAlert.style.display = 'none';
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('btnSubmitContact') || form.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<span>Submit Confidential Inquiry</span>';
    if (errorAlert) errorAlert.style.display = 'none';

    const name = (document.getElementById('contactFullName')?.value || '').trim();
    const email = (document.getElementById('contactEmail')?.value || '').trim();
    const company = (document.getElementById('contactCompany')?.value || '').trim();
    const phone = (document.getElementById('contactPhone')?.value || '').trim();
    const practiceSelect = document.getElementById('contactPractice');
    const practiceArea = practiceSelect ? practiceSelect.value : '';
    const message = (document.getElementById('contactMessage')?.value || '').trim();
    const website = (document.getElementById('contactWebsite')?.value || '').trim();

    if (!name || !email || !message) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending Inquiry...</span>';
    }

    try {
      await submitInquiry({
        name,
        email,
        company,
        phone,
        practiceArea,
        message,
        website,
      });

      // Show quiet confidence success state and hide form + header
      form.style.display = 'none';
      if (formHeader) formHeader.style.display = 'none';
      if (successCard) {
        successCard.style.display = 'flex';
        successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      if (errorAlert) {
        errorAlert.style.display = 'block';
        if (errorMsg && err.message) {
          errorMsg.textContent = `${err.message} Please try again or message our team directly on `;
        }
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  });
}

/* ==========================================================================
   9. HERO BINARY 01 REVEAL CANVAS (HOVER ONLY)
   Ultra lightweight, zero idle CPU, reveals pure 01 code in soft light grey
   ========================================================================== */
function initHeroBinaryCanvas() {
  const hero = document.getElementById('hero');
  const canvas = document.getElementById('heroBinaryCanvas');
  if (!hero || !canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  const cellSize = 22; // Clean monospace matrix grid
  let cols = 0;
  let rows = 0;
  let grid = null;

  // Cursor tracking
  let mouseX = -9999;
  let mouseY = -9999;
  let isHovered = false;
  let animId = null;
  let currentAlpha = 0;
  const revealRadius = 160;

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    cols = Math.ceil(width / cellSize) + 1;
    rows = Math.ceil(height / cellSize) + 1;

    grid = new Uint8Array(cols * rows);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = Math.random() > 0.5 ? 1 : 0;
    }

    if (!isHovered && currentAlpha <= 0.001) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      draw();
    }
  }

  const ambientGlow = document.getElementById('heroAmbientGlow');

  function onPointerMove(e) {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isHovered = true;
    if (ambientGlow && width > 0 && height > 0) {
      const nx = ((mouseX / width) - 0.5) * 28;
      const ny = ((mouseY / height) - 0.5) * 18;
      ambientGlow.style.transform = `translate3d(${nx.toFixed(1)}px, ${ny.toFixed(1)}px, 0)`;
    }
    startLoop();
  }

  function onPointerEnter(e) {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isHovered = true;
    startLoop();
  }

  function onPointerLeave() {
    isHovered = false;
    if (ambientGlow) {
      ambientGlow.style.transform = 'translate3d(0, 0, 0)';
    }
  }

  function startLoop() {
    if (!animId) {
      animId = requestAnimationFrame(render);
    }
  }

  let frameCount = 0;
  function render() {
    frameCount++;
    // Subtle bit flip so memory feels alive
    if (frameCount % 5 === 0 && grid && grid.length > 0) {
      const idx = Math.floor(Math.random() * grid.length);
      grid[idx] = grid[idx] ? 0 : 1;
    }

    // Smooth fade interpolation
    const targetAlpha = isHovered ? 1 : 0;
    currentAlpha += (targetAlpha - currentAlpha) * 0.14;

    draw();

    // Sleep when faded out to preserve 100% CPU
    if (!isHovered && currentAlpha < 0.005) {
      currentAlpha = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animId = null;
      return;
    }

    animId = requestAnimationFrame(render);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentAlpha <= 0.001 || !grid) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    ctx.font = '500 12px "SF Mono", "Fira Code", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const r2 = revealRadius * revealRadius;

    // Process only cells within the cursor bounding box
    const minCol = Math.max(0, Math.floor((mouseX - revealRadius) / cellSize));
    const maxCol = Math.min(cols - 1, Math.ceil((mouseX + revealRadius) / cellSize));
    const minRow = Math.max(0, Math.floor((mouseY - revealRadius) / cellSize));
    const maxRow = Math.min(rows - 1, Math.ceil((mouseY + revealRadius) / cellSize));

    for (let r = minRow; r <= maxRow; r++) {
      const cy = r * cellSize + cellSize / 2;
      const dy = cy - mouseY;
      const dy2 = dy * dy;

      for (let c = minCol; c <= maxCol; c++) {
        const cx = c * cellSize + cellSize / 2;
        const dx = cx - mouseX;
        const distSq = dx * dx + dy2;

        if (distSq < r2) {
          const dist = Math.sqrt(distSq);
          const factor = 1 - dist / revealRadius;
          // Ultra-subtle ink-grey digits on #FBFAF8 warm base
          const alpha = factor * factor * 0.16 * currentAlpha;

          if (alpha > 0.008) {
            const char = grid[r * cols + c] ? '1' : '0';
            ctx.fillStyle = `rgba(17, 24, 39, ${alpha.toFixed(3)})`;
            ctx.fillText(char, cx, cy);
          }
        }
      }
    }

    ctx.restore();
  }

  window.addEventListener('resize', resize, { passive: true });
  hero.addEventListener('pointermove', onPointerMove, { passive: true });
  hero.addEventListener('pointerenter', onPointerEnter, { passive: true });
  hero.addEventListener('pointerleave', onPointerLeave, { passive: true });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          isHovered = false;
          currentAlpha = 0;
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
    },
    { threshold: 0 }
  );
  observer.observe(hero);

  resize();
}

/* ==========================================================================
   10. MAGNETIC BUTTON CONTROLLER
   Delicate cursor pull for primary CTAs within a small radius
   ========================================================================== */
function initMagneticButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const magneticBtns = document.querySelectorAll(
    '#btnHeroConsult, #btnHeaderConsult, #btnMobileConsult, .btn-magnetic'
  );

  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ==========================================================================
   11. SCROLL REVEAL OBSERVER
   Fades up content 12-16px on entry, staggered ~60ms per item
   ========================================================================== */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
    observer.observe(el);
  });
}


/* ==========================================================================
   13. FLUID MAGNETIC CUSTOM CURSOR
   Dual-stage cursor with smooth lerp physics and interactive element snapping
   ========================================================================== */
function initInteractiveCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let dot = document.getElementById('cursorDot');
  let ring = document.getElementById('cursorRing');

  if (!dot) {
    dot = document.createElement('div');
    dot.id = 'cursorDot';
    dot.className = 'custom-cursor-dot custom-cursor-hidden';
    document.body.appendChild(dot);
  }

  if (!ring) {
    ring = document.createElement('div');
    ring.id = 'cursorRing';
    ring.className = 'custom-cursor-ring custom-cursor-hidden';
    document.body.appendChild(ring);
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isMoving = false;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      ringX = mouseX;
      ringY = mouseY;
      dot.classList.remove('custom-cursor-hidden');
      ring.classList.remove('custom-cursor-hidden');
    }

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(renderCursor);
    }
  }, { passive: true });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    if (Math.abs(mouseX - ringX) > 0.05 || Math.abs(mouseY - ringY) > 0.05) {
      requestAnimationFrame(renderCursor);
    } else {
      isMoving = false;
    }
  }

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.classList.add('custom-cursor-hidden');
    ring.classList.add('custom-cursor-hidden');
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    dot.classList.remove('custom-cursor-hidden');
    ring.classList.remove('custom-cursor-hidden');
  });

  const interactiveSelectors = 'a, button, input, select, textarea, [role="button"], [data-href], .llm-pill-btn, .testimonial-line-item, .moat-card, .case-card, .service-card-deep, .credential-badge-item, .session-flat-item, .btn-pill-primary, .btn-pill-secondary, .direct-channels-card, .inquiry-preset-btn, .bot-chip';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(interactiveSelectors);
    if (target) {
      ring.classList.add('is-hovering');
      dot.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(interactiveSelectors);
    if (target) {
      ring.classList.remove('is-hovering');
      dot.classList.remove('is-hovering');
    }
  });

  window.addEventListener('mousedown', () => {
    ring.classList.add('is-down');
    dot.classList.add('is-down');
  });

  window.addEventListener('mouseup', () => {
    ring.classList.remove('is-down');
    dot.classList.remove('is-down');
  });
}


