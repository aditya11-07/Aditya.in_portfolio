/**
 * Aditya Pandey Portfolio - Core Interactive Engine
 * Tech Arcanist Engineering Theme System
 * Seamlessly manages data rendering, interactive filters, modals, and canvas engine.
 */

import { portfolioData } from './data/portfolioData.js';
import { initContentEditor, getActivePortfolioData } from './ui/ContentEditor.js';
import { initTechArcanistEngine } from './scripts/techarcanist-engine.js';
import { initFloatingGallery } from './scripts/floating-gallery.js';

// Convert markdown bold **text** to <strong>text</strong>
function parseMarkdownText(str) {
  if (!str) return '';
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Render all content and photos into index.html.
 * By default (isLiveUpdate = false), it PRESERVES any images, photos, and project cards
 * directly written in index.html so the user has 100% full, unrestricted access to edit them.
 */
function renderPortfolio(data, isLiveUpdate = false) {
  if (!data || !data.personal) return;

  const { personal, timeline, experience, projects, achievements, contact } = data;

  // 1. NAVBAR
  const navName = document.querySelector('.brand-t');
  if (navName && isLiveUpdate && personal.name) {
    navName.textContent = personal.name;
  }

  const navAvatarImg = document.querySelector('.nav-avatar-img');
  if (navAvatarImg) {
    if (isLiveUpdate && personal.navAvatar) {
      navAvatarImg.src = personal.navAvatar;
    }
    if (personal.name) navAvatarImg.alt = personal.name;
  }

  // 2. HERO SECTION
  if (isLiveUpdate) {
    const heroBadge = document.querySelector('.sig-badge-pill span:last-child');
    if (heroBadge && personal.statusBadge) heroBadge.textContent = personal.statusBadge;

    const sigName = document.querySelector('.sig-name');
    if (sigName && personal.name) {
      const parts = personal.name.split(' ');
      if (parts.length > 1) {
        sigName.innerHTML = `<span>${parts[0]}</span> <span>${parts.slice(1).join(' ')}</span>`;
      } else {
        sigName.innerHTML = `<span>${personal.name}</span>`;
      }
    }

    const heroSubheading = document.querySelector('.sig-sub');
    if (heroSubheading && personal.heroSubheading) {
      heroSubheading.innerHTML = parseMarkdownText(personal.heroSubheading);
    }
  }

  const heroImage = document.querySelector('.hero-photo-media img');
  if (heroImage) {
    if (isLiveUpdate && personal.heroPhoto) {
      heroImage.src = personal.heroPhoto;
    }
    if (personal.name) heroImage.alt = personal.name;
  }

  // 3. ABOUT SECTION
  const aboutImage = document.querySelector('.about-photo img');
  if (aboutImage) {
    if (isLiveUpdate && personal.aboutPhoto) {
      aboutImage.src = personal.aboutPhoto;
    }
    if (personal.name) aboutImage.alt = personal.name;
  }

  if (isLiveUpdate) {
    const aboutCardName = document.querySelector('.about-card-name');
    if (aboutCardName && personal.name) aboutCardName.textContent = personal.name;

    const aboutCardSub = document.querySelector('.about-card-sub');
    if (aboutCardSub && personal.roleTitle) aboutCardSub.textContent = personal.roleTitle;

    const aboutProse = document.querySelector('.about-prose');
    if (aboutProse && personal.bioParagraphs) {
      aboutProse.innerHTML = personal.bioParagraphs
        .map(p => `<p>${parseMarkdownText(p)}</p>`)
        .join('');
    }
  }

  // 4. TIMELINE SECTION
  renderTimeline(timeline);

  // 5. EXPERIENCE SECTION
  renderExperience(experience, isLiveUpdate);

  // 6. PROJECTS SECTION
  renderProjects(projects, isLiveUpdate);

  // 7. ACHIEVEMENTS SECTION
  renderAchievements(achievements, isLiveUpdate);

  // 8. CONTACT SECTION
  if (isLiveUpdate) {
    renderContact(contact || personal.socials);
  }
}

/**
 * Render Interactive Timeline with Category Filtering
 */
function renderTimeline(timelineItems) {
  const timelineTrack = document.getElementById('timelineTrack');
  if (!timelineTrack) return;

  if (!timelineItems || timelineItems.length === 0) {
    timelineTrack.innerHTML = '<p style="text-align:center; color: var(--muted); padding: 32px;">No milestones configured.</p>';
    return;
  }

  // Calculate counts for filter pills
  const counts = {
    all: timelineItems.length,
    rocketry: timelineItems.filter(i => i.category === 'rocketry').length,
    software: timelineItems.filter(i => i.category === 'software').length,
    education: timelineItems.filter(i => i.category === 'education').length
  };

  const cAll = document.getElementById('count-all');
  if (cAll) cAll.textContent = counts.all;
  const cRocket = document.getElementById('count-rocketry');
  if (cRocket) cRocket.textContent = counts.rocketry;
  const cSoft = document.getElementById('count-software');
  if (cSoft) cSoft.textContent = counts.software;
  const cEdu = document.getElementById('count-education');
  if (cEdu) cEdu.textContent = counts.education;

  // Build timeline HTML (Tech Arcanist Chronology format)
  timelineTrack.innerHTML = timelineItems
    .map((item, index) => {
      const idxStr = (index + 1).toString().padStart(2, '0');
      const tagsHtml = (item.tags || [])
        .map(tag => `<span>${tag}</span>`)
        .join('');

      return `
        <li class="chron-i" data-category="${item.category || 'all'}">
          <div class="chron-l">
            <span class="mono-idx mono">${idxStr}</span>
            <span class="chron-tag mono">${item.badge || item.phase || 'Milestone'}</span>
            <span class="chron-year">${item.year || ''}</span>
          </div>
          <div class="chron-r">
            <h3>${item.title}</h3>
            ${item.organization ? `<div class="chron-org">${item.organization}</div>` : ''}
            <p class="chron-desc">${item.description}</p>
            ${tagsHtml ? `<div class="tags">${tagsHtml}</div>` : ''}
          </div>
        </li>
      `;
    })
    .join('');

  setupTimelineFilterListeners();
}

/**
 * Filter Timeline items smoothly by category
 */
let filtersAttached = false;
function setupTimelineFilterListeners() {
  if (filtersAttached) return;
  const filterButtons = document.querySelectorAll('.timeline-filter-btn');
  if (!filterButtons || filterButtons.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.dataset.filter;
      const timelineItems = document.querySelectorAll('.chron-i');

      timelineItems.forEach(item => {
        const itemCat = item.dataset.category;
        if (filterCategory === 'all' || itemCat === filterCategory) {
          item.style.display = 'grid';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  filtersAttached = true;
}

/**
 * Render Experience Cards
 */
function renderExperience(experienceList, isLiveUpdate = false) {
  const grid = document.querySelector('.caps');
  if (!grid || !experienceList) return;
  if (grid.children.length > 0 && !isLiveUpdate) return;

  grid.innerHTML = experienceList.map(exp => `
    <div class="cap">
      ${exp.badge ? `<div class="cap-badge">${exp.badge}</div>` : ''}
      <h3>${exp.role}</h3>
      <div class="cap-company">${exp.company}</div>
      <p>${exp.description}</p>
    </div>
  `).join('');
}

/**
 * Render Projects Cards (Tech Arcanist project card layout with corner brackets)
 */
function renderProjects(projectsList, isLiveUpdate = false) {
  const grid = document.querySelector('.projects-grid');
  if (!grid || !projectsList) return;

  grid.innerHTML = projectsList.map(proj => {
    const tagsHtml = (proj.tags || [])
      .map(tag => `<span>${tag}</span>`)
      .join('');

    const githubBtn = proj.githubUrl ? `
      <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">
        GitHub Repo ↗
      </a>
    ` : '';

    const isCircuit = proj.id === 'water-level-indicator';

    const secondaryBtn = proj.schematicUrl ? `
      <a href="${proj.schematicUrl}" data-schematic="${proj.schematicUrl}" class="btn-card-secondary btn-view-schematic">
        ${isCircuit ? 'View Circuit ↗' : 'View Schematic ↗'}
      </a>
    ` : proj.liveUrl ? `
      <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary">
        Live Demo ↗
      </a>
    ` : '';

    return `
      <div class="pcard">
        <div class="corner tl"></div>
        <div class="corner br"></div>
        <div class="pcard-media" style="${isCircuit ? 'background: #ffffff;' : ''}">
          <img src="${proj.image}" alt="${proj.title}" loading="lazy" style="object-position: ${proj.imagePosition || 'center center'}; ${isCircuit ? 'object-fit: contain; padding: 6px;' : ''}" />
          ${proj.categoryBadge ? `<span class="pcard-kind">${proj.categoryBadge}</span>` : ''}
        </div>
        <div class="pcard-body">
          <div class="pcard-cats">${proj.categoryBadge || 'Hardware & Firmware'}</div>
          <h3>${proj.title}</h3>
          <p class="pcard-sum">${proj.description}</p>
          ${tagsHtml ? `<div class="tags">${tagsHtml}</div>` : ''}
          <div class="pcard-actions">
            ${githubBtn}
            ${secondaryBtn}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render Achievements Cards
 */
function renderAchievements(achievementsList, isLiveUpdate = false) {
  const grid = document.querySelector('.awards');
  if (!grid || !achievementsList) return;
  if (grid.children.length > 0 && !isLiveUpdate) return;

  grid.innerHTML = achievementsList.map((ach, idx) => {
    const num = (idx + 1).toString().padStart(2, '0');
    return `
      <div class="award">
        <span class="award-n mono">${num}</span>
        <strong>${ach.title}</strong>
        <span class="desc">${ach.description}</span>
      </div>
    `;
  }).join('');
}

/**
 * Render Contact Details
 */
function renderContact(contactData) {
  if (!contactData) return;

  const mailLink = document.querySelector('a.ftr-mail');
  if (mailLink && contactData.email) {
    mailLink.href = `mailto:${contactData.email}`;
    mailLink.innerHTML = `${contactData.email} <span aria-hidden="true">↗</span>`;
  }
}

// ── BOOTSTRAP APP ON DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Tech Arcanist Particle Engine, Clock, Command Palette & Bootloader
  initTechArcanistEngine();

  // 2. Initial Load of Data and Render
  const activeData = getActivePortfolioData();
  renderPortfolio(activeData, false);

  // 3. Initialize Visual Customizer
  initContentEditor((updatedData) => {
    renderPortfolio(updatedData, true);
  });

  // 4. Scroll Progress Bar
  const prog = document.getElementById('prog');
  window.addEventListener('scroll', () => {
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    if (totalScroll > 0 && prog) {
      prog.style.width = (window.scrollY / totalScroll * 100) + '%';
    }
  });

  // 5. Mobile Navigation Drawer
  const navToggle = document.getElementById('nav-tg');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav a');

  function openMenu() {
    if (nav) nav.classList.add('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (nav) nav.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      nav && nav.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // 6. Contact Form Dispatcher (Connected to Java Backend with Graceful Mailto Fallback)
  const contactForm = document.getElementById('contactForm');
  const statusBanner = document.getElementById('contactStatusBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim() || 'Colleague';
      const email = document.getElementById('email')?.value.trim() || '';
      const subject = document.getElementById('subject')?.value.trim() || 'Engineering Opportunity';
      const message = document.getElementById('message')?.value.trim() || '';
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!statusBanner) return;

      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message →';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending to Backend...';
      }

      // Try Java REST Backend first (http://localhost:8080 or relative /api/contact)
      try {
        const backendUrl = window.location.port === '3000' || window.location.port === '5173'
          ? '/api/contact'
          : 'http://localhost:8085/api/contact';

        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });

        if (response.ok) {
          const resData = await response.json();
          statusBanner.className = 'contact-status-banner success';
          statusBanner.style.display = 'block';
          statusBanner.innerHTML = `
            <strong>✓ Message Received by Java Backend!</strong> Thank you, ${name}. Your inquiry has been securely logged to the database. Aditya will get back to you shortly.
          `;
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '✓ Message Sent!';
            setTimeout(() => { submitBtn.innerHTML = originalBtnText; }, 3000);
          }
          return;
        }
      } catch (err) {
        // Backend offline or running in standalone static environment (e.g. GitHub Pages)
        console.log('Java backend offline, falling back to mail client dispatcher:', err);
      }

      // Fallback: Launch mail client dispatcher if Java backend is offline
      statusBanner.className = 'contact-status-banner success';
      statusBanner.style.display = 'block';
      statusBanner.innerHTML = `
        <strong>✓ Message prepared!</strong> Opening your email client to reach Aditya Pandey directly (<a href="mailto:adityavaibhavpandey@gmail.com" style="color: inherit; text-decoration: underline;">adityavaibhavpandey@gmail.com</a>).
      `;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      const mailtoUrl = `mailto:adityavaibhavpandey@gmail.com?subject=${encodeURIComponent(`[${subject}] from ${name}`)}&body=${encodeURIComponent(`${message}\n\n---\nSent by: ${name} (${email})`)}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 300);
    });
  }

  // 7. Resume / CV Modal Controller
  const resumeModalOverlay = document.getElementById('resumeModalOverlay');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const navResumeBtn = document.getElementById('navResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');

  function openResumeModal() {
    if (resumeModalOverlay) {
      resumeModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModalOverlay) {
      resumeModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  [navResumeBtn, heroResumeBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', openResumeModal);
  });

  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResumeModal);
  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) closeResumeModal();
    });
  }

  // 8. Schematic Lightbox Modal Controller
  const schematicModalOverlay = document.getElementById('schematicModalOverlay');
  const schematicModalClose = document.getElementById('schematicModalClose');

  function openSchematicModal(imgSrc, title) {
    if (schematicModalOverlay) {
      if (imgSrc) {
        const modalImg = schematicModalOverlay.querySelector('.portfolio-modal-body img');
        if (modalImg) modalImg.src = imgSrc;
        const downloadBtn = schematicModalOverlay.querySelector('.portfolio-modal-footer a');
        if (downloadBtn) {
          downloadBtn.href = imgSrc;
          downloadBtn.download = imgSrc.split('/').pop();
        }
      }
      if (title) {
        const modalTitle = schematicModalOverlay.querySelector('.portfolio-modal-title');
        if (modalTitle) modalTitle.textContent = `${title} — Schematic & Media`;
      }
      schematicModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSchematicModal() {
    if (schematicModalOverlay) {
      schematicModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('click', (e) => {
    const target = e.target.closest('.btn-view-schematic');
    if (target) {
      e.preventDefault();
      const schematicUrl = target.getAttribute('data-schematic') || target.getAttribute('href');
      const projectCard = target.closest('.pcard');
      const projectTitle = projectCard?.querySelector('h3')?.textContent || 'Project';
      openSchematicModal(schematicUrl, projectTitle);
    }
  });

  if (schematicModalClose) schematicModalClose.addEventListener('click', closeSchematicModal);
  if (schematicModalOverlay) {
    schematicModalOverlay.addEventListener('click', (e) => {
      if (e.target === schematicModalOverlay) closeSchematicModal();
    });
  }

  // Gallery Modal Close Listeners
  const galleryModalOverlay = document.getElementById('galleryModalOverlay');
  const galleryModalClose = document.getElementById('galleryModalClose');
  if (galleryModalClose) {
    galleryModalClose.addEventListener('click', () => {
      if (galleryModalOverlay) galleryModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if (galleryModalOverlay) {
    galleryModalOverlay.addEventListener('click', (e) => {
      if (e.target === galleryModalOverlay) {
        galleryModalOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Initialize Dynamic Visual Showcase (Certificates & Photos)
  initFloatingGallery();
});
