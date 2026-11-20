/**
 * Aditya Pandey Portfolio - 3D Warp Flight Stream (High-Density & High-Speed)
 * Recreates the dense cosmic warp fly-through gallery
 * Features 12 verified photographs & newspaper coverage flying in 3D perspective space
 */

export const flightGalleryData = [
  {
    id: "gallery-01",
    src: "/images/gallery/gallery-01.jpg",
    title: "Public Address & Debate Stage",
    tag: "LEADERSHIP & SPEECH",
    desc: "School leadership, debate address, and student communication."
  },
  {
    id: "gallery-02",
    src: "/images/gallery/gallery-02.jpg",
    title: "National Space Day Quiz Certification",
    tag: "ISRO & MYGOV",
    desc: "Certified by Dr. S. Somanath (Chairman ISRO & Secretary DoS)."
  },
  {
    id: "gallery-03",
    src: "/images/gallery/gallery-03.jpg",
    title: "Swachh Bharat Mission Grameen Quiz",
    tag: "GOVT. OF INDIA",
    desc: "Ministry of Jal Shakti & MyGov Certification."
  },
  {
    id: "gallery-04",
    src: "/images/gallery/gallery-04.jpg",
    title: "Pariksha Pe Charcha 2024 Certification",
    tag: "MINISTRY OF EDUCATION",
    desc: "National Council of Educational Research and Training (NCERT)."
  },
  {
    id: "gallery-05",
    src: "/images/gallery/gallery-05.jpg",
    title: "Narcotics Control Bureau Pledge",
    tag: "MINISTRY OF HOME AFFAIRS",
    desc: "National pledge and conscious youth leadership certification."
  },
  {
    id: "gallery-06",
    src: "/images/gallery/gallery-06.jpg",
    title: "Digital Marketing Workshop",
    tag: "WORKSHOP CERTIFICATION",
    desc: "Certified by Wardiere Company in digital product communication."
  },
  {
    id: "gallery-07",
    src: "/images/gallery/gallery-07.jpg",
    title: "Grand Finale Felicitation Ceremony",
    tag: "IN-SPACE NATIONAL FINALE",
    desc: "PSIT Vyomnauts team receiving national honors on stage."
  },
  {
    id: "gallery-08",
    src: "/images/gallery/gallery-08.jpg",
    title: "Team Leader — PSIT Vyomnauts",
    tag: "PSIT KANPUR",
    desc: "Aditya in the official TRISHUL II rocketry team uniform."
  },
  {
    id: "gallery-09",
    src: "/images/gallery/gallery-09.jpg",
    title: "Vyomnauts Team at TRISHUL II Launcher",
    tag: "LAUNCH PAD OPERATIONS",
    desc: "PSIT Vyomnauts rocketry team at Narayani Launch Pad, Kushinagar."
  },
  {
    id: "gallery-10",
    src: "/images/gallery/gallery-10.jpg",
    title: "Sudarshan Trishul Rocket Integration",
    tag: "SUDARSHAN TRISHUL",
    desc: "Avionics payload integration with the sounding rocket body."
  },
  {
    id: "gallery-11",
    src: "/images/gallery/gallery-11.jpg",
    title: "Field Launch Rail & Sounding Rocket",
    tag: "ROCKETRY LAUNCH PAD",
    desc: "On-field model rocketry assembly and launch rail alignment."
  },
  {
    id: "gallery-12",
    src: "/images/gallery/gallery-12.jpg",
    title: "The Jam Spot Event — Media Coverage",
    tag: "MEDIA & LEADERSHIP",
    desc: "Co-founder & organizer of youth open mic and creative arts."
  }
];

export function initFlightStream() {
  const container = document.getElementById('flightStreamContainer');
  const stage = document.getElementById('flightStage');
  const canvas = document.getElementById('flightStarsCanvas');
  if (!container || !stage || !canvas) return;

  // 1. Setup Stars Canvas (Cosmic Warp Speed Streaks)
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = container.clientWidth);
  let height = (canvas.height = container.clientHeight);

  const starCount = 260; // Dense starfield
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 2.4,
      y: (Math.random() - 0.5) * height * 2.4,
      z: Math.random() * 2000,
      prevZ: 0,
      size: Math.random() * 1.6 + 0.6,
      baseAlpha: Math.random() * 0.7 + 0.3
    });
  }

  // 2. Setup High-Density 3D Cards Pool (24 active cards for dense layering)
  const cards = [];
  stage.innerHTML = '';

  // 24 varied 3D orbit positions across the field
  const densePositions = [
    { x: -310, y: -160, rx: 7, ry: -9 },
    { x: 310, y: -180, rx: 6, ry: 8 },
    { x: -350, y: 130, rx: -6, ry: -9 },
    { x: 340, y: 140, rx: -5, ry: 8 },
    { x: -140, y: -220, rx: 9, ry: -4 },
    { x: 150, y: -210, rx: 8, ry: 4 },
    { x: -250, y: -20, rx: 2, ry: -11 },
    { x: 260, y: -10, rx: 1, ry: 11 },
    { x: -130, y: 200, rx: -8, ry: -4 },
    { x: 140, y: 190, rx: -7, ry: 4 },
    { x: -280, y: -110, rx: 5, ry: -7 },
    { x: 280, y: -100, rx: 4, ry: 7 },
    { x: -220, y: 110, rx: -4, ry: -8 },
    { x: 210, y: 100, rx: -4, ry: 8 },
    { x: -60, y: -140, rx: 6, ry: -2 },
    { x: 70, y: -130, rx: 5, ry: 2 },
    { x: -70, y: 140, rx: -6, ry: -2 },
    { x: 80, y: 130, rx: -5, ry: 2 },
    { x: -190, y: -70, rx: 3, ry: -8 },
    { x: 190, y: -60, rx: 3, ry: 8 },
    { x: -320, y: 60, rx: -3, ry: -10 },
    { x: 320, y: 50, rx: -3, ry: 10 },
    { x: 0, y: -80, rx: 4, ry: 0 },
    { x: 0, y: 80, rx: -4, ry: 0 }
  ];

  const totalInstances = 24;
  const zRange = 2500;
  const zStep = zRange / totalInstances;

  for (let i = 0; i < totalInstances; i++) {
    const item = flightGalleryData[i % flightGalleryData.length];
    const pos = densePositions[i % densePositions.length];

    const el = document.createElement('div');
    el.className = 'flight-card';
    el.dataset.index = i;

    el.innerHTML = `
      <div class="corner tl"></div>
      <div class="corner br"></div>
      <div class="flight-card-media">
        <img src="${item.src}" alt="${item.title}" loading="lazy" />
        <div class="flight-card-overlay">
          <span class="flight-card-tag mono">${item.tag}</span>
          <h4 class="flight-card-title">${item.title}</h4>
          <p class="flight-card-desc">${item.desc}</p>
        </div>
      </div>
    `;

    // Click handler to open in full-resolution lightbox modal
    el.addEventListener('click', () => {
      const modal = document.getElementById('schematicModalOverlay');
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

    stage.appendChild(el);

    cards.push({
      el,
      x: pos.x,
      y: pos.y,
      // Evenly distribute Z depth from -2500 up to +200 for immediate dense saturation
      z: -((i + 1) * zStep) + 250,
      rx: pos.rx,
      ry: pos.ry,
      rotZ: (Math.random() - 0.5) * 6,
      baseX: pos.x,
      baseY: pos.y
    });
  }

  // 3. Mouse Parallax & Controls
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let isHovered = false;
  let isPaused = false;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    targetMouseX = nx * 90;
    targetMouseY = ny * 70;
  });

  container.addEventListener('mouseleave', () => {
    targetMouseX = 0;
    targetMouseY = 0;
    isHovered = false;
  });

  stage.addEventListener('mouseenter', (e) => {
    if (e.target.closest('.flight-card')) {
      isHovered = true;
    }
  });

  stage.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Pause toggle button
  const pauseBtn = document.getElementById('flightPauseBtn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.innerHTML = isPaused
        ? `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M8 5v14l11-7z"/></svg><span>Resume</span>`
        : `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg><span>Pause</span>`;
    });
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  });

  // 4. High-Speed Animation Loop (Dense & Fast)
  const Z_MIN = -2600;
  const Z_MAX = 520;
  const FADE_START = 80;
  const FADE_END = 480;

  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // A. Render Stars Warp Field (Fast High-Velocity Cosmic Streaks)
    ctx.clearRect(0, 0, width, height);

    const starSpeed = isPaused ? 0.4 : (isHovered ? 1.5 : 6.5);

    stars.forEach(star => {
      star.prevZ = star.z;
      star.z -= starSpeed;
      if (star.z <= 0) {
        star.z = 2000;
        star.prevZ = 2000;
        star.x = (Math.random() - 0.5) * width * 2.4;
        star.y = (Math.random() - 0.5) * height * 2.4;
      }

      const f = 600;
      const k = f / (f + star.z);
      const px = width / 2 + (star.x - mouseX * 2.2) * k;
      const py = height / 2 + (star.y - mouseY * 2.2) * k;

      const pk = f / (f + star.prevZ);
      const prevX = width / 2 + (star.x - mouseX * 2.2) * pk;
      const prevY = height / 2 + (star.y - mouseY * 2.2) * pk;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const alpha = Math.min(1, Math.max(0, (2000 - star.z) / 900)) * star.baseAlpha;

        ctx.strokeStyle = `rgba(163, 190, 140, ${alpha})`;
        ctx.lineWidth = Math.max(0.8, star.size * k * 2.0);
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    });

    // B. Animate 3D Flight Cards (Fast & Dense Flow)
    // 5.2px per frame when active (fast & dynamic), 1.2px when hovered for easy reading
    const flightSpeed = isPaused ? 0 : (isHovered ? 1.2 : 5.0);

    cards.forEach(card => {
      card.z += flightSpeed;

      // When the card passes the camera and fades out, recycle it to the far back
      if (card.z > Z_MAX) {
        card.z = Z_MIN + (Math.random() * 250 - 120);
        card.x = card.baseX + (Math.random() - 0.5) * 60;
        card.y = card.baseY + (Math.random() - 0.5) * 40;
      }

      // Calculate Opacity:
      // Fade in smoothly at distance (-2600 to -2000)
      // Fully visible throughout flight (-2000 to 80)
      // Fade out completely right as it passes the screen (80 to 480)
      let opacity = 1;
      if (card.z < -2000) {
        opacity = (card.z - Z_MIN) / 600;
      } else if (card.z > FADE_START) {
        opacity = 1 - (card.z - FADE_START) / (FADE_END - FADE_START);
      }
      opacity = Math.max(0, Math.min(1, opacity));

      // Perspective translation & tilt
      const curX = card.x - mouseX;
      const curY = card.y - mouseY;
      const rotY = card.ry + mouseX * 0.04;
      const rotX = card.rx - mouseY * 0.04;

      card.el.style.transform = `translate3d(${curX}px, ${curY}px, ${card.z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${card.rotZ}deg)`;
      card.el.style.opacity = opacity.toFixed(3);
      card.el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
    });
  }

  requestAnimationFrame(animate);
}
