/**
 * Aditya Pandey Portfolio - Professional Image Showcase Engine
 * Features smooth "zoom-out" (scale-down) entrance animation upon viewport entry.
 *
 * CUSTOMIZATION GUIDE:
 * - Zoom-Out Intensity: Change SHOWCASE_CONFIG.zoomInStart (e.g., 1.15 = 15% initial zoom)
 * - Animation Timing:   Change SHOWCASE_CONFIG.entranceDuration & SHOWCASE_CONFIG.easing
 * - Stagger Speed:      Change SHOWCASE_CONFIG.staggerStep (delay between cards)
 * - Image Sources:      Add or edit items in showcaseData array below
 */

export const SHOWCASE_CONFIG = {
  zoomInStart: 1.16,                           // Card starts at scale(1.16) and settles to scale(1)
  entranceDuration: '0.75s',                   // Entrance animation duration (0.6s – 0.85s range)
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',    // Ultra-smooth decelerating cubic-bezier curve
  staggerStep: 0.08,                           // Delay in seconds between adjacent cards
  aspectRatio: '16 / 10',                      // Enforced aspect ratio for zero cumulative layout shift (CLS)
  threshold: 0.15                              // Percentage of card visible before triggering entrance
};

export const showcaseData = [
  {
    id: "showcase-01",
    title: "TRISHUL II Sounding Rocket & Integration",
    category: "rocketry",
    categoryLabel: "Rocketry & Aerospace",
    tag: "IN-SPACe National Finalist",
    src: "/images/gallery/gallery-10.jpg",
    desc: "Aditya with the TRISHUL II sounding rocket at Narayani Model Rocketry Launch Pad, Kushinagar."
  },
  {
    id: "showcase-02",
    title: "National Space Day Quiz Certification",
    category: "certifications",
    categoryLabel: "ISRO & Certifications",
    tag: "ISRO & MyGov Certified",
    src: "/images/gallery/gallery-02.jpg",
    desc: "Certified by Dr. S. Somanath (Chairman ISRO & Secretary, Department of Space) for space science excellence."
  },
  {
    id: "showcase-03",
    title: "IN-SPACe Grand Finale National Felicitation",
    category: "rocketry",
    categoryLabel: "Rocketry & Aerospace",
    tag: "National Stage Award",
    src: "/images/gallery/gallery-07.jpg",
    desc: "PSIT Vyomnauts rocketry team receiving national finalist honors on stage during the grand finale."
  },
  {
    id: "showcase-04",
    title: "Vyomnauts Team at TRISHUL II Launcher",
    category: "rocketry",
    categoryLabel: "Rocketry & Aerospace",
    tag: "Launch Pad Operations",
    src: "/images/gallery/gallery-09.jpg",
    desc: "Student aerospace team at the launch rail during flight qualification and rail mounting operations."
  },
  {
    id: "showcase-05",
    title: "Field Launch Rail & Sounding Rocket",
    category: "rocketry",
    categoryLabel: "Rocketry & Aerospace",
    tag: "Hardware Calibration",
    src: "/images/gallery/gallery-11.jpg",
    desc: "On-field assembly, flight sensor calibration, and launch rail azimuth alignment beside the tripod."
  },
  {
    id: "showcase-06",
    title: "The Jam Spot Event — Media Coverage",
    category: "leadership",
    categoryLabel: "Leadership & Media",
    tag: "Press Feature & Co-Founder",
    src: "/images/gallery/gallery-12.jpg",
    desc: "Sultanpur newspaper clipping covering the youth talent open-mic platform co-founded by Aditya Pandey."
  },
  {
    id: "showcase-07",
    title: "Pariksha Pe Charcha 2024 Certification",
    category: "certifications",
    categoryLabel: "ISRO & Certifications",
    tag: "Ministry of Education",
    src: "/images/gallery/gallery-04.jpg",
    desc: "National participation certificate issued by the National Council of Educational Research and Training (NCERT)."
  },
  {
    id: "showcase-08",
    title: "Swachh Bharat Mission Grameen Quiz",
    category: "certifications",
    categoryLabel: "ISRO & Certifications",
    tag: "Ministry of Jal Shakti",
    src: "/images/gallery/gallery-03.jpg",
    desc: "Awarded by the Department of Drinking Water and Sanitation & MyGov for national awareness qualification."
  },
  {
    id: "showcase-09",
    title: "Team Leader — PSIT Rocketry Uniform",
    category: "leadership",
    categoryLabel: "Leadership & Media",
    tag: "Student Leadership",
    src: "/images/gallery/gallery-08.jpg",
    desc: "Aditya in the official PSIT Vyomnauts uniform heading avionics engineering and competition proposals."
  },
  {
    id: "showcase-10",
    title: "Narcotics Control Bureau National Pledge",
    category: "certifications",
    categoryLabel: "ISRO & Certifications",
    tag: "Ministry of Home Affairs",
    src: "/images/gallery/gallery-05.jpg",
    desc: "Recognized by the Narcotics Control Bureau and Govt. of India for conscious youth leadership and responsibility."
  },
  {
    id: "showcase-11",
    title: "Digital Marketing & Product Workshop",
    category: "certifications",
    categoryLabel: "ISRO & Certifications",
    tag: "Workshop Certification",
    src: "/images/gallery/gallery-06.jpg",
    desc: "Product communication, growth architecture, and digital strategy certification by Wardiere Company."
  },
  {
    id: "showcase-12",
    title: "Public Address & Keynote Speech",
    category: "leadership",
    categoryLabel: "Leadership & Media",
    tag: "Speech & Debate",
    src: "/images/gallery/gallery-01.jpg",
    desc: "School captaincy, student council leadership, and public debate address at PM Shri Kendriya Vidyalaya Amhat."
  }
];

/**
 * Initializes the image showcase grid with zoom-out scroll entrance and lightbox interaction.
 */
export function initImageShowcase() {
  const grid = document.getElementById('showcaseGrid');
  if (!grid) return;

  // 1. Render All Cards
  grid.innerHTML = showcaseData.map((item, index) => {
    return `
      <article
        class="showcase-card"
        data-id="${item.id}"
        data-category="${item.category}"
        style="--stagger: ${index % 3};"
        tabindex="0"
        role="button"
        aria-label="View ${item.title}"
      >
        <div class="showcase-card-media">
          <img
            src="${item.src}"
            alt="${item.title}"
            loading="lazy"
            decoding="async"
            width="600"
            height="375"
          />
        </div>
        <div class="showcase-card-body">
          <span class="showcase-card-tag mono">${item.tag}</span>
          <h3 class="showcase-card-title">${item.title}</h3>
          <p class="showcase-card-desc">${item.desc}</p>
          <div class="showcase-card-footer">
            <span class="mono">${item.categoryLabel}</span>
            <span class="showcase-card-action">
              <span>Inspect</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // 2. Setup IntersectionObserver for Smooth "Zoom-Out" Scroll Entrance
  // Each card starts at scale(1.16) and settles smoothly to scale(1) once in view.
  const cards = grid.querySelectorAll('.showcase-card');

  // Check prefers-reduced-motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // If reduced motion or old browser, reveal immediately without animation
    cards.forEach(card => card.classList.add('in-view'));
  } else {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: SHOWCASE_CONFIG.threshold
    };

    const entranceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger the zoom-out entrance
          entry.target.classList.add('in-view');
          // Unobserve so animation triggers once without re-triggering annoyingly
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cards.forEach(card => entranceObserver.observe(card));
  }

  // 3. Lightbox Modal Integration
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.showcase-card');
    if (!card) return;

    const id = card.getAttribute('data-id');
    const item = showcaseData.find(d => d.id === id);
    if (!item) return;

    const modal = document.getElementById('portfolioModal');
    if (modal) {
      const modalImg = modal.querySelector('.portfolio-modal-body img');
      const modalTitle = modal.querySelector('.portfolio-modal-title');
      const modalDownload = modal.querySelector('.portfolio-modal-footer a');
      if (modalImg) modalImg.src = item.src;
      if (modalTitle) modalTitle.textContent = `${item.title} — ${item.tag}`;
      if (modalDownload) {
        modalDownload.href = item.src;
        modalDownload.download = item.src.split('/').pop();
        modalDownload.textContent = 'Download Photo ↗';
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  // Keyboard accessibility (Enter or Space key to open modal)
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.showcase-card');
      if (card) {
        e.preventDefault();
        card.click();
      }
    }
  });

  // 4. Interactive Category Filter Pills
  const filterBtns = document.querySelectorAll('.showcase-filter-btn');
  const counterEl = document.getElementById('showcaseCounter');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      cards.forEach((card, idx) => {
        const category = card.getAttribute('data-category');
        const matches = (filter === 'all' || category === filter);

        if (matches) {
          card.style.display = 'flex';
          card.style.setProperty('--stagger', (visibleCount % 3));
          visibleCount++;
          // Re-trigger entrance animation gracefully
          requestAnimationFrame(() => {
            card.classList.add('in-view');
          });
        } else {
          card.style.display = 'none';
        }
      });

      if (counterEl) {
        counterEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'Item' : 'Items'}`;
      }
    });
  });
}
