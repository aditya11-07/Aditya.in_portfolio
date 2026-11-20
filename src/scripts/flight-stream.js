/**
 * Aditya Pandey Portfolio - 3D Warp Flight Stream
 * - Images pop out from everywhere across the canvas (not from center)
 * - Each image follows its own random floating 3D path
 * - Strict Black & White with dynamic depth-of-field blur by default
 * - When touched or hovered, turns into VIBRANT FULL COLOR with accent glow
 * - Minimalist container: only certificates and Aditya's photos
 */

export const flightGalleryData = [
  {
    id: "gallery-01",
    src: "/images/gallery/gallery-01.jpg",
    title: "Public Address & Speech (Stage)",
    w: 180,
    h: 180
  },
  {
    id: "gallery-02",
    src: "/images/gallery/gallery-02.jpg",
    title: "National Space Day Quiz Certification — ISRO & MyGov",
    w: 235,
    h: 166
  },
  {
    id: "gallery-03",
    src: "/images/gallery/gallery-03.jpg",
    title: "Swachh Bharat Mission Grameen Quiz Certification",
    w: 235,
    h: 166
  },
  {
    id: "gallery-04",
    src: "/images/gallery/gallery-04.jpg",
    title: "Pariksha Pe Charcha 2024 Certification — Ministry of Education",
    w: 235,
    h: 166
  },
  {
    id: "gallery-05",
    src: "/images/gallery/gallery-05.jpg",
    title: "Narcotics Control Bureau Pledge Certification",
    w: 220,
    h: 170
  },
  {
    id: "gallery-06",
    src: "/images/gallery/gallery-06.jpg",
    title: "Digital Marketing Workshop Certification",
    w: 235,
    h: 166
  },
  {
    id: "gallery-07",
    src: "/images/gallery/gallery-07.jpg",
    title: "IN-SPACe Grand Finale Stage Award Ceremony",
    w: 240,
    h: 160
  },
  {
    id: "gallery-08",
    src: "/images/gallery/gallery-08.jpg",
    title: "Aditya Pandey — PSIT Rocketry Team Uniform",
    w: 160,
    h: 185
  },
  {
    id: "gallery-09",
    src: "/images/gallery/gallery-09.jpg",
    title: "PSIT Vyomnauts Team at TRISHUL II Rocket Launcher",
    w: 140,
    h: 210
  },
  {
    id: "gallery-10",
    src: "/images/gallery/gallery-10.jpg",
    title: "Aditya with TRISHUL II Sounding Rocket",
    w: 180,
    h: 180
  },
  {
    id: "gallery-11",
    src: "/images/gallery/gallery-11.jpg",
    title: "Field Launch Rail & Sounding Rocket",
    w: 155,
    h: 205
  },
  {
    id: "gallery-12",
    src: "/images/gallery/gallery-12.jpg",
    title: "The Jam Spot Event — Media Coverage & Co-Founder Aditya Pandey",
    w: 260,
    h: 142
  }
];

export function initFlightStream() {
  const container = document.getElementById('flightStreamContainer');
  const stage = document.getElementById('flightStage');
  const canvas = document.getElementById('flightStarsCanvas');
  if (!container || !stage || !canvas) return;

  // 1. Setup Stars Canvas (Subtle Monochrome Cosmic Dust & Streaks)
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = container.clientWidth);
  let height = (canvas.height = container.clientHeight);

  const starCount = 200;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 2.5,
      y: (Math.random() - 0.5) * height * 2.5,
      z: Math.random() * 2000,
      prevZ: 0,
      size: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.6 + 0.2
    });
  }

  // 2. Setup 24 Cards that pop out from everywhere across the screen
  const cards = [];
  stage.innerHTML = '';

  const totalInstances = 24;
  const Z_MIN = -2600;
  const Z_MAX = 380;
  const scale = width < 760 ? 0.8 : 1.0;

  let activeTouchCard = null;
  let touchTimeout = null;
  let isCardHovered = false;

  function setCardColorful(card, isColor) {
    card.isColorful = isColor;
    if (isColor) {
      card.el.classList.add('is-colorful');
      card.el.style.filter = 'grayscale(0%) contrast(1.05) brightness(1.05) blur(0px)';
      card.el.style.webkitFilter = 'grayscale(0%) contrast(1.05) brightness(1.05) blur(0px)';
    } else {
      card.el.classList.remove('is-colorful');
    }
  }

  // Helper to assign a random spawn position and trajectory from anywhere
  function resetCard(card, isInit = false) {
    const marginX = width * 0.44;
    const marginY = height * 0.40;

    // Screen-space position: everywhere across the canvas (corners, borders, center-off-center)
    card.screenX = (Math.random() - 0.5) * (marginX * 2);
    card.screenY = (Math.random() - 0.5) * (marginY * 2);

    // Random drift velocity along X and Y (unique wandering path)
    card.driftX = (Math.random() - 0.5) * 1.4;
    card.driftY = (Math.random() - 0.5) * 1.0;

    // Organic floating wave parameters
    card.ampX = Math.random() * 28 + 8;
    card.ampY = Math.random() * 22 + 6;
    card.freqX = Math.random() * 0.015 + 0.007;
    card.freqY = Math.random() * 0.015 + 0.007;
    card.phaseX = Math.random() * Math.PI * 2;
    card.phaseY = Math.random() * Math.PI * 2;

    // 3D Rotational angles and gentle spin
    card.rx = (Math.random() - 0.5) * 14;
    card.ry = (Math.random() - 0.5) * 18;
    card.rotZ = (Math.random() - 0.5) * 10;
    card.vrotZ = (Math.random() - 0.5) * 0.03;

    // Individual forward speed (random velocity)
    card.vz = Math.random() * 1.6 + 3.2;

    if (isInit) {
      // Stagger depths evenly across space for immediate rich density
      card.z = -Math.random() * 2500 + 100;
    } else {
      // Respawn deep in background
      card.z = Z_MIN - Math.random() * 300;
    }
  }

  for (let i = 0; i < totalInstances; i++) {
    const item = flightGalleryData[i % flightGalleryData.length];

    const el = document.createElement('div');
    el.className = 'flight-card';
    el.setAttribute('data-id', item.id);
    el.style.width = `${Math.round(item.w * scale)}px`;
    el.style.height = `${Math.round(item.h * scale)}px`;

    // Only the pure certificate / photograph image
    el.innerHTML = `
      <div class="flight-card-media">
        <img src="${item.src}" alt="${item.title}" loading="lazy" />
      </div>
    `;

    const cardObj = {
      el,
      item,
      screenX: 0,
      screenY: 0,
      driftX: 0,
      driftY: 0,
      ampX: 0,
      ampY: 0,
      freqX: 0,
      freqY: 0,
      phaseX: 0,
      phaseY: 0,
      rx: 0,
      ry: 0,
      rotZ: 0,
      vrotZ: 0,
      z: 0,
      vz: 3.5,
      isColorful: false
    };

    resetCard(cardObj, true);

    // Desktop hover -> turn colorful
    el.addEventListener('pointerenter', () => {
      setCardColorful(cardObj, true);
      isCardHovered = true;
    });

    el.addEventListener('pointerleave', () => {
      setCardColorful(cardObj, false);
      isCardHovered = false;
    });

    // Mobile touch -> turn colorful
    el.addEventListener('touchstart', (e) => {
      if (activeTouchCard && activeTouchCard !== cardObj) {
        setCardColorful(activeTouchCard, false);
      }
      setCardColorful(cardObj, true);
      activeTouchCard = cardObj;
      isCardHovered = true;

      if (touchTimeout) clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        if (activeTouchCard) {
          setCardColorful(activeTouchCard, false);
          activeTouchCard = null;
          isCardHovered = false;
        }
      }, 4000);
    }, { passive: true });

    // Click -> open full image in lightbox modal
    el.addEventListener('click', () => {
      const modal = document.getElementById('portfolioModal');
      if (modal) {
        const modalImg = modal.querySelector('.portfolio-modal-body img');
        const modalTitle = modal.querySelector('.portfolio-modal-title');
        const modalDownload = modal.querySelector('.portfolio-modal-footer a');
        if (modalImg) modalImg.src = item.src;
        if (modalTitle) modalTitle.textContent = item.title;
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
    cards.push(cardObj);
  }

  // Clear touch when tapping outside cards
  container.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.flight-card') && activeTouchCard) {
      setCardColorful(activeTouchCard, false);
      activeTouchCard = null;
      isCardHovered = false;
    }
  }, { passive: true });

  // 3. Mouse Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    targetMouseX = nx * 70;
    targetMouseY = ny * 50;
  });

  container.addEventListener('mouseleave', () => {
    targetMouseX = 0;
    targetMouseY = 0;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  });

  // 4. Animation Loop
  let time = 0;

  function animate() {
    requestAnimationFrame(animate);
    time += 1;

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // A. Background Stars
    ctx.clearRect(0, 0, width, height);
    const starSpeed = isCardHovered ? 0.8 : 3.8;

    stars.forEach(star => {
      star.prevZ = star.z;
      star.z -= starSpeed;
      if (star.z <= 0) {
        star.z = 2000;
        star.prevZ = 2000;
        star.x = (Math.random() - 0.5) * width * 2.5;
        star.y = (Math.random() - 0.5) * height * 2.5;
      }

      const f = 600;
      const k = f / (f + star.z);
      const px = width / 2 + (star.x - mouseX * 1.8) * k;
      const py = height / 2 + (star.y - mouseY * 1.8) * k;

      const pk = f / (f + star.prevZ);
      const prevX = width / 2 + (star.x - mouseX * 1.8) * pk;
      const prevY = height / 2 + (star.y - mouseY * 1.8) * pk;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const alpha = Math.min(1, Math.max(0, (2000 - star.z) / 900)) * star.baseAlpha;
        ctx.strokeStyle = `rgba(220, 230, 245, ${alpha.toFixed(2)})`;
        ctx.lineWidth = Math.max(0.6, star.size * k * 1.8);
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    });

    // B. Animate 3D Cards along individual random paths from everywhere
    const speedFactor = isCardHovered ? 0.25 : 1.0;

    cards.forEach(card => {
      // Forward motion
      card.z += card.vz * speedFactor;

      // Random path progression in screen space
      card.screenX += card.driftX * speedFactor;
      card.screenY += card.driftY * speedFactor;
      card.rotZ += card.vrotZ * speedFactor;

      // When card passes camera and fades out, respawn from a new random location
      if (card.z > Z_MAX) {
        resetCard(card, false);
      }

      // Compute perspective scale factor k:
      // perspective: 800px => k = 800 / (800 - card.z)
      const f = 800;
      const k = f / (f - card.z);

      // Compute wave oscillation for organic floating path
      const waveX = Math.sin(time * card.freqX + card.phaseX) * card.ampX;
      const waveY = Math.cos(time * card.freqY + card.phaseY) * card.ampY;

      // Screen position target (parallax + random path + wave)
      const curScreenX = card.screenX + waveX - mouseX;
      const curScreenY = card.screenY + waveY - mouseY;

      // Convert to 3D coordinates so card appears exactly at (curScreenX, curScreenY)
      // and NOT converging to the center vanishing point!
      const x3d = curScreenX / k;
      const y3d = curScreenY / k;

      // Opacity Curve:
      // Fade in smoothly at distance (-2600 to -1800)
      // Fully visible throughout flight (-1800 to 80)
      // Fade out as it zooms past the screen (80 to 380)
      let opacity = 1;
      if (card.z < -1800) {
        opacity = (card.z - Z_MIN) / (-1800 - Z_MIN);
      } else if (card.z > 80) {
        opacity = 1 - (card.z - 80) / (Z_MAX - 80);
      }
      opacity = Math.max(0, Math.min(1, opacity));

      // Calculate Depth Blur (only when not colorful / touched)
      let blurPx = 0;
      if (!card.isColorful) {
        if (card.z < -250) {
          blurPx = Math.min(8.0, Math.abs(card.z + 250) / 280);
        } else if (card.z > 100) {
          blurPx = Math.min(6.0, (card.z - 100) / 60);
        }
      }

      // Apply 3D Transform
      const rotY = card.ry + mouseX * 0.03;
      const rotX = card.rx - mouseY * 0.03;

      card.el.style.transform = `translate3d(${x3d.toFixed(1)}px, ${y3d.toFixed(1)}px, ${card.z.toFixed(1)}px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) rotateZ(${card.rotZ.toFixed(1)}deg)`;
      card.el.style.opacity = opacity.toFixed(3);
      card.el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';

      // Apply Black & White + Depth Blur, or Vibrant Color if touched/hovered
      if (!card.isColorful) {
        const blurStr = blurPx > 0.3 ? ` blur(${blurPx.toFixed(1)}px)` : '';
        const filterVal = `grayscale(100%) contrast(1.15) brightness(0.92)${blurStr}`;
        card.el.style.filter = filterVal;
        card.el.style.webkitFilter = filterVal;
      } else {
        card.el.style.filter = 'grayscale(0%) contrast(1.05) brightness(1.05) blur(0px)';
        card.el.style.webkitFilter = 'grayscale(0%) contrast(1.05) brightness(1.05) blur(0px)';
      }
    });
  }

  requestAnimationFrame(animate);
}
