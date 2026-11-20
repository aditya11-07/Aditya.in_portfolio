/**
 * Aditya Pandey Portfolio - Continuously Animated, Interactive 3D Floating Image Gallery
 * Deep-Space Z-Axis Floating Gallery Engine
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * CONFIGURATION GUIDE:
 * ═══════════════════════════════════════════════════════════════════════════
 * - SPEED:             Base forward travel speed (px per frame). Default: 2.2
 * - HOVER_SPEED:       Slowed-down speed when hovering over any card. Default: 0.35
 * - DEPTH:             Total depth of the 3D Z-axis corridor. Default: 2500
 * - PERSPECTIVE:       3D camera perspective distance in px. Default: 1200
 * - STAR_COUNT:        Number of background stars in the cosmic void. Default: 220
 * - DRAG_SENSITIVITY:  Drag / orbit responsiveness factor. Default: 0.85
 * - WHEEL_SENSITIVITY: Scroll wheel zoom responsiveness factor. Default: 0.22
 * - CARD_WIDTH:        Width of each project card in px. Default: 310
 * - CARD_HEIGHT:       Height of each project card in px. Default: 195
 * - PROJECTS:          Array of project cards (image, title, tag, category, desc, link)
 */

export const CONFIG = {
  SPEED: 2.2,
  HOVER_SPEED: 0.35,
  DEPTH: 2500,
  PERSPECTIVE: 1200,
  STAR_COUNT: 220,
  DRAG_SENSITIVITY: 0.85,
  WHEEL_SENSITIVITY: 0.22,
  CARD_WIDTH: 310,
  CARD_HEIGHT: 195,
  PROJECTS: [
    {
      id: "float-01",
      title: "TRISHUL II Sounding Rocket & Integration",
      category: "Aerospace Avionics",
      tag: "IN-SPACe National Finalist",
      image: "/images/gallery/gallery-10.jpg",
      desc: "Aditya with the TRISHUL II sounding rocket and 1 kg CAN-7USAT payload at Narayani Launch Pad, Kushinagar.",
      tech: ["ESP32-S3", "BMP390", "BNO085", "GNSS", "LoRa 433MHz"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-02",
      title: "National Space Day Quiz Certification",
      category: "ISRO & Govt. Certification",
      tag: "Certified by ISRO Chairman",
      image: "/images/gallery/gallery-02.jpg",
      desc: "Certified by Dr. S. Somanath (Chairman ISRO & Secretary, Department of Space) for excellence in space science.",
      tech: ["ISRO", "Department of Space", "MyGov", "National Space Day"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-03",
      title: "IN-SPACe Grand Finale National Felicitation",
      category: "National Competition",
      tag: "Stage Felicitation",
      image: "/images/gallery/gallery-07.jpg",
      desc: "Vyomnauts team honored on stage among 115 registered teams nationwide after qualifying both PDR & CDR.",
      tech: ["PDR Qualified", "CDR Qualified", "ISRO Scientists Panel"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-04",
      title: "Vyomnauts Team at TRISHUL II Launcher",
      category: "Launch Operations",
      tag: "Launch Pad Operations",
      image: "/images/gallery/gallery-09.jpg",
      desc: "Student aerospace division assembling flight hardware at the Narayani Model Rocketry Launch Pad.",
      tech: ["Narayani Launch Pad", "Avionics Bay", "Recovery Chutes"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-05",
      title: "Field Launch Rail & Sounding Rocket",
      category: "Field Hardware",
      tag: "Launch Rail Calibration",
      image: "/images/gallery/gallery-11.jpg",
      desc: "Sounding rocket mounting, azimuth alignment, and sensor calibration beside the launch rail tripod.",
      tech: ["Launch Tripod", "Rail Alignment", "Pre-Flight Checklist"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-06",
      title: "The Jam Spot Event — Media Coverage",
      category: "Leadership & Media",
      tag: "Press Feature & Co-Founder",
      image: "/images/gallery/gallery-12.jpg",
      desc: "Sultanpur print newspaper feature covering the youth open-mic cultural community co-founded by Aditya Pandey.",
      tech: ["Co-Founder", "Media Feature", "Event Management"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-07",
      title: "CAN-7USAT (7U Satellite Payload)",
      category: "Aerospace Payload",
      tag: "CanSat 7U Architecture",
      image: "/images/CAN7USAT.png",
      desc: "Autonomous 1 kg CanSat payload with dual-stage parachute recovery, GNSS tracking, and live telemetry broadcast.",
      tech: ["7U Architecture", "ESP32-S3", "BNO085 9-DOF", "BMP390"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-08",
      title: "Ground Control Station (GCS) Telemetry",
      category: "Software & Systems",
      tag: "Full-Stack Telemetry",
      image: "/images/schematic.png",
      desc: "Web-based ground station for live packet decoding, trajectory graphing, and SQLite flight telemetry logging.",
      tech: ["Python", "JavaScript", "Docker", "SQLite", "LoRa / XBee"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-09",
      title: "Smart Hovercraft for Flood Rescue",
      category: "Robotics & Hardware",
      tag: "Amphibious Drone",
      image: "/images/Hovercraft.jpeg",
      desc: "High-RPM BLDC thrust lift hovercraft prototype engineered for shallow water flood rescue missions.",
      tech: ["ESP32", "BLDC Thrust Motors", "30A ESC", "Bluetooth"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-10",
      title: "Pariksha Pe Charcha 2024 Certification",
      category: "Education & Leadership",
      tag: "Ministry of Education",
      image: "/images/gallery/gallery-04.jpg",
      desc: "Certified by the National Council of Educational Research and Training (NCERT) and Ministry of Education.",
      tech: ["NCERT", "Ministry of Education", "National Certificate"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-11",
      title: "Swachh Bharat Mission Grameen Quiz",
      category: "Govt. of India Certification",
      tag: "Ministry of Jal Shakti",
      image: "/images/gallery/gallery-03.jpg",
      desc: "National participation qualification awarded by Department of Drinking Water and Sanitation & MyGov.",
      tech: ["Ministry of Jal Shakti", "DDWS", "MyGov"],
      link: "https://github.com/aditya11-07"
    },
    {
      id: "float-12",
      title: "Team Leader — PSIT Rocketry Uniform",
      category: "Student Leadership",
      tag: "Lead Avionics Engineer",
      image: "/images/gallery/gallery-08.jpg",
      desc: "Aditya heading avionics engineering, telemetry architecture, and flight qualification for PSIT Vyomnauts.",
      tech: ["Team Leader", "Avionics Head", "PDR & CDR Defense"],
      link: "https://github.com/aditya11-07"
    }
  ]
};

export function initFloatingGallery() {
  const container = document.getElementById('floatingViewport');
  const stageWrap = document.getElementById('floatingStageWrap');
  const stage = document.getElementById('floatingStage');
  const canvas = document.getElementById('floatingStarsCanvas');

  if (!container || !stage || !canvas) return;

  // 1. Accessibility check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Setup Multi-Depth Starfield Particle Canvas
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

  // 3. Setup Distributed 3D Cards Pool
  stage.innerHTML = '';
  const cards = [];
  const itemCount = CONFIG.PROJECTS.length;
  const zStep = CONFIG.DEPTH / itemCount;

  // 12 spread-out orbital corridors around the center vanishing point
  // Alternating radii ensure zero visual stacking across all 4 quadrants
  CONFIG.PROJECTS.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'floating-card';
    el.setAttribute('data-id', item.id);
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Project: ${item.title}`);
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
              <span class="floating-card-cat mono">${item.category}</span>
              <span class="floating-card-btn mono">
                <span>View Details</span>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Orbital dispersion math (Golden Angle for organic quadrant spread)
    const angle = (index * (360 / itemCount) * Math.PI) / 180;
    const radius = 280 + (index % 3) * 75; // Varied radii: 280px, 355px, 430px
    const posX = Math.cos(angle) * radius * 1.45; // Widen for widescreen displays
    const posY = Math.sin(angle) * radius * 0.88;

    // Base Z: distributed from -DEPTH to 0
    const baseZ = -CONFIG.DEPTH + (index * zStep);

    // Subtle 3D perspective rotation tilt
    const rotX = (Math.random() - 0.5) * 8;
    const rotY = (Math.random() - 0.5) * 12;
    const rotZ = (Math.random() - 0.5) * 6;

    stage.appendChild(el);

    const cardObj = {
      el,
      item,
      baseX: posX,
      baseY: posY,
      z: baseZ,
      rotX,
      rotY,
      rotZ,
      isHovered: false
    };

    // Hover slowdown & focus
    el.addEventListener('mouseenter', () => {
      cardObj.isHovered = true;
      isAnyCardHovered = true;
    });

    el.addEventListener('mouseleave', () => {
      cardObj.isHovered = false;
      isAnyCardHovered = false;
    });

    // Lightbox Modal expansion on Click or Enter key
    const openModal = () => {
      const modal = document.getElementById('portfolioModal');
      if (modal) {
        const modalImg = modal.querySelector('.portfolio-modal-body img');
        const modalTitle = modal.querySelector('.portfolio-modal-title');
        const modalDownload = modal.querySelector('.portfolio-modal-footer a');
        if (modalImg) modalImg.src = item.image;
        if (modalTitle) modalTitle.textContent = `${item.title} — ${item.tag}`;
        if (modalDownload) {
          modalDownload.href = item.image;
          modalDownload.download = item.image.split('/').pop();
          modalDownload.textContent = 'View Fullsize ↗';
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
  });

  // 4. Interactive Controls: Drag / Pan to Move, Scroll Zoom, & Cursor Parallax
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
  let isAnyCardHovered = false;

  // Pointer / Mouse / Touch Drag Events
  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    container.style.cursor = 'grabbing';
  });

  window.addEventListener('pointermove', (e) => {
    // A. Cursor Parallax Tilt (when not dragging)
    const rect = container.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      mouseNormX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseNormY = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = -mouseNormY * 4.0;
      targetTiltY = mouseNormX * 4.5;
    }

    // B. Drag Pan & Orbit Movement
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

  // Scroll / Wheel Zoom Interaction
  container.addEventListener('wheel', (e) => {
    wheelVelZ += e.deltaY * -CONFIG.WHEEL_SENSITIVITY;
    // Cap wheel velocity for smooth control
    wheelVelZ = Math.max(-20, Math.min(20, wheelVelZ));
  }, { passive: true });

  window.addEventListener('resize', () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  });

  // 5. 60fps GPU Animation Loop
  const Z_MIN = -CONFIG.DEPTH;
  const Z_MAX = 460;
  let ambientTime = 0;

  function animate() {
    requestAnimationFrame(animate);

    if (prefersReducedMotion) return;

    ambientTime += 0.015;

    // Inertia damping for drag camera movement
    cameraVelX *= 0.92;
    cameraVelY *= 0.92;
    cameraX += cameraVelX;
    cameraY += cameraVelY;

    // Gentle camera recentering so space remains anchored
    cameraX *= 0.99;
    cameraY *= 0.99;

    // Lerp cursor tilt
    currentTiltX += (targetTiltX - currentTiltX) * 0.07;
    currentTiltY += (targetTiltY - currentTiltY) * 0.07;

    // Wheel zoom inertia damping
    wheelVelZ *= 0.91;

    // Compute dynamic forward travel speed
    const baseForward = isAnyCardHovered ? CONFIG.HOVER_SPEED : CONFIG.SPEED;
    const forwardStep = baseForward + wheelVelZ;

    // A. Render Multi-Depth Starfield Canvas
    ctx.clearRect(0, 0, width, height);
    const starSpeed = isAnyCardHovered ? 0.4 : (Math.abs(forwardStep) * 1.5 + 1.0);

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
      const px = width / 2 + (star.x + cameraX * 0.3) * k;
      const py = height / 2 + (star.y + cameraY * 0.3) * k;

      const pk = f / (f + star.prevZ);
      const prevX = width / 2 + (star.x + cameraX * 0.3) * pk;
      const prevY = height / 2 + (star.y + cameraY * 0.3) * pk;

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

    // B. Apply Camera Pan & Tilt to 3D Stage
    stageWrap.style.transform = `translate3d(${cameraX.toFixed(1)}px, ${cameraY.toFixed(1)}px, 0) rotateX(${(currentTiltX + cameraY * 0.04).toFixed(2)}deg) rotateY(${(currentTiltY + cameraX * 0.04).toFixed(2)}deg)`;

    // C. Position & Animate Each Floating 3D Card
    cards.forEach(card => {
      // Advance forward in 3D Z-space
      card.z += forwardStep;

      // When card passes the camera plane, seamless loop back to deep background
      if (card.z > Z_MAX) {
        card.z = Z_MIN + (Math.random() * 120 - 60);
      } else if (card.z < Z_MIN) {
        card.z = Z_MAX;
      }

      // Depth Fog & Color Transition Math:
      // 1. Distant (Z < -1300): Dimmed, desaturated (grayscale), soft depth blur
      // 2. Mid-ground (-900 to +80): Full vibrant color, 100% contrast, crisp 0px blur
      // 3. Near camera exit (+80 to +460): Smooth fade out without abrupt popping
      let opacity = 1;
      let desaturate = 0;
      let blurPx = 0;
      let brightness = 1;

      if (card.z < -1300) {
        // Deep background fade-in
        opacity = Math.max(0, Math.min(1, (card.z - Z_MIN) / 750));
        desaturate = Math.min(80, (Math.abs(card.z + 1300) / 14));
        brightness = Math.max(0.48, 1 - (Math.abs(card.z + 1300) / 2000));
        blurPx = Math.min(4.5, Math.abs(card.z + 1300) / 280);
      } else if (card.z > 80) {
        // Smooth exit plane fade-out as card passes camera
        opacity = Math.max(0, 1 - (card.z - 80) / (Z_MAX - 80));
        blurPx = Math.min(4.5, (card.z - 80) / 70);
      } else {
        // Mid-ground peak focus
        opacity = 1;
        desaturate = 0;
        brightness = 1;
        blurPx = 0;
      }

      // If hovered: bring to 100% crisp full-color focus immediately
      if (card.isHovered) {
        opacity = 1;
        desaturate = 0;
        brightness = 1.08;
        blurPx = 0;
      }

      // Subtle ambient floating drift
      const idleFloatY = Math.sin(ambientTime + card.baseX) * 8;

      // GPU-accelerated transform: translate3d + perspective rotation
      card.el.style.transform = `translate3d(${card.baseX.toFixed(1)}px, ${(card.baseY + idleFloatY).toFixed(1)}px, ${card.z.toFixed(1)}px) rotateX(${card.rotX}deg) rotateY(${card.rotY}deg) rotateZ(${card.rotZ}deg)`;
      card.el.style.opacity = opacity.toFixed(3);
      card.el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';

      if (!card.isHovered) {
        const blurStr = blurPx > 0.4 ? ` blur(${blurPx.toFixed(1)}px)` : '';
        const filterStr = `grayscale(${desaturate.toFixed(0)}%) brightness(${brightness.toFixed(2)})${blurStr}`;
        card.el.style.filter = filterStr;
        card.el.style.webkitFilter = filterStr;
      } else {
        card.el.style.filter = 'grayscale(0%) brightness(1.06) blur(0px)';
        card.el.style.webkitFilter = 'grayscale(0%) brightness(1.06) blur(0px)';
      }
    });
  }

  requestAnimationFrame(animate);
}
