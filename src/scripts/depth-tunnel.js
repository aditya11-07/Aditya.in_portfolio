/**
 * Aditya Pandey Portfolio - 3D Depth-Tunnel / Z-Axis Parallax Showcase
 * Inspired by deep-space floating galleries.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * CONFIGURATION GUIDE (Tweak tunnel depth, scroll speed, stars, & dimensions):
 * ═══════════════════════════════════════════════════════════════════════════
 * - perspective:        3D field-of-view distance in px (1000px - 1400px)
 * - tunnelDepth:        Total travel depth along Z-axis in px (e.g., 2800)
 * - scrollTrackHeightVh: Height of the native scroll track in vh (e.g., 320vh = ~3.2 screens of scroll)
 * - starCount:          Number of particle stars in the cosmic void
 * - ambientDriftSpeed:  Gentle idle floating drift speed when scroll is paused
 * - maxTiltAngle:       Maximum mouse parallax tilt angle in degrees (2 - 4 deg)
 * - tunnelProjects:     Array of items with title, category, tag, image, desc, tech, link
 */

export const TUNNEL_CONFIG = {
  perspective: 1200,          // 3D perspective distance in px
  tunnelDepth: 2800,          // Total depth of Z-axis tunnel in px
  scrollTrackHeightVh: 320,   // Scroll duration in vh (higher = slower, more cinematic scroll)
  starCount: 220,             // Number of stars in the background void
  ambientDriftSpeed: 0.18,    // Gentle ambient floating speed
  maxTiltAngle: 3.5,          // Mouse-move parallax tilt angle in degrees
  cardWidth: 320,             // Base width of 3D cards in px
  cardHeight: 200             // Base height of 3D cards in px
};

export const tunnelProjects = [
  {
    id: "tunnel-01",
    title: "TRISHUL II Sounding Rocket & Integration",
    category: "Aerospace Avionics",
    tag: "IN-SPACe National Finalist",
    image: "/images/gallery/gallery-10.jpg",
    desc: "Aditya with the TRISHUL II sounding rocket and 1 kg CAN-7USAT payload at Narayani Launch Pad, Kushinagar.",
    tech: ["ESP32-S3", "BMP390", "BNO085", "GNSS", "LoRa 433MHz", "XBee"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-02",
    title: "National Space Day Quiz Certification",
    category: "ISRO & Govt. Certification",
    tag: "Certified by ISRO Chairman",
    image: "/images/gallery/gallery-02.jpg",
    desc: "Certified by Dr. S. Somanath (Chairman ISRO & Secretary, Department of Space) for excellence in space science.",
    tech: ["ISRO", "Department of Space", "MyGov", "National Space Day 2024"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-03",
    title: "IN-SPACe Grand Finale National Felicitation",
    category: "National Competition",
    tag: "Stage Felicitation",
    image: "/images/gallery/gallery-07.jpg",
    desc: "Vyomnauts team honored on stage among 115 registered teams nationwide after qualifying PDR & CDR.",
    tech: ["PDR Qualified", "CDR Qualified", "ISRO Scientists Panel", "1000m Apogee"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-04",
    title: "Vyomnauts Team at TRISHUL II Launcher",
    category: "Launch Operations",
    tag: "Launch Pad Operations",
    image: "/images/gallery/gallery-09.jpg",
    desc: "Aerospace student division assembling flight hardware at the Narayani Model Rocketry Launch Pad.",
    tech: ["Narayani Launch Pad", "Avionics Bay", "Recovery Chutes", "Telemetry"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-05",
    title: "Field Launch Rail & Sounding Rocket",
    category: "Field Hardware",
    tag: "Launch Rail Calibration",
    image: "/images/gallery/gallery-11.jpg",
    desc: "Sounding rocket mounting, azimuth alignment, and sensor calibration beside the launch rail tripod.",
    tech: ["Launch Tripod", "Rail Alignment", "Pre-Flight Checklist", "Dual Deployment"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-06",
    title: "The Jam Spot Event — Media Coverage",
    category: "Leadership & Media",
    tag: "Press Feature & Co-Founder",
    image: "/images/gallery/gallery-12.jpg",
    desc: "Sultanpur print newspaper feature covering the youth open-mic cultural community co-founded by Aditya Pandey.",
    tech: ["Co-Founder", "Media Feature", "Event Management", "Youth Leadership"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-07",
    title: "CAN-7USAT (7U Satellite Payload)",
    category: "Aerospace Payload",
    tag: "CanSat 7U Architecture",
    image: "/images/CAN7USAT.png",
    desc: "Autonomous 1 kg CanSat payload with dual-stage parachute recovery, GNSS tracking, and live telemetry broadcast.",
    tech: ["7U Architecture", "ESP32-S3", "BNO085 9-DOF", "BMP390", "INA226"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-08",
    title: "Ground Control Station (GCS) Telemetry",
    category: "Software & Systems",
    tag: "Full-Stack Telemetry",
    image: "/images/schematic.png",
    desc: "Web-based ground station for live packet decoding, trajectory graphing, and SQLite flight telemetry logging.",
    tech: ["Python", "JavaScript", "Docker", "SQLite", "LoRa / XBee Streams"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-09",
    title: "Smart Hovercraft for Flood Rescue",
    category: "Robotics & Hardware",
    tag: "Amphibious Drone",
    image: "/images/Hovercraft.jpeg",
    desc: "High-RPM BLDC thrust lift hovercraft prototype engineered for shallow water flood rescue missions.",
    tech: ["ESP32", "BLDC Thrust Motors", "30A ESC", "Bluetooth Controller"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-10",
    title: "Pariksha Pe Charcha 2024 Certification",
    category: "Education & Leadership",
    tag: "Ministry of Education",
    image: "/images/gallery/gallery-04.jpg",
    desc: "Certified by the National Council of Educational Research and Training (NCERT) and Ministry of Education.",
    tech: ["NCERT", "Ministry of Education", "National Initiative", "Certificate"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-11",
    title: "Swachh Bharat Mission Grameen Quiz",
    category: "Govt. of India Certification",
    tag: "Ministry of Jal Shakti",
    image: "/images/gallery/gallery-03.jpg",
    desc: "National participation qualification awarded by Department of Drinking Water and Sanitation & MyGov.",
    tech: ["Ministry of Jal Shakti", "DDWS", "MyGov", "National Award"],
    link: "https://github.com/aditya11-07"
  },
  {
    id: "tunnel-12",
    title: "Team Leader — PSIT Rocketry Uniform",
    category: "Student Leadership",
    tag: "Lead Avionics Engineer",
    image: "/images/gallery/gallery-08.jpg",
    desc: "Aditya heading avionics engineering, telemetry architecture, and flight qualification for PSIT Vyomnauts.",
    tech: ["Team Leader", "Avionics Head", "PDR & CDR Defense", "Embedded Systems"],
    link: "https://github.com/aditya11-07"
  }
];

export function initDepthTunnel() {
  const section = document.getElementById('showcase');
  const track = document.getElementById('tunnelTrack');
  const stage = document.getElementById('tunnelStage');
  const stageWrap = document.getElementById('tunnelStageWrap');
  const canvas = document.getElementById('tunnelStarsCanvas');
  const depthMetric = document.getElementById('tunnelDepthMetric');
  const progressFill = document.getElementById('tunnelProgressFill');
  const staticFallback = document.getElementById('tunnelStaticFallback');

  if (!section || !track || !stage) return;

  // 1. Accessibility: Handle prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    if (staticFallback) {
      staticFallback.innerHTML = tunnelProjects.map(item => `
        <article class="tunnel-static-card" tabindex="0" role="button" data-id="${item.id}">
          <div class="tunnel-static-media">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
          </div>
          <div class="tunnel-static-body">
            <span class="tunnel-card-tag mono">${item.tag}</span>
            <h3 class="tunnel-card-title">${item.title}</h3>
            <p class="tunnel-card-desc">${item.desc}</p>
          </div>
        </article>
      `).join('');
    }
    return;
  }

  // 2. Setup Multi-Layered Starfield Particle Canvas
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  const ctx = canvas ? canvas.getContext('2d') : null;

  const stars = [];
  for (let i = 0; i < TUNNEL_CONFIG.starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 2.6,
      y: (Math.random() - 0.5) * height * 2.6,
      z: Math.random() * 2000,
      prevZ: 0,
      size: Math.random() * 1.6 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.2
    });
  }

  // 3. Setup 3D Cards using Golden-Ratio Spiral Quadrant Placement
  stage.innerHTML = '';
  const cards = [];
  const itemCount = tunnelProjects.length;
  const zStep = TUNNEL_CONFIG.tunnelDepth / itemCount;

  // Golden ratio angle (137.5 degrees) for optimal quadrant dispersion
  const GOLDEN_ANGLE = 137.507764 * (Math.PI / 180);

  tunnelProjects.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'tunnel-card';
    el.setAttribute('data-id', item.id);
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Project: ${item.title}`);

    el.innerHTML = `
      <div class="tunnel-card-inner">
        <div class="tunnel-card-media">
          <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" />
          <div class="tunnel-card-overlay">
            <span class="tunnel-card-tag mono">${item.tag}</span>
            <h3 class="tunnel-card-title">${item.title}</h3>
            <p class="tunnel-card-desc">${item.desc}</p>
            <div class="tunnel-card-footer">
              <span class="tunnel-card-cat mono">${item.category}</span>
              <span class="tunnel-card-btn mono">
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

    // Golden Ratio Spiral Coordinates
    const angle = index * GOLDEN_ANGLE;
    // Vary radius cyclically across 4 depth tiers for deep visual variety
    const radius = 280 + (index % 4) * 80;
    // Widen horizontally by 1.45 to fill 16:9 widescreen viewports naturally
    const posX = Math.cos(angle) * radius * 1.45;
    const posY = Math.sin(angle) * radius * 0.85;

    // Base Z: distributed from -tunnelDepth up to 0
    const baseZ = -TUNNEL_CONFIG.tunnelDepth + (index * zStep);

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
      baseZ: baseZ,
      currentZ: baseZ,
      rotX,
      rotY,
      rotZ,
      isHovered: false
    };

    // Card Hover Interactions
    el.addEventListener('mouseenter', () => {
      cardObj.isHovered = true;
      isAnyCardHovered = true;
    });

    el.addEventListener('mouseleave', () => {
      cardObj.isHovered = false;
      isAnyCardHovered = false;
    });

    // Lightbox Modal trigger on click or Enter key
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

  // 4. Scroll Tracking & Smooth Interpolation (Lerp)
  let targetProgress = 0;
  let currentProgress = 0;
  let isAnyCardHovered = false;

  function onScroll() {
    const rect = track.getBoundingClientRect();
    const trackHeight = track.offsetHeight - window.innerHeight;
    if (trackHeight <= 0) return;

    // Calculate progression through the 320vh track from 0.0 to 1.0
    const rawProgress = -rect.top / trackHeight;
    targetProgress = Math.max(0, Math.min(1, rawProgress));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 5. Mouse Parallax Tilt (~2–4 degrees)
  let targetTiltX = 0;
  let targetTiltY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;

    // Tilt opposite to mouse for natural depth parallax
    targetTiltX = -ny * TUNNEL_CONFIG.maxTiltAngle;
    targetTiltY = nx * TUNNEL_CONFIG.maxTiltAngle * 1.2;
  });

  window.addEventListener('resize', () => {
    if (canvas) {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
  });

  // 6. Main 60fps GPU Animation Loop
  let idleTime = 0;
  let prevScrollProgress = 0;

  function animate() {
    requestAnimationFrame(animate);

    // Smooth Lerp for Scroll Progress
    currentProgress += (targetProgress - currentProgress) * 0.08;

    // Smooth Lerp for Mouse Parallax Tilt
    currentTiltX += (targetTiltX - currentTiltX) * 0.06;
    currentTiltY += (targetTiltY - currentTiltY) * 0.06;

    // Gentle ambient idle floating drift
    idleTime += TUNNEL_CONFIG.ambientDriftSpeed;
    const idleOffset = Math.sin(idleTime * 0.015) * 30;

    // Scroll speed delta (for star streaks)
    const scrollDelta = Math.abs(currentProgress - prevScrollProgress);
    prevScrollProgress = currentProgress;

    // A. Render Multi-Layered Stars Canvas
    if (ctx) {
      ctx.clearRect(0, 0, width, height);

      const starSpeed = isAnyCardHovered ? 0.3 : (scrollDelta * 180 + 1.2);

      stars.forEach(star => {
        star.prevZ = star.z;
        star.z -= starSpeed;
        if (star.z <= 0) {
          star.z = 2000;
          star.prevZ = 2000;
          star.x = (Math.random() - 0.5) * width * 2.6;
          star.y = (Math.random() - 0.5) * height * 2.6;
        }

        const f = 600;
        const k = f / (f + star.z);
        const px = width / 2 + (star.x + currentTiltY * 25) * k;
        const py = height / 2 + (star.y - currentTiltX * 25) * k;

        const pk = f / (f + star.prevZ);
        const prevX = width / 2 + (star.x + currentTiltY * 25) * pk;
        const prevY = height / 2 + (star.y - currentTiltX * 25) * pk;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, Math.max(0, (2000 - star.z) / 900)) * star.baseAlpha;
          ctx.strokeStyle = `rgba(215, 228, 245, ${alpha.toFixed(2)})`;
          ctx.lineWidth = Math.max(0.6, star.size * k * 1.8);
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      });
    }

    // B. Apply Mouse Parallax Tilt to 3D Perspective Stage
    if (stageWrap) {
      stageWrap.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
    }

    // C. Position & Render Each 3D Card
    const totalTravel = TUNNEL_CONFIG.tunnelDepth;
    const Z_ENTRY_MIN = -totalTravel;
    const Z_EXIT_MAX = 420;

    cards.forEach(card => {
      // Calculate effective Z: initial baseZ + travel driven by scroll + idle drift
      let z = card.baseZ + (currentProgress * totalTravel) + idleOffset;

      // Wrap around for seamless infinite tunnel loop
      const span = totalTravel + (Z_EXIT_MAX - Z_ENTRY_MIN);
      while (z > Z_EXIT_MAX) z -= totalTravel;
      while (z < Z_ENTRY_MIN) z += totalTravel;

      card.currentZ = z;

      // Depth-of-Field Atmosphere:
      // 1. Distant cards (-2800px to -1400px): Dimmed, desaturated haze
      // 2. Mid-ground (-1000px to +80px): Peak contrast, crisp sharpness, full color
      // 3. Near camera exit plane (+80px to +420px): Smooth fade-out past screen
      let opacity = 1;
      let desaturate = 0;
      let blurPx = 0;
      let brightness = 1;

      if (z < -1400) {
        // Far field fade-in from deep void
        opacity = Math.max(0, Math.min(1, (z - Z_ENTRY_MIN) / 800));
        desaturate = Math.min(80, (Math.abs(z + 1400) / 12));
        brightness = Math.max(0.45, 1 - (Math.abs(z + 1400) / 2200));
        blurPx = Math.min(4.5, Math.abs(z + 1400) / 280);
      } else if (z > 80) {
        // Smooth exit plane fade-out as card passes camera
        opacity = Math.max(0, 1 - (z - 80) / (Z_EXIT_MAX - 80));
        blurPx = Math.min(5, (z - 80) / 60);
      } else {
        // Peak mid-ground clarity
        opacity = 1;
        desaturate = 0;
        brightness = 1;
        blurPx = 0;
      }

      // If card is hovered, pause its drift and bring to 100% crisp full-color focus
      if (card.isHovered) {
        opacity = 1;
        desaturate = 0;
        brightness = 1.08;
        blurPx = 0;
      }

      // GPU-accelerated translate3d and rotation
      const curX = card.baseX;
      const curY = card.baseY;

      card.el.style.transform = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${card.rotX}deg) rotateY(${card.rotY}deg) rotateZ(${card.rotZ}deg)`;
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

    // D. Update HUD Depth Metrics
    if (depthMetric) {
      const depthVal = Math.round(-TUNNEL_CONFIG.tunnelDepth + (currentProgress * TUNNEL_CONFIG.tunnelDepth));
      depthMetric.textContent = `${depthVal}m`;
    }

    if (progressFill) {
      progressFill.style.width = `${(currentProgress * 100).toFixed(1)}%`;
    }
  }

  requestAnimationFrame(animate);
}
