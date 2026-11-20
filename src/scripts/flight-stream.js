/**
 * Aditya Pandey Portfolio - 3D Warp Flight Stream
 * Inspired by cosmic space warp / 3D fly-through gallery
 * Features 10 verified photographs & certificates flying in 3D perspective space
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
  }
];

export function initFlightStream() {
  const container = document.getElementById('flightStreamContainer');
  const stage = document.getElementById('flightStage');
  const canvas = document.getElementById('flightStarsCanvas');
  if (!container || !stage || !canvas) return;

  // 1. Setup Stars Canvas
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = container.clientWidth);
  let height = (canvas.height = container.clientHeight);

  const starCount = 180;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 2.2,
      y: (Math.random() - 0.5) * height * 2.2,
      z: Math.random() * 2000,
      size: Math.random() * 1.8 + 0.6,
      baseAlpha: Math.random() * 0.7 + 0.3
    });
  }

  // 2. Setup 3D Cards
  const cards = [];

  // Distinct trajectory zones to spread cards nicely across the 3D frustum
  const spreadPositions = [
    { x: -360, y: -190, rx: 6, ry: -8 },
    { x: 360, y: -210, rx: 5, ry: 7 },
    { x: -420, y: 150, rx: -5, ry: -9 },
    { x: 400, y: 170, rx: -6, ry: 8 },
    { x: 0, y: -250, rx: 8, ry: 0 },
    { x: -270, y: -10, rx: 0, ry: -12 },
    { x: 280, y: -10, rx: 0, ry: 12 },
    { x: 0, y: 230, rx: -8, ry: 0 },
    { x: -320, y: -110, rx: 4, ry: -6 },
    { x: 320, y: -110, rx: 4, ry: 6 }
  ];

  const totalCards = flightGalleryData.length;
  const zSpacing = 2400 / totalCards;

  stage.innerHTML = '';

  flightGalleryData.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'flight-card';
    el.dataset.index = index;

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

    const pos = spreadPositions[index % spreadPositions.length];

    cards.push({
      el,
      x: pos.x,
      y: pos.y,
      z: -((index + 1) * zSpacing),
      rx: pos.rx,
      ry: pos.ry,
      rotZ: (Math.random() - 0.5) * 5,
      speed: 2.2,
      baseX: pos.x,
      baseY: pos.y
    });
  });

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
    targetMouseX = nx * 80;
    targetMouseY = ny * 60;
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

  // 4. Main Animation Loop
  const Z_MIN = -2600;
  const Z_MAX = 520;
  const FADE_START = 80; // Starts fading out as it reaches the screen
  const FADE_END = 500;  // Completely disappears past camera

  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // A. Render Stars Warp Field
    ctx.clearRect(0, 0, width, height);

    const starSpeed = isPaused ? 0.3 : (isHovered ? 0.8 : 2.5);

    stars.forEach(star => {
      star.z -= starSpeed;
      if (star.z <= 0) {
        star.z = 2000;
        star.x = (Math.random() - 0.5) * width * 2.2;
        star.y = (Math.random() - 0.5) * height * 2.2;
      }

      const f = 600;
      const k = f / (f + star.z);
      const px = width / 2 + (star.x - mouseX * 2) * k;
      const py = height / 2 + (star.y - mouseY * 2) * k;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const alpha = Math.min(1, Math.max(0, (2000 - star.z) / 1000)) * star.baseAlpha;
        const radius = star.size * k * 2.2;

        ctx.fillStyle = `rgba(163, 190, 140, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.6, radius), 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // B. Animate 3D Flight Cards
    const flightSpeed = isPaused ? 0 : (isHovered ? 0.5 : 2.0);

    cards.forEach(card => {
      card.z += flightSpeed;

      // When the card passes the camera and fades out, recycle it to the back
      if (card.z > Z_MAX) {
        card.z = Z_MIN + (Math.random() * 200 - 100);
        card.x = card.baseX + (Math.random() - 0.5) * 80;
        card.y = card.baseY + (Math.random() - 0.5) * 60;
      }

      // Calculate Opacity:
      // Fade in at deep distance (-2600 to -2000)
      // Solid in flight (-2000 to 80)
      // Fade out completely as it comes right in front of user (80 to 500)
      let opacity = 1;
      if (card.z < -2000) {
        opacity = (card.z - Z_MIN) / 600;
      } else if (card.z > FADE_START) {
        opacity = 1 - (card.z - FADE_START) / (FADE_END - FADE_START);
      }
      opacity = Math.max(0, Math.min(1, opacity));

      // Perspective translation
      const curX = card.x - mouseX;
      const curY = card.y - mouseY;
      const rotY = card.ry + mouseX * 0.05;
      const rotX = card.rx - mouseY * 0.05;

      card.el.style.transform = `translate3d(${curX}px, ${curY}px, ${card.z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${card.rotZ}deg)`;
      card.el.style.opacity = opacity.toFixed(3);
      card.el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
    });
  }

  requestAnimationFrame(animate);
}
