/**
 * Aditya Pandey Portfolio - Dynamic Visual Vault
 * Atmospheric Monochrome Floating Gallery with Interactive Full-Spectrum Reveal
 *
 * Requirements fulfilled:
 * - Strictly ONLY Aditya Pandey's certificates and authentic photos.
 * - Scattered random paths: images emerge from everywhere across the canvas (not from center)
 *   and drift along independent random velocity vectors.
 * - Monochrome black-and-white + atmospheric depth blur by default.
 * - Touch / Hover interaction reveals full-spectrum color, removes blur, and blooms into focus.
 * - Strictly bounded inside the showcase box (overflow: hidden, zero content leakage).
 * - Dense and fast continuous 60fps GPU animation loop with drag pan, wheel zoom, and parallax.
 */

export const CONFIG = {
  SPEED: 3.2,              // Base forward speed (px per frame)
  HOVER_SPEED: 0.25,       // Decelerated speed when hovering or touching an image
  DEPTH: 2300,             // Total Z-corridor depth
  PERSPECTIVE: 1200,       // 3D perspective distance
  STAR_COUNT: 210,         // Ambient cosmic void particles
  DRAG_SENSITIVITY: 0.85,  // Camera orbit responsiveness
  WHEEL_SENSITIVITY: 0.25, // Scroll zoom responsiveness
  CARD_WIDTH: 310,
  CARD_HEIGHT: 195,
  POOL_SIZE: 16,           // Number of simultaneous active floating cards in the stream
  PROJECTS: [
    {
      id: "vault-01",
      title: "The Jam Spot — Youth Open-Mic & Poetry",
      category: "Cultural Leadership",
      tag: "Co-Founder & Host",
      image: "/images/gallery/gallery-01.jpg",
      desc: "Aditya addressing the open-mic youth cultural movement in Sultanpur, fostering youth creative arts and public speaking.",
      org: "The Jam Spot Community",
      date: "Co-Founder"
    },
    {
      id: "vault-02",
      title: "National Space Day Quiz Certification",
      category: "ISRO & Govt. Certification",
      tag: "Certified by ISRO Chairman",
      image: "/images/gallery/gallery-02.jpg",
      desc: "Awarded by Dr. S. Somanath (Chairman ISRO & Secretary, Department of Space) and MyGov for excellence in space science.",
      org: "ISRO & Department of Space",
      date: "National Space Day"
    },
    {
      id: "vault-03",
      title: "Swachh Bharat Mission Grameen Phase-II",
      category: "Govt. of India Certification",
      tag: "Ministry of Jal Shakti",
      image: "/images/gallery/gallery-03.jpg",
      desc: "National participation qualification awarded by Department of Drinking Water and Sanitation (DDWS) & MyGov.",
      org: "Ministry of Jal Shakti & DDWS",
      date: "Phase-II National Drive"
    },
    {
      id: "vault-04",
      title: "Pariksha Pe Charcha 2024 Certification",
      category: "National Academic Milestone",
      tag: "Ministry of Education",
      image: "/images/gallery/gallery-04.jpg",
      desc: "Certified by Prof. Dinesh Prasad Saklani (Director, NCERT) and Ministry of Education for nationwide engagement.",
      org: "NCERT & Ministry of Education",
      date: "National Academic Drive"
    },
    {
      id: "vault-05",
      title: "Say Yes to Life, No to Drugs Pledge",
      category: "National Social Initiative",
      tag: "Narcotics Control Bureau",
      image: "/images/gallery/gallery-05.jpg",
      desc: "Official national pledge certification awarded by Ministry of Home Affairs and Narcotics Control Bureau (NCB) of India.",
      org: "Narcotics Control Bureau (MHA)",
      date: "January 6, 2024"
    },
    {
      id: "vault-06",
      title: "Digital Marketing Workshop Certification",
      category: "Executive Workshop",
      tag: "Wardiere Company Certification",
      image: "/images/gallery/gallery-06.jpg",
      desc: "Certified by Marceline Anderson (CEO of Wardiere) for participating in high-impact digital marketing & brand strategy.",
      org: "Wardiere Executive Workshop",
      date: "June 2025"
    },
    {
      id: "vault-07",
      title: "IN-SPACe Grand Finale National Felicitation",
      category: "National Competition",
      tag: "Stage Felicitation",
      image: "/images/gallery/gallery-07.jpg",
      desc: "PSIT Vyomnauts team honored on stage among 115 registered teams nationwide after qualifying both PDR & CDR.",
      org: "IN-SPACe / Department of Space",
      date: "National Finalist"
    },
    {
      id: "vault-08",
      title: "Field Launch Rail & Sounding Rocket Prototype",
      category: "Aerospace Field Operations",
      tag: "Launch Rail Calibration",
      image: "/images/gallery/gallery-08.jpg",
      desc: "Sounding rocket mounting, azimuth alignment, and avionics sensor calibration beside the field launch rail tripod.",
      org: "Vyomnauts Aerospace Lab",
      date: "Field Operations"
    },
    {
      id: "vault-09",
      title: "The Jam Spot Event — Newspaper Feature",
      category: "Press Feature & Leadership",
      tag: "Print Media Feature",
      image: "/images/gallery/gallery-09.jpg",
      desc: "Sultanpur print media coverage spotlighting the open-mic youth cultural movement co-founded by Aditya Pandey.",
      org: "Dainik Jagran / Amar Ujala Press",
      date: "Press Feature"
    },
    {
      id: "vault-10",
      title: "TRISHUL II Rocket Flight Hardware Integration",
      category: "Aerospace Avionics",
      tag: "IN-SPACe Flight Vehicle",
      image: "/images/gallery/gallery-10.jpg",
      desc: "Aditya with the TRISHUL II sounding rocket and 1 kg CAN-7USAT payload at Narayani Launch Pad, Kushinagar.",
      org: "IN-SPACe National Competition",
      date: "Flight Vehicle Integration"
    },
    {
      id: "vault-11",
      title: "Vyomnauts Team Launch Pad Operations",
      category: "Field Operations",
      tag: "Pad Pre-Flight Assembly",
      image: "/images/gallery/gallery-11.jpg",
      desc: "Student aerospace division assembling flight recovery hardware and telemetry nodes at Narayani Launch Pad.",
      org: "PSIT Vyomnauts",
      date: "Launch Pad Operations"
    },
    {
      id: "vault-12",
      title: "Space & Avionics Engineering Recognition",
      category: "Technical Recognition",
      tag: "Avionics Leadership",
      image: "/images/gallery/gallery-12.jpg",
      desc: "Engineering leadership recognition for dual-stage telemetry architecture, sensor integration, and launch operations.",
      org: "Department of Space & PSIT",
      date: "2024–2026"
    }
  ]
};

export function initFloatingGallery() {
  const container = document.getElementById('floatingViewport');
  const stageWrap = document.getElementById('floatingStageWrap');
  const stage = document.getElementById('floatingStage');
  const canvas = document.getElementById('floatingStarsCanvas');

  if (!container || !stage || !canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Particle Canvas Setup
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = container.clientWidth);
  let height = (canvas.height = container.clientHeight);

  const stars = [];
  for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 2.8,
      y: (Math.random() - 0.5) * height * 2.8,
      z: Math.random() * 2000,
      prevZ: 0,
      size: Math.random() * 1.5 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.2
    });
  }

  // 2. Setup 3D Cards Pool with Random Distributed Spawn & Trajectories
  stage.innerHTML = '';
  const cards = [];
  const totalCards = CONFIG.POOL_SIZE;
  const zStep = CONFIG.DEPTH / totalCards;
  let isAnyCardHovered = false;

  // Helper: generate random spawn coordinates and velocities across the stage
  function generateRandomTrajectory(isInitial, index) {
    // Spread across the full bounds of the stage container
    const spawnX = (Math.random() - 0.5) * Math.max(width * 1.5, 900);
    const spawnY = (Math.random() - 0.5) * Math.max(height * 1.3, 650);

    // Random drift velocities (independent vectors for each card)
    const vx = (Math.random() - 0.5) * 1.5;
    const vy = (Math.random() - 0.5) * 1.1;

    // Angular orientation & subtle rotation drift
    const rotX = (Math.random() - 0.5) * 10;
    const rotY = (Math.random() - 0.5) * 14;
    const rotZ = (Math.random() - 0.5) * 8;
    const rotVelZ = (Math.random() - 0.5) * 0.03;

    // Ambient floating harmonic oscillation
    const driftRadius = Math.random() * 50 + 25;
    const driftSpeed = Math.random() * 0.015 + 0.008;
    const driftPhase = Math.random() * Math.PI * 2;

    const baseZ = isInitial
      ? -CONFIG.DEPTH + (index * zStep) + (Math.random() * 60 - 30)
      : -CONFIG.DEPTH - (Math.random() * 250);

    return {
      spawnX,
      spawnY,
      currentX: spawnX,
      currentY: spawnY,
      vx,
      vy,
      rotX,
      rotY,
      rotZ,
      rotVelZ,
      driftRadius,
      driftSpeed,
      driftPhase,
      z: baseZ
    };
  }

  // Build card elements
  for (let i = 0; i < totalCards; i++) {
    const item = CONFIG.PROJECTS[i % CONFIG.PROJECTS.length];
    const el = document.createElement('div');
    el.className = 'floating-card';
    el.setAttribute('data-id', item.id);
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Certificate or Milestone: ${item.title}`);
    el.style.width = `${CONFIG.CARD_WIDTH}px`;
    el.style.height = `${CONFIG.CARD_HEIGHT}px`;

    el.innerHTML = `
      <div class="floating-card-inner">
        <div class="floating-card-media">
          <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" />
          <div class="floating-card-overlay">
            <span class="floating-card-tag mono">${item.tag}</span>
            <h3 class="floating-card-title">${item.title}</h3>
            <p class="floating-card-desc">${item.desc}</p>
            <div class="floating-card-footer">
              <span class="floating-card-cat mono">${item.org}</span>
              <span class="floating-card-btn mono">
                <span>Inspect</span>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;

    stage.appendChild(el);

    const traj = generateRandomTrajectory(true, i);
    const cardObj = {
      el,
      item,
      ...traj,
      isHovered: false
    };

    // Hover & Touch Events: Transition from Monochrome to Full-Spectrum Color
    const activateColor = () => {
      // Clear other active touches
      cards.forEach(c => {
        if (c !== cardObj) {
          c.isHovered = false;
          c.el.classList.remove('active-touch');
        }
      });
      cardObj.isHovered = true;
      isAnyCardHovered = true;
      cardObj.el.classList.add('active-touch');
    };

    const deactivateColor = () => {
      cardObj.isHovered = false;
      cardObj.el.classList.remove('active-touch');
      isAnyCardHovered = cards.some(c => c.isHovered);
    };

    el.addEventListener('mouseenter', activateColor);
    el.addEventListener('mouseleave', deactivateColor);

    // Mobile / Touch support
    el.addEventListener('touchstart', (e) => {
      // Prevent drag trigger on direct card touch
      e.stopPropagation();
      activateColor();
    }, { passive: true });

    // Lightbox Modal Expansion
    const openModal = (e) => {
      if (e) e.stopPropagation();
      const modal = document.getElementById('galleryModalOverlay');
      if (modal) {
        const modalImg = document.getElementById('galleryModalImg');
        const modalTitle = document.getElementById('galleryModalTitle');
        const modalDesc = document.getElementById('galleryModalDesc');
        const modalTag = document.getElementById('galleryModalTag');
        const modalDownload = document.getElementById('galleryModalDownload');

        if (modalImg) modalImg.src = item.image;
        if (modalTitle) modalTitle.textContent = item.title;
        if (modalDesc) modalDesc.textContent = `${item.desc} — ${item.org} (${item.date})`;
        if (modalTag) modalTag.textContent = `${item.category} • ${item.tag}`;
        if (modalDownload) {
          modalDownload.href = item.image;
          modalDownload.download = item.image.split('/').pop();
        }

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };

    el.addEventListener('click', openModal);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });

    cards.push(cardObj);
  }

  // 3. Interactive Camera Drag / Orbit & Wheel Zoom
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let cameraX = 0;
  let cameraY = 0;
  let cameraVelX = 0;
  let cameraVelY = 0;

  let mouseNormX = 0;
  let mouseNormY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  let wheelVelZ = 0;

  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    container.style.cursor = 'grabbing';
  });

  window.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      mouseNormX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseNormY = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = -mouseNormY * 3.5;
      targetTiltY = mouseNormX * 4.0;
    }

    if (isDragging) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      startX = e.clientX;
      startY = e.clientY;

      cameraVelX = dx * CONFIG.DRAG_SENSITIVITY;
      cameraVelY = dy * CONFIG.DRAG_SENSITIVITY;
      cameraX += cameraVelX;
      cameraY += cameraVelY;
    }
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });

  window.addEventListener('pointercancel', () => {
    isDragging = false;
    container.style.cursor = 'grab';
  });

  // Touch outside cards deactivates active card touch state
  container.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.floating-card')) {
      cards.forEach(c => {
        c.isHovered = false;
        c.el.classList.remove('active-touch');
      });
      isAnyCardHovered = false;
    }
  }, { passive: true });

  // Scroll wheel zoom
  container.addEventListener('wheel', (e) => {
    wheelVelZ += e.deltaY * -CONFIG.WHEEL_SENSITIVITY;
    wheelVelZ = Math.max(-22, Math.min(22, wheelVelZ));
  }, { passive: true });

  window.addEventListener('resize', () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  });

  // 4. Continuous 60fps GPU-Accelerated Animation Loop
  const Z_MIN = -CONFIG.DEPTH;
  const Z_MAX = 380;
  let ambientTime = 0;

  function animate() {
    requestAnimationFrame(animate);

    if (prefersReducedMotion) return;

    ambientTime += 0.016;

    // Camera inertia damping
    cameraVelX *= 0.92;
    cameraVelY *= 0.92;
    cameraX += cameraVelX;
    cameraY += cameraVelY;
    cameraX *= 0.99;
    cameraY *= 0.99;

    // Tilt lerp
    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentTiltY += (targetTiltY - currentTiltY) * 0.08;

    // Wheel zoom inertia
    wheelVelZ *= 0.91;

    // Forward travel step (decelerates smoothly when inspecting a card)
    const baseForward = isAnyCardHovered ? CONFIG.HOVER_SPEED : CONFIG.SPEED;
    const forwardStep = baseForward + wheelVelZ;

    // A. Render Starfield Particles
    ctx.clearRect(0, 0, width, height);
    const starSpeed = isAnyCardHovered ? 0.35 : (Math.abs(forwardStep) * 1.4 + 0.8);

    stars.forEach(star => {
      star.prevZ = star.z;
      star.z -= starSpeed;
      if (star.z <= 0) {
        star.z = 2000;
        star.prevZ = 2000;
        star.x = (Math.random() - 0.5) * width * 2.8;
        star.y = (Math.random() - 0.5) * height * 2.8;
      }

      const f = 600;
      const k = f / (f + star.z);
      const px = width / 2 + (star.x + cameraX * 0.25) * k;
      const py = height / 2 + (star.y + cameraY * 0.25) * k;

      const pk = f / (f + star.prevZ);
      const prevX = width / 2 + (star.x + cameraX * 0.25) * pk;
      const prevY = height / 2 + (star.y + cameraY * 0.25) * pk;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const alpha = Math.min(1, Math.max(0, (2000 - star.z) / 900)) * star.baseAlpha;
        ctx.strokeStyle = `rgba(215, 230, 250, ${alpha.toFixed(2)})`;
        ctx.lineWidth = Math.max(0.6, star.size * k * 1.8);
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    });

    // B. Apply Camera Pan & Perspective Orbit
    stageWrap.style.transform = `translate3d(${cameraX.toFixed(1)}px, ${cameraY.toFixed(1)}px, 0) rotateX(${(currentTiltX + cameraY * 0.035).toFixed(2)}deg) rotateY(${(currentTiltY + cameraX * 0.035).toFixed(2)}deg)`;

    // C. Position & Animate Each Floating 3D Card along its Random Path
    cards.forEach(card => {
      card.z += forwardStep;

      // Update position along its independent velocity vector
      card.currentX += card.vx;
      card.currentY += card.vy;
      card.rotZ += card.rotVelZ;

      // Harmonic harmonic drift for organic fluid movement
      const harmonicX = Math.sin(ambientTime * card.driftSpeed + card.driftPhase) * card.driftRadius;
      const harmonicY = Math.cos(ambientTime * card.driftSpeed + card.driftPhase) * (card.driftRadius * 0.6);

      const renderX = card.currentX + harmonicX;
      const renderY = card.currentY + harmonicY;

      // Loop back when passing the viewer (z > Z_MAX) -> respawn at new random location
      if (card.z > Z_MAX) {
        const newTraj = generateRandomTrajectory(false, 0);
        Object.assign(card, newTraj);
      } else if (card.z < Z_MIN) {
        card.z = Z_MAX;
      }

      // Depth Atmosphere: Opacity & Visibility
      let opacity = 1;
      let depthBlur = 1.8;
      let depthBrightness = 0.72;

      if (card.z < -1400) {
        // Deep background fade-in
        opacity = Math.max(0, Math.min(1, (card.z - Z_MIN) / 750));
        depthBlur = Math.min(3.5, 1.8 + Math.abs(card.z + 1400) / 350);
        depthBrightness = Math.max(0.45, 0.72 - Math.abs(card.z + 1400) / 2500);
      } else if (card.z > 60) {
        // Exit plane fade-out before disappearing
        opacity = Math.max(0, 1 - (card.z - 60) / (Z_MAX - 60));
        depthBlur = Math.min(3.0, 1.8 + (card.z - 60) / 90);
      } else {
        opacity = 1;
        depthBlur = 1.8;
        depthBrightness = 0.72;
      }

      // Set transform: translate3d + individual tilt
      card.el.style.transform = `translate3d(${renderX.toFixed(1)}px, ${renderY.toFixed(1)}px, ${card.z.toFixed(1)}px) rotateX(${card.rotX.toFixed(1)}deg) rotateY(${card.rotY.toFixed(1)}deg) rotateZ(${card.rotZ.toFixed(1)}deg)`;
      card.el.style.opacity = opacity.toFixed(3);
      card.el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';

      // Default state: Black & White (grayscale 100%) and atmospheric depth blur
      // Hover / Touch state: Colorful (grayscale 0%), unblurred (blur 0px), glowing focus
      if (card.isHovered) {
        card.el.style.filter = 'grayscale(0%) blur(0px) brightness(1.1) contrast(1.05)';
        card.el.style.webkitFilter = 'grayscale(0%) blur(0px) brightness(1.1) contrast(1.05)';
        card.el.style.zIndex = '999';
      } else {
        const filterStr = `grayscale(100%) blur(${depthBlur.toFixed(1)}px) brightness(${depthBrightness.toFixed(2)}) contrast(1.1)`;
        card.el.style.filter = filterStr;
        card.el.style.webkitFilter = filterStr;
        card.el.style.zIndex = '1';
      }
    });
  }

  requestAnimationFrame(animate);
}
