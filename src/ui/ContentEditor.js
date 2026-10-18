/**
 * Aditya Pandey Portfolio - Content & Photo Customizer
 * Allows editing photos, bio, timeline, and projects with instant live preview.
 * Press Ctrl + E (or Cmd + E) to toggle anytime.
 */

import { portfolioData as defaultData } from '../data/portfolioData.js';

const STORAGE_KEY = 'aditya_portfolio_custom_data_v9';

/**
 * Retrieve active portfolio data (merging any localStorage overrides with default)
 */
export function getActivePortfolioData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultData,
        ...parsed,
        personal: { ...defaultData.personal, ...(parsed.personal || {}) },
        socials: { ...defaultData.personal.socials, ...(parsed.personal?.socials || {}) }
      };
    }
  } catch (err) {
    console.warn('Could not read saved customizer data:', err);
  }
  return JSON.parse(JSON.stringify(defaultData));
}

/**
 * Save active data to localStorage
 */
export function saveActivePortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/**
 * Reset all edits and clear localStorage
 */
export function resetPortfolioData() {
  localStorage.removeItem(STORAGE_KEY);
  return JSON.parse(JSON.stringify(defaultData));
}

/**
 * Initialize the visual in-browser content and photo editor (Protected by Admin Auth)
 */
export function initContentEditor(onDataUpdateCallback) {
  let currentData = getActivePortfolioData();
  let activePhotoTarget = 'heroPhoto'; // 'heroPhoto' | 'aboutPhoto' | 'navAvatar'

  // ── 1. CREATE CUSTOMIZER MODAL WINDOW ──
  const backdrop = document.createElement('div');
  backdrop.className = 'customizer-modal-backdrop';
  backdrop.id = 'customizerBackdrop';

  backdrop.innerHTML = `
    <div class="customizer-modal-window" role="dialog" aria-modal="true">
      <!-- Header -->
      <div class="customizer-header">
        <div class="customizer-title-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ea5b25" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <div>
            <h3>Portfolio Visual Customizer</h3>
            <p style="font-size: 0.8rem; color: #94a3b8; margin: 0;">Live preview for photos, bio, timeline, and projects</p>
          </div>
        </div>
        <button class="customizer-close-btn" id="customizerCloseBtn" aria-label="Close customizer">&times;</button>
      </div>

      <!-- Navigation Tabs -->
      <div class="customizer-tabs">
        <button class="customizer-tab-btn active" data-tab="tab-photos">📸 Photos & Media</button>
        <button class="customizer-tab-btn" data-tab="tab-personal">✍️ Profile & Bio</button>
        <button class="customizer-tab-btn" data-tab="tab-timeline">⏳ Timeline Journey</button>
        <button class="customizer-tab-btn" data-tab="tab-projects">🚀 Projects</button>
        <button class="customizer-tab-btn" data-tab="tab-experience">💼 Experience</button>
        <button class="customizer-tab-btn" data-tab="tab-export">📋 Export Code</button>
      </div>

      <!-- Scrollable Body with Tab Panes -->
      <div class="customizer-body">
        
        <!-- TAB 1: PHOTOS -->
        <div class="customizer-tab-pane active" id="tab-photos">
          <div class="customizer-notice">
            <strong>Photo Quick Switcher (Admin Only):</strong> Select which photo slot you want to update, then click any thumbnail from your gallery, upload your own photo from your computer, or enter an image path!
          </div>

          <div class="photo-picker-section">
            <label class="customizer-label">Select Photo Slot to Edit:</label>
            <div class="photo-target-selector">
              <button type="button" class="photo-target-btn active" data-target="heroPhoto">Hero Section Photo</button>
              <button type="button" class="photo-target-btn" data-target="aboutPhoto">About Section Photo</button>
              <button type="button" class="photo-target-btn" data-target="navAvatar">Navbar Avatar</button>
            </div>

            <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px; background: #f8fafc; padding: 14px; border-radius: var(--radius-sm); border: 1px solid var(--gray-border);">
              <div style="width: 80px; height: 80px; border-radius: 10px; overflow: hidden; background: #0B1021; border: 2px solid var(--primary); flex-shrink: 0;">
                <img id="activePhotoPreview" src="${currentData.personal.heroPhoto}" alt="Current Photo Preview" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <div style="flex: 1;">
                <label class="customizer-label" id="activePhotoLabel">Hero Photo Path or URL:</label>
                <input type="text" class="customizer-input" id="activePhotoInput" value="${currentData.personal.heroPhoto}" />
                <span class="customizer-help">Path relative to project (e.g. /images/aditya_rocket.png) or full web URL.</span>
              </div>
            </div>

            <label class="customizer-label">1-Click Choose From Available Gallery Images:</label>
            <div class="photo-thumbnails-grid" id="photoThumbnailsContainer"></div>

            <label class="customizer-label" style="margin-top: 20px;">Or Upload Any New Photo From Your Computer:</label>
            <div class="photo-upload-box" id="photoUploadBox">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ea5b25" stroke-width="1.8" style="margin: 0 auto 8px auto; display: block;">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <p style="font-size: 0.9rem; font-weight: 600; color: var(--dark); margin-bottom: 4px;">Click to Browse Image File</p>
              <p style="font-size: 0.8rem; color: var(--gray-muted);">Supports JPG, PNG, WEBP, SVG (preview loaded instantly in browser)</p>
              <input type="file" id="localPhotoFileInput" accept="image/*" style="display: none;" />
            </div>
          </div>
        </div>

        <!-- TAB 2: PERSONAL & BIO -->
        <div class="customizer-tab-pane" id="tab-personal">
          <div class="customizer-notice">
            Edit your primary titles, headlines, bio description, and social media URLs.
          </div>

          <div class="customizer-form-grid">
            <div>
              <label class="customizer-label">Full Name</label>
              <input type="text" class="customizer-input" id="inputName" value="${currentData.personal.name}" />
            </div>

            <div>
              <label class="customizer-label">Role Title (Navbar & About)</label>
              <input type="text" class="customizer-input" id="inputRoleTitle" value="${currentData.personal.roleTitle}" />
            </div>

            <div class="customizer-form-full">
              <label class="customizer-label">Hero Main Heading (HTML supported)</label>
              <input type="text" class="customizer-input" id="inputHeroHeading" value="${currentData.personal.heroHeading.replace(/"/g, '&quot;')}" />
            </div>

            <div class="customizer-form-full">
              <label class="customizer-label">Hero Status Pill Badge</label>
              <input type="text" class="customizer-input" id="inputStatusBadge" value="${currentData.personal.statusBadge}" />
            </div>

            <div class="customizer-form-full">
              <label class="customizer-label">Hero Subheading Text</label>
              <textarea class="customizer-textarea" id="inputHeroSubheading" rows="3">${currentData.personal.heroSubheading}</textarea>
            </div>

            <div class="customizer-form-full">
              <label class="customizer-label">About Section Bio Paragraphs</label>
              <textarea class="customizer-textarea" id="inputBioParagraphs" rows="6" placeholder="Separate paragraphs with a blank line">${currentData.personal.bioParagraphs.join('\n\n')}</textarea>
              <span class="customizer-help">Leave a blank line between paragraphs.</span>
            </div>

            <div>
              <label class="customizer-label">LinkedIn URL</label>
              <input type="text" class="customizer-input" id="inputLinkedin" value="${currentData.personal.socials?.linkedin || ''}" />
            </div>

            <div>
              <label class="customizer-label">GitHub URL</label>
              <input type="text" class="customizer-input" id="inputGithub" value="${currentData.personal.socials?.github || ''}" />
            </div>

            <div class="customizer-form-full">
              <label class="customizer-label">Direct Contact Email</label>
              <input type="email" class="customizer-input" id="inputEmail" value="${currentData.personal.socials?.email || ''}" />
            </div>
          </div>
        </div>

        <!-- TAB 3: TIMELINE JOURNEY -->
        <div class="customizer-tab-pane" id="tab-timeline">
          <div class="customizer-notice">
            <strong>Interactive Timeline:</strong> Add, edit, or remove milestones from your journey. Filterable by category on the live page!
          </div>

          <div id="timelineItemsList"></div>

          <button type="button" class="customizer-add-btn" id="btnAddTimelineMilestone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New Timeline Milestone
          </button>
        </div>

        <!-- TAB 4: PROJECTS -->
        <div class="customizer-tab-pane" id="tab-projects">
          <div class="customizer-notice">
            Manage your engineering projects, category tags, descriptions, and code/demo links.
          </div>

          <div id="projectsItemsList"></div>

          <button type="button" class="customizer-add-btn" id="btnAddProject">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add New Project
          </button>
        </div>

        <!-- TAB 5: EXPERIENCE -->
        <div class="customizer-tab-pane" id="tab-experience">
          <div class="customizer-notice">
            Manage your professional and club experience cards.
          </div>

          <div id="experienceItemsList"></div>

          <button type="button" class="customizer-add-btn" id="btnAddExperience" style="margin-bottom: 24px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Experience Entry
          </button>
        </div>

        <!-- TAB 6: EXPORT CODE -->
        <div class="customizer-tab-pane" id="tab-export">
          <div class="customizer-notice" style="background: #f0fdf4; border-color: #bbf7d0; border-left-color: #16a34a; color: #166534;">
            <strong>Save Code Permanently:</strong> Copy this code and replace the contents of <code style="font-weight: 700;">src/data/portfolioData.js</code> to commit your changes into git!
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <button type="button" class="btn-cust-export" id="btnCopyConfigCode">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy Code to Clipboard
            </button>
            <button type="button" class="btn-cust-reset" id="btnDownloadConfig">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download portfolioData.js
            </button>
          </div>

          <pre class="code-export-box" id="codeExportBox"></pre>
        </div>

      </div>

      <!-- Footer Actions -->
      <div class="customizer-footer">
        <div class="customizer-footer-left">
          <button type="button" class="btn-cust-reset" id="btnResetDefaults">Reset to Original Defaults</button>
        </div>
        <div class="customizer-footer-right">
          <button type="button" class="btn-cust-save" id="btnApplyLive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Save & Apply Live
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  // ── 2. OPEN & CLOSE CONTROLLERS ──
  function openCustomizer() {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    syncFormWithCurrentData();
  }

  function closeCustomizer() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  backdrop.querySelector('#customizerCloseBtn').addEventListener('click', closeCustomizer);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeCustomizer();
  });

  // URL Trigger '?edit' or '?customizer'
  if (window.location.search.includes('edit') || window.location.search.includes('customizer')) {
    openCustomizer();
  }

  // Keyboard shortcut Ctrl + E or Cmd + E
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      backdrop.classList.contains('is-open') ? closeCustomizer() : openCustomizer();
    }
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      closeCustomizer();
    }
  });

  // Triple Click on Footer Copyright or Nav Avatar
  let footerClickCount = 0;
  let footerClickTimer = null;
  const footerCopy = document.querySelector('.footer-copy');
  const navAvatar = document.querySelector('.nav-avatar');

  function handleSecretTripleClick() {
    footerClickCount++;
    clearTimeout(footerClickTimer);
    if (footerClickCount >= 3) {
      footerClickCount = 0;
      openCustomizer();
    } else {
      footerClickTimer = setTimeout(() => { footerClickCount = 0; }, 600);
    }
  }

  if (footerCopy) footerCopy.addEventListener('click', handleSecretTripleClick);
  if (navAvatar) navAvatar.addEventListener('click', handleSecretTripleClick);

  // ── 6. TAB SWITCHING LOGIC ──
  const tabButtons = backdrop.querySelectorAll('.customizer-tab-btn');
  const tabPanes = backdrop.querySelectorAll('.customizer-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetTab = backdrop.querySelector(`#${btn.dataset.tab}`);
      if (targetTab) {
        targetTab.classList.add('active');
        if (btn.dataset.tab === 'tab-export') {
          updateCodeExport();
        }
      }
    });
  });

  // ── 7. CUSTOMIZER MODAL CONTROLLER ──
  function openCustomizer() {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    syncFormWithCurrentData();
  }

  function closeCustomizer() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  backdrop.querySelector('#customizerCloseBtn').addEventListener('click', closeCustomizer);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeCustomizer();
  });

  // ── 8. PHOTO GALLERY & TARGET SELECTION ──
  const targetButtons = backdrop.querySelectorAll('.photo-target-btn');
  const activePhotoInput = backdrop.querySelector('#activePhotoInput');
  const activePhotoPreview = backdrop.querySelector('#activePhotoPreview');
  const activePhotoLabel = backdrop.querySelector('#activePhotoLabel');

  function updatePhotoSlotUI() {
    targetButtons.forEach(b => {
      b.classList.toggle('active', b.dataset.target === activePhotoTarget);
    });
    const currentVal = currentData.personal[activePhotoTarget] || '';
    activePhotoInput.value = currentVal;
    activePhotoPreview.src = currentVal;
    activePhotoLabel.textContent = `${activePhotoTarget === 'heroPhoto' ? 'Hero Photo' : activePhotoTarget === 'aboutPhoto' ? 'About Section Photo' : 'Navbar Avatar'} Path or URL:`;
    renderPhotoThumbnails();
  }

  targetButtons.forEach(b => {
    b.addEventListener('click', () => {
      activePhotoTarget = b.dataset.target;
      updatePhotoSlotUI();
    });
  });

  activePhotoInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    currentData.personal[activePhotoTarget] = val;
    activePhotoPreview.src = val;
    renderPhotoThumbnails();
    if (onDataUpdateCallback) onDataUpdateCallback(currentData);
  });

  function renderPhotoThumbnails() {
    const container = backdrop.querySelector('#photoThumbnailsContainer');
    container.innerHTML = '';
    const currentVal = currentData.personal[activePhotoTarget] || '';

    (currentData.availablePhotos || []).forEach(item => {
      const card = document.createElement('div');
      card.className = `photo-thumbnail-card ${currentVal === item.path ? 'selected' : ''}`;
      card.innerHTML = `
        <span class="photo-thumbnail-label">${item.label}</span>
        <img src="${item.path}" alt="${item.label}" loading="lazy" />
      `;
      card.addEventListener('click', () => {
        currentData.personal[activePhotoTarget] = item.path;
        activePhotoInput.value = item.path;
        activePhotoPreview.src = item.path;
        renderPhotoThumbnails();
        if (onDataUpdateCallback) onDataUpdateCallback(currentData);
      });
      container.appendChild(card);
    });
  }

  // Local Image Upload from Computer
  const photoUploadBox = backdrop.querySelector('#photoUploadBox');
  const localPhotoFileInput = backdrop.querySelector('#localPhotoFileInput');

  photoUploadBox.addEventListener('click', () => localPhotoFileInput.click());

  localPhotoFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target.result;
        currentData.personal[activePhotoTarget] = dataUrl;
        activePhotoInput.value = dataUrl;
        activePhotoPreview.src = dataUrl;
        if (!currentData.availablePhotos.some(p => p.path === dataUrl)) {
          currentData.availablePhotos.unshift({
            label: `Custom: ${file.name.slice(0, 15)}`,
            path: dataUrl
          });
        }
        renderPhotoThumbnails();
        if (onDataUpdateCallback) onDataUpdateCallback(currentData);
      };
      reader.readAsDataURL(file);
    }
  });

  // ── 9. TIMELINE MILESTONE FORM LIST ──
  function renderTimelineEditor() {
    const list = backdrop.querySelector('#timelineItemsList');
    list.innerHTML = '';

    (currentData.timeline || []).forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      card.innerHTML = `
        <div class="customizer-item-header">
          <span class="customizer-item-title">#${index + 1} // ${item.year} - ${item.title || 'Untitled'}</span>
          <button type="button" class="customizer-delete-btn" data-index="${index}">Delete</button>
        </div>
        <div class="customizer-form-grid">
          <div>
            <label class="customizer-label">Year / Period</label>
            <input type="text" class="customizer-input tl-year" data-index="${index}" value="${item.year || ''}" />
          </div>
          <div>
            <label class="customizer-label">Phase Label</label>
            <input type="text" class="customizer-input tl-phase" data-index="${index}" value="${item.phase || ''}" />
          </div>
          <div>
            <label class="customizer-label">Title</label>
            <input type="text" class="customizer-input tl-title" data-index="${index}" value="${item.title || ''}" />
          </div>
          <div>
            <label class="customizer-label">Organization / Event</label>
            <input type="text" class="customizer-input tl-org" data-index="${index}" value="${item.organization || ''}" />
          </div>
          <div>
            <label class="customizer-label">Category Filter</label>
            <select class="customizer-select tl-cat" data-index="${index}">
              <option value="rocketry" ${item.category === 'rocketry' ? 'selected' : ''}>Rocketry & Avionics</option>
              <option value="software" ${item.category === 'software' ? 'selected' : ''}>Software & Web</option>
              <option value="education" ${item.category === 'education' ? 'selected' : ''}>Education & CS</option>
            </select>
          </div>
          <div>
            <label class="customizer-label">Badge</label>
            <input type="text" class="customizer-input tl-badge" data-index="${index}" value="${item.badge || ''}" />
          </div>
          <div class="customizer-form-full">
            <label class="customizer-label">Description</label>
            <textarea class="customizer-textarea tl-desc" data-index="${index}" rows="3">${item.description || ''}</textarea>
          </div>
          <div class="customizer-form-full">
            <label class="customizer-label">Tags (comma separated)</label>
            <input type="text" class="customizer-input tl-tags" data-index="${index}" value="${(item.tags || []).join(', ')}" />
          </div>
        </div>
      `;

      card.querySelector('.customizer-delete-btn').addEventListener('click', () => {
        currentData.timeline.splice(index, 1);
        renderTimelineEditor();
        if (onDataUpdateCallback) onDataUpdateCallback(currentData);
      });

      card.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', () => {
          readTimelineValuesFromDOM();
          if (onDataUpdateCallback) onDataUpdateCallback(currentData);
        });
      });

      list.appendChild(card);
    });
  }

  function readTimelineValuesFromDOM() {
    const list = backdrop.querySelector('#timelineItemsList');
    const cards = list.querySelectorAll('.customizer-item-card');
    cards.forEach((card, index) => {
      if (currentData.timeline[index]) {
        currentData.timeline[index].year = card.querySelector('.tl-year').value;
        currentData.timeline[index].phase = card.querySelector('.tl-phase').value;
        currentData.timeline[index].title = card.querySelector('.tl-title').value;
        currentData.timeline[index].organization = card.querySelector('.tl-org').value;
        currentData.timeline[index].category = card.querySelector('.tl-cat').value;
        currentData.timeline[index].badge = card.querySelector('.tl-badge').value;
        currentData.timeline[index].description = card.querySelector('.tl-desc').value;
        currentData.timeline[index].tags = card.querySelector('.tl-tags').value
          .split(',')
          .map(t => t.trim())
          .filter(Boolean);
      }
    });
  }

  backdrop.querySelector('#btnAddTimelineMilestone').addEventListener('click', () => {
    currentData.timeline.unshift({
      id: `timeline-${Date.now()}`,
      year: "2026",
      phase: "Phase 06 // New Frontier",
      title: "New Milestone Title",
      organization: "Organization / Event",
      badge: "Milestone",
      category: "rocketry",
      description: "Describe the key accomplishments, challenges solved, and systems engineered.",
      tags: ["C++", "Avionics", "Hardware"],
      icon: "rocket"
    });
    renderTimelineEditor();
    if (onDataUpdateCallback) onDataUpdateCallback(currentData);
  });

  // ── 10. PROJECTS FORM LIST ──
  function renderProjectsEditor() {
    const list = backdrop.querySelector('#projectsItemsList');
    list.innerHTML = '';

    (currentData.projects || []).forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      card.innerHTML = `
        <div class="customizer-item-header">
          <span class="customizer-item-title">Project: ${item.title || 'Untitled'}</span>
          <button type="button" class="customizer-delete-btn" data-index="${index}">Delete</button>
        </div>
        <div class="customizer-form-grid">
          <div>
            <label class="customizer-label">Title</label>
            <input type="text" class="customizer-input proj-title" data-index="${index}" value="${item.title || ''}" />
          </div>
          <div>
            <label class="customizer-label">Category Badge</label>
            <input type="text" class="customizer-input proj-badge" data-index="${index}" value="${item.categoryBadge || ''}" />
          </div>
          <div class="customizer-form-full">
            <label class="customizer-label">Project Image URL / Path</label>
            <input type="text" class="customizer-input proj-img" data-index="${index}" value="${item.image || ''}" />
          </div>
          <div class="customizer-form-full">
            <label class="customizer-label">Description</label>
            <textarea class="customizer-textarea proj-desc" data-index="${index}" rows="3">${item.description || ''}</textarea>
          </div>
          <div class="customizer-form-full">
            <label class="customizer-label">Tech Tags (comma separated)</label>
            <input type="text" class="customizer-input proj-tags" data-index="${index}" value="${(item.tags || []).join(', ')}" />
          </div>
          <div>
            <label class="customizer-label">GitHub URL</label>
            <input type="text" class="customizer-input proj-gh" data-index="${index}" value="${item.githubUrl || ''}" />
          </div>
          <div>
            <label class="customizer-label">Schematic / Demo URL (Optional)</label>
            <input type="text" class="customizer-input proj-demo" data-index="${index}" value="${item.schematicUrl || item.liveUrl || ''}" />
          </div>
        </div>
      `;

      card.querySelector('.customizer-delete-btn').addEventListener('click', () => {
        currentData.projects.splice(index, 1);
        renderProjectsEditor();
        if (onDataUpdateCallback) onDataUpdateCallback(currentData);
      });

      card.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
          readProjectsValuesFromDOM();
          if (onDataUpdateCallback) onDataUpdateCallback(currentData);
        });
      });

      list.appendChild(card);
    });
  }

  function readProjectsValuesFromDOM() {
    const list = backdrop.querySelector('#projectsItemsList');
    const cards = list.querySelectorAll('.customizer-item-card');
    cards.forEach((card, index) => {
      if (currentData.projects[index]) {
        currentData.projects[index].title = card.querySelector('.proj-title').value;
        currentData.projects[index].categoryBadge = card.querySelector('.proj-badge').value;
        currentData.projects[index].image = card.querySelector('.proj-img').value;
        currentData.projects[index].description = card.querySelector('.proj-desc').value;
        currentData.projects[index].tags = card.querySelector('.proj-tags').value
          .split(',')
          .map(t => t.trim())
          .filter(Boolean);
        currentData.projects[index].githubUrl = card.querySelector('.proj-gh').value;
        currentData.projects[index].schematicUrl = card.querySelector('.proj-demo').value;
      }
    });
  }

  backdrop.querySelector('#btnAddProject').addEventListener('click', () => {
    currentData.projects.push({
      id: `project-${Date.now()}`,
      title: "New Project Title",
      categoryBadge: "Embedded & IoT",
      image: "/images/CAN7USAT.png",
      description: "Detailed description of the hardware, firmware, and telemetry built.",
      tags: ["ESP32", "C++", "Sensors"],
      githubUrl: "https://github.com/aditya11-07"
    });
    renderProjectsEditor();
    if (onDataUpdateCallback) onDataUpdateCallback(currentData);
  });

  // ── 11. EXPERIENCE FORM LIST ──
  function renderExperienceEditor() {
    const list = backdrop.querySelector('#experienceItemsList');
    list.innerHTML = '';

    (currentData.experience || []).forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'customizer-item-card';
      card.innerHTML = `
        <div class="customizer-item-header">
          <span class="customizer-item-title">${item.role || 'Role'} at ${item.company || 'Company'}</span>
          <button type="button" class="customizer-delete-btn" data-index="${index}">Delete</button>
        </div>
        <div class="customizer-form-grid">
          <div>
            <label class="customizer-label">Role</label>
            <input type="text" class="customizer-input exp-role" data-index="${index}" value="${item.role || ''}" />
          </div>
          <div>
            <label class="customizer-label">Company / Organization</label>
            <input type="text" class="customizer-input exp-company" data-index="${index}" value="${item.company || ''}" />
          </div>
          <div class="customizer-form-full">
            <label class="customizer-label">Badge</label>
            <input type="text" class="customizer-input exp-badge" data-index="${index}" value="${item.badge || ''}" />
          </div>
          <div class="customizer-form-full">
            <label class="customizer-label">Description</label>
            <textarea class="customizer-textarea exp-desc" data-index="${index}" rows="3">${item.description || ''}</textarea>
          </div>
        </div>
      `;

      card.querySelector('.customizer-delete-btn').addEventListener('click', () => {
        currentData.experience.splice(index, 1);
        renderExperienceEditor();
        if (onDataUpdateCallback) onDataUpdateCallback(currentData);
      });

      card.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
          readExperienceValuesFromDOM();
          if (onDataUpdateCallback) onDataUpdateCallback(currentData);
        });
      });

      list.appendChild(card);
    });
  }

  function readExperienceValuesFromDOM() {
    const list = backdrop.querySelector('#experienceItemsList');
    const cards = list.querySelectorAll('.customizer-item-card');
    cards.forEach((card, index) => {
      if (currentData.experience[index]) {
        currentData.experience[index].role = card.querySelector('.exp-role').value;
        currentData.experience[index].company = card.querySelector('.exp-company').value;
        currentData.experience[index].badge = card.querySelector('.exp-badge').value;
        currentData.experience[index].description = card.querySelector('.exp-desc').value;
      }
    });
  }

  backdrop.querySelector('#btnAddExperience').addEventListener('click', () => {
    currentData.experience.push({
      badge: "Engineering Role",
      role: "Hardware / Software Engineer",
      company: "Organization Name",
      description: "Brief summary of responsibilities, achievements, and impact."
    });
    renderExperienceEditor();
    if (onDataUpdateCallback) onDataUpdateCallback(currentData);
  });

  // ── 12. PERSONAL & SECURITY FORM BINDINGS ──
  const inputName = backdrop.querySelector('#inputName');
  const inputRoleTitle = backdrop.querySelector('#inputRoleTitle');
  const inputHeroHeading = backdrop.querySelector('#inputHeroHeading');
  const inputStatusBadge = backdrop.querySelector('#inputStatusBadge');
  const inputHeroSubheading = backdrop.querySelector('#inputHeroSubheading');
  const inputBioParagraphs = backdrop.querySelector('#inputBioParagraphs');
  const inputLinkedin = backdrop.querySelector('#inputLinkedin');
  const inputGithub = backdrop.querySelector('#inputGithub');
  const inputEmail = backdrop.querySelector('#inputEmail');

  function bindInputs() {
    const updatePersonalData = () => {
      currentData.personal.name = inputName.value;
      currentData.personal.roleTitle = inputRoleTitle.value;
      currentData.personal.heroHeading = inputHeroHeading.value;
      currentData.personal.statusBadge = inputStatusBadge.value;
      currentData.personal.heroSubheading = inputHeroSubheading.value;
      currentData.personal.bioParagraphs = inputBioParagraphs.value
        .split('\n\n')
        .map(p => p.trim())
        .filter(Boolean);
      
      if (!currentData.personal.socials) currentData.personal.socials = {};
      currentData.personal.socials.linkedin = inputLinkedin.value;
      currentData.personal.socials.github = inputGithub.value;
      currentData.personal.socials.email = inputEmail.value;

      if (!currentData.personal.socials) currentData.personal.socials = {};
      currentData.personal.socials.linkedin = inputLinkedin.value;
      currentData.personal.socials.github = inputGithub.value;
      currentData.personal.socials.email = inputEmail.value;

      if (onDataUpdateCallback) onDataUpdateCallback(currentData);
    };

    [inputName, inputRoleTitle, inputHeroHeading, inputStatusBadge, inputHeroSubheading, inputBioParagraphs, inputLinkedin, inputGithub, inputEmail].forEach(input => {
      input.addEventListener('input', updatePersonalData);
    });
  }
  bindInputs();

  // ── 13. SYNC FORM WITH DATA ──
  function syncFormWithCurrentData() {
    currentData = getActivePortfolioData();
    inputName.value = currentData.personal.name || '';
    inputRoleTitle.value = currentData.personal.roleTitle || '';
    inputHeroHeading.value = (currentData.personal.heroHeading || '').replace(/"/g, '&quot;');
    inputStatusBadge.value = currentData.personal.statusBadge || '';
    inputHeroSubheading.value = currentData.personal.heroSubheading || '';
    inputBioParagraphs.value = (currentData.personal.bioParagraphs || []).join('\n\n');
    inputLinkedin.value = currentData.personal.socials?.linkedin || '';
    inputGithub.value = currentData.personal.socials?.github || '';
    inputEmail.value = currentData.personal.socials?.email || '';

    updatePhotoSlotUI();
    renderTimelineEditor();
    renderProjectsEditor();
    renderExperienceEditor();
  }

  // ── 14. CODE EXPORT GENERATOR ──
  function generateExportCode() {
    return `/**\n * ADITYA PANDEY PORTFOLIO - CONTENT & PHOTO CONFIGURATION\n * Generated via Built-in Visual Customizer (Admin)\n */\n\nexport const portfolioData = ${JSON.stringify(currentData, null, 2)};\n`;
  }

  function updateCodeExport() {
    const box = backdrop.querySelector('#codeExportBox');
    box.textContent = generateExportCode();
  }

  backdrop.querySelector('#btnCopyConfigCode').addEventListener('click', () => {
    const code = generateExportCode();
    navigator.clipboard.writeText(code).then(() => {
      const btn = backdrop.querySelector('#btnCopyConfigCode');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '✓ Copied to Clipboard!';
      btn.style.background = '#16a34a';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
      }, 2500);
    }).catch(() => {
      alert('Could not copy automatically. Please select and copy from the box below.');
    });
  });

  backdrop.querySelector('#btnDownloadConfig').addEventListener('click', () => {
    const code = generateExportCode();
    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioData.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // ── 15. SAVE & APPLY LIVE BUTTON ──
  backdrop.querySelector('#btnApplyLive').addEventListener('click', () => {
    saveActivePortfolioData(currentData);
    if (onDataUpdateCallback) onDataUpdateCallback(currentData);
    
    const btn = backdrop.querySelector('#btnApplyLive');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Saved & Applied!';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      closeCustomizer();
    }, 1000);
  });

  // ── 16. RESET TO DEFAULTS BUTTON ──
  backdrop.querySelector('#btnResetDefaults').addEventListener('click', () => {
    if (confirm('Are you sure you want to revert all customizations back to original defaults?')) {
      currentData = resetPortfolioData();
      syncFormWithCurrentData();
      if (onDataUpdateCallback) onDataUpdateCallback(currentData);
      alert('Portfolio reset to original defaults!');
    }
  });

  syncFormWithCurrentData();
}
