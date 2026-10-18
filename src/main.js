/**
 * Aditya Pandey Portfolio - Core Interactive Engine
 * In accordance with priyanshuojha.in aesthetics and functionality.
 * Dynamically renders photos, personal bio, timeline, projects, and skills
 * from portfolioData.js, and integrates with the visual Content Customizer.
 */

import { portfolioData } from './data/portfolioData.js';
import { initContentEditor, getActivePortfolioData } from './ui/ContentEditor.js';

// SVG Icon Helpers
function getTimelineIconSvg(iconType) {
  switch (iconType) {
    case 'rocket':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>`;
    case 'award':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;
    case 'code':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
    case 'cpu':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`;
    case 'graduation':
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`;
    case 'sparkles':
    default:
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
  }
}

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
  const navName = document.querySelector('.nav-name');
  if (navName && isLiveUpdate && personal.name) {
    navName.textContent = personal.name;
  }

  // 📸 Nav Avatar: Only change if it's a live customizer update or if img has no src yet
  const navAvatarImg = document.querySelector('.nav-avatar img');
  if (navAvatarImg) {
    if (isLiveUpdate && personal.navAvatar) {
      navAvatarImg.src = personal.navAvatar;
    }
    if (personal.name) navAvatarImg.alt = personal.name;
  }

  // 2. HERO SECTION
  if (isLiveUpdate) {
    const heroBadge = document.querySelector('.hero-pill-badge span:last-child');
    if (heroBadge && personal.statusBadge) heroBadge.textContent = personal.statusBadge;

    const heroHeading = document.querySelector('.hero-heading');
    if (heroHeading && personal.heroHeading) heroHeading.innerHTML = personal.heroHeading;

    const heroSubheading = document.querySelector('.hero-subheading');
    if (heroSubheading && personal.heroSubheading) heroSubheading.innerHTML = parseMarkdownText(personal.heroSubheading);
  }

  // 📸 Hero Main Photo: Only change if it's a live customizer update
  const heroImage = document.querySelector('.hero-image-frame img');
  if (heroImage) {
    if (isLiveUpdate && personal.heroPhoto) {
      heroImage.src = personal.heroPhoto;
    }
    if (personal.name) heroImage.alt = personal.name;
  }

  // 3. ABOUT SECTION
  // 📸 About Photo: Only change if it's a live customizer update
  const aboutImage = document.querySelector('.about-avatar-photo img');
  if (aboutImage) {
    if (isLiveUpdate && personal.aboutPhoto) {
      aboutImage.src = personal.aboutPhoto;
    }
    if (personal.name) aboutImage.alt = personal.name;
  }

  if (isLiveUpdate) {
    const aboutTitle = document.querySelector('.about-title');
    if (aboutTitle && personal.aboutTitle) {
      aboutTitle.innerHTML = personal.aboutTitle || `Hello, I'm <span>${personal.name}</span>`;
    }

    const aboutRole = document.querySelector('.about-role');
    if (aboutRole && personal.roleTitle) aboutRole.textContent = personal.roleTitle;

    const aboutText = document.querySelector('.about-text');
    if (aboutText && personal.bioParagraphs) {
      aboutText.innerHTML = personal.bioParagraphs
        .map(p => `<p>${parseMarkdownText(p)}</p>`)
        .join('');
    }

    // Social Links
    const linkedinBtn = document.querySelector('.social-icon-btn.linkedin');
    if (linkedinBtn && personal.socials?.linkedin) {
      linkedinBtn.href = personal.socials.linkedin;
    }
    const githubBtn = document.querySelector('.social-icon-btn.github');
    if (githubBtn && personal.socials?.github) {
      githubBtn.href = personal.socials.github;
    }
    const emailBtn = document.querySelector('.social-icon-btn.email');
    if (emailBtn && personal.socials?.email) {
      emailBtn.href = `mailto:${personal.socials.email}?subject=Connecting%20with%20${encodeURIComponent(personal.name)}`;
    }
  }

  // 4. TIMELINE SECTION (rendered with interactive filters)
  renderTimeline(timeline);

  // 5. EXPERIENCE SECTION (preserved if already written in HTML)
  renderExperience(experience, isLiveUpdate);

  // 6. PROJECTS SECTION (preserved if already written in HTML)
  renderProjects(projects, isLiveUpdate);

  // 7. ACHIEVEMENTS SECTION (preserved if already written in HTML)
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
    timelineTrack.innerHTML = '<p style="text-align:center; color: var(--gray-muted);">No timeline items configured.</p>';
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

  // Build timeline HTML
  timelineTrack.innerHTML = timelineItems
    .map((item, index) => {
      const isLeft = index % 2 === 0;
      const sideClass = isLeft ? 'left' : 'right';
      const iconSvg = getTimelineIconSvg(item.icon);

      const tagsHtml = (item.tags || [])
        .map(tag => `<span class="timeline-tag">${tag}</span>`)
        .join('');

      return `
        <div class="timeline-item ${sideClass}" data-category="${item.category || 'all'}">
          <div class="timeline-node" title="${item.phase || ''}">
            ${iconSvg}
          </div>
          <div class="timeline-card">
            <div class="timeline-meta-row">
              <span class="timeline-phase-pill">${item.phase || ''}</span>
              <span class="timeline-year-pill">${item.year || ''}</span>
              ${item.badge ? `<span class="timeline-badge-pill">${item.badge}</span>` : ''}
            </div>
            <h3 class="timeline-title">${item.title}</h3>
            ${item.organization ? `<h4 class="timeline-org">${item.organization}</h4>` : ''}
            <p class="timeline-desc">${item.description}</p>
            ${tagsHtml ? `<div class="timeline-tags">${tagsHtml}</div>` : ''}
          </div>
        </div>
      `;
    })
    .join('');

  // Setup Filter Button Click Listeners (if not already attached)
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
      const timelineItems = document.querySelectorAll('.timeline-item');

      timelineItems.forEach(item => {
        const itemCat = item.dataset.category;
        if (filterCategory === 'all' || itemCat === filterCategory) {
          item.classList.remove('is-hidden');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        } else {
          item.classList.add('is-hidden');
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
  const grid = document.querySelector('.experience-grid');
  if (!grid || !experienceList) return;
  if (grid.children.length > 0 && !isLiveUpdate) return;

  grid.innerHTML = experienceList.map(exp => `
    <div class="exp-card">
      ${exp.badge ? `<span class="exp-badge">${exp.badge}</span>` : ''}
      <h3 class="exp-title">${exp.role}</h3>
      <h4 class="exp-company">${exp.company}</h4>
      <p class="exp-desc">${exp.description}</p>
    </div>
  `).join('');
}

/**
 * Render Projects Cards
 */
function renderProjects(projectsList, isLiveUpdate = false) {
  const grid = document.querySelector('.projects-grid');
  if (!grid || !projectsList) return;

  grid.innerHTML = projectsList.map(proj => {
    const tagsHtml = (proj.tags || [])
      .map(tag => `<span class="project-tech-tag">${tag}</span>`)
      .join('');

    const githubBtn = proj.githubUrl ? `
      <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">
        GitHub Repo ↗
      </a>
    ` : '';

    const secondaryBtn = proj.schematicUrl ? `
      <a href="${proj.schematicUrl}" data-schematic="${proj.schematicUrl}" class="btn-card-secondary btn-view-schematic">
        View Schematic ↗
      </a>
    ` : proj.liveUrl ? `
      <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary">
        Live Demo ↗
      </a>
    ` : '';

    return `
      <div class="project-card">
        <div class="project-thumb">
          <img src="${proj.image}" alt="${proj.title}" loading="lazy" style="object-position: ${proj.imagePosition || 'center center'};" />
          ${proj.categoryBadge ? `<span class="project-category-badge">${proj.categoryBadge}</span>` : ''}
        </div>
        <div class="project-body">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          ${tagsHtml ? `<div class="project-tech-tags">${tagsHtml}</div>` : ''}
          <div class="project-actions">
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
  const grid = document.querySelector('.achievements-grid');
  if (!grid || !achievementsList) return;
  if (grid.children.length > 0 && !isLiveUpdate) return;

  grid.innerHTML = achievementsList.map(ach => {
    return `
      <div class="achievement-card">
        <div class="achievement-icon">
          ${getTimelineIconSvg(ach.icon || 'award')}
        </div>
        <div>
          <h3 class="achievement-title">${ach.title}</h3>
          <p class="achievement-desc">${ach.description}</p>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render Contact Details
 */
function renderContact(contactData) {
  if (!contactData) return;

  const emailCards = document.querySelectorAll('a[href^="mailto:"]');
  if (contactData.email) {
    emailCards.forEach(card => {
      card.href = `mailto:${contactData.email}`;
      const valEl = card.querySelector('.contact-value');
      if (valEl) valEl.textContent = contactData.email;
    });
  }

  const linkedinCard = document.querySelector('.contact-info-panel a[href*="linkedin"]');
  if (linkedinCard && contactData.linkedin) {
    linkedinCard.href = contactData.linkedin;
    const valEl = linkedinCard.querySelector('.contact-value');
    if (valEl) valEl.textContent = contactData.linkedinDisplay || contactData.linkedin.replace('https://', '');
  }

  const githubCard = document.querySelector('.contact-info-panel a[href*="github"]');
  if (githubCard && contactData.github) {
    githubCard.href = contactData.github;
    const valEl = githubCard.querySelector('.contact-value');
    if (valEl) valEl.textContent = contactData.githubDisplay || contactData.github.replace('https://', '');
  }
}

// ── BOOTSTRAP APP ON DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Load of Data and Render (preserves index.html HTML & photos)
  const activeData = getActivePortfolioData();
  renderPortfolio(activeData, false);

  // 2. Initialize Visual Customizer (passes isLiveUpdate = true on changes)
  initContentEditor((updatedData) => {
    renderPortfolio(updatedData, true);
  });

  // 3. Scroll Progress Bar & Sticky Navbar
  const prog = document.getElementById('prog');
  const nav  = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    const totalScroll = document.body.scrollHeight - window.innerHeight;
    if (totalScroll > 0 && prog) {
      prog.style.width = (window.scrollY / totalScroll * 100) + '%';
    }
    if (nav) {
      nav.classList.toggle('solid', window.scrollY > 30);
    }
  });

  // 4. Mobile Navigation Drawer
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  function openMenu() {
    if (mobileNav) mobileNav.classList.add('open');
    if (navToggle) navToggle.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (navToggle) navToggle.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) closeMenu();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // 5. Horizontal Skills Track Drag & Scroll
  const track = document.querySelector('.skills-carousel-track');
  if (track) {
    let isDown = false;
    let startX, scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.6;
      track.scrollLeft = scrollLeft - walk;
    });
  }

  // 6. Professional Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  const statusBanner = document.getElementById('contactStatusBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim() || 'Colleague';
      const email = document.getElementById('email')?.value.trim() || '';
      const subject = document.getElementById('subject')?.value.trim() || 'Engineering Opportunity';
      const message = document.getElementById('message')?.value.trim() || '';

      if (!statusBanner) return;

      statusBanner.className = 'contact-status-banner loading';
      statusBanner.innerHTML = `<span>⏳ Preparing direct message from ${name}...</span>`;

      setTimeout(() => {
        const mailtoUrl = `mailto:adityavaibhavpandey@gmail.com?subject=${encodeURIComponent(`[${subject}] from ${name}`)}&body=${encodeURIComponent(`${message}\n\n---\nSent by: ${name} (${email})`)}`;

        statusBanner.className = 'contact-status-banner success';
        statusBanner.innerHTML = `
          <strong>✓ Message prepared!</strong> Opening your default mail client to connect directly with Aditya Pandey (<a href="mailto:adityavaibhavpandey@gmail.com" style="color: inherit; font-weight: 700;">adityavaibhavpandey@gmail.com</a>).<br />
          <span style="font-size: 0.8rem; opacity: 0.88;">If your mail app didn't pop up automatically, you can send an email directly to <strong>adityavaibhavpandey@gmail.com</strong>.</span>
        `;

        window.location.href = mailtoUrl;
      }, 400);
    });
  }

  // 7. Copy Email Quick Button
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      navigator.clipboard.writeText('adityavaibhavpandey@gmail.com').then(() => {
        const originalText = btnCopyEmail.innerHTML;
        btnCopyEmail.innerHTML = '✓ Copied!';
        btnCopyEmail.style.background = '#10b981';
        btnCopyEmail.style.color = '#fff';
        btnCopyEmail.style.borderColor = '#10b981';
        setTimeout(() => {
          btnCopyEmail.innerHTML = originalText;
          btnCopyEmail.style.background = '';
          btnCopyEmail.style.color = '';
          btnCopyEmail.style.borderColor = '';
        }, 2200);
      });
    });
  }

  // 8. Resume / CV Modal Controller
  const resumeModalOverlay = document.getElementById('resumeModalOverlay');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const navResumeBtn = document.getElementById('navResumeBtn');
  const mobileResumeBtn = document.getElementById('mobileResumeBtn');
  const heroResumeBtn = document.getElementById('heroResumeBtn');

  function openResumeModal() {
    if (resumeModalOverlay) {
      resumeModalOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModalOverlay) {
      resumeModalOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  [navResumeBtn, mobileResumeBtn, heroResumeBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', openResumeModal);
  });

  if (resumeModalClose) resumeModalClose.addEventListener('click', closeResumeModal);
  if (resumeModalOverlay) {
    resumeModalOverlay.addEventListener('click', (e) => {
      if (e.target === resumeModalOverlay) closeResumeModal();
    });
  }

  // 9. Schematic Lightbox Modal Controller
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
      schematicModalOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSchematicModal() {
    if (schematicModalOverlay) {
      schematicModalOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('click', (e) => {
    const target = e.target.closest('.btn-view-schematic');
    if (target) {
      e.preventDefault();
      const schematicUrl = target.getAttribute('data-schematic') || target.getAttribute('href');
      const projectCard = target.closest('.project-card');
      const projectTitle = projectCard?.querySelector('.project-title')?.textContent || 'Project';
      openSchematicModal(schematicUrl, projectTitle);
    }
  });

  if (schematicModalClose) schematicModalClose.addEventListener('click', closeSchematicModal);
  if (schematicModalOverlay) {
    schematicModalOverlay.addEventListener('click', (e) => {
      if (e.target === schematicModalOverlay) closeSchematicModal();
    });
  }
});
