/**
 * Aditya Pandey Portfolio - 3D Warp Flight Stream (Black & White, Depth-Blurred, Scattered)
 * Features 12 verified photographs & certificates in pure black and white,
 * popping out and zooming through 3D space with dynamic depth blur.
 * Minimalist container: only the certificates and photos, no external clutter.
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

  const starCount = 240;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 2.5,
      y: (Math.random() - 0.5) * height * 2.5,
      z: Math.random() * 2000,
      prevZ: 0,
      size: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.65 + 0.25
    });
  }

  // 2. Setup 24 Scattered 3D Cards Pool
  const cards = [];
  stage.innerHTML = '';

  // Organic scattered layout across the 3D viewing frustum
  const scatteredSlots = [
    { x: -380, y: -190, rx: 7, ry: -8, rz: -3 },
    { x: 380, y: -190, rx: 7, ry: 8, rz: 3 },
    { x: -240, y: -220, rx: 9, ry: -4, rz: 2 },
    { x: 230, y: -215, rx: 9, ry: 4, rz: -2 },
    { x: -420, y: -70, rx: 4, ry: -10, rz: -4 },
    { x: 420, y: -65, rx: 4, ry: 10, rz: 4 },
    { x: -160, y: -160, rx: 6, ry: -3, rz: 1 },
    { x: 170, y: -155, rx: 6, ry: 3, rz: -1 },

    { x: -290, y: -10, rx: 2, ry: -9, rz: -2 },
    { x: 290, y: -10, rx: 2, ry: 9, rz: 2 },
    { x: -90, y: -70, rx: 4, ry: -2, rz: 1 },
    { x: 90, y: -60, rx: 4, ry: 2, rz: -1 },
    { x: -120, y: 55, rx: -3, ry: -3, rz: -2 },
    { x: 120, y: 45, rx: -3, ry: 3, rz: 2 },

    { x: -390, y: 150, rx: -7, ry: -8, rz: -3 },
    { x: 390, y: 150, rx: -7, ry: 8, rz: 3 },
    { x: -240, y: 195, rx: -9, ry: -4, rz: 2 },
    { x: 240, y: 195, rx: -9, ry: 4, rz: -2 },
    { x: -420, y: 75, rx: -3, ry: -10, rz: 3 },
    { x: 420, y: 75, rx: -3, ry: 10, rz: -3 },
    { x: -170, y: 165, rx: -6, ry: -3, rz: -1 },
    { x: 170, y: 165, rx: -6, ry: 3, rz: 1 },

    { x: -330, y: 220, rx: -8, ry: -6, rz: 2 },
    { x: 330, y: 220, rx: -8, ry: 6, rz: -2 }
  ];

  const totalInstances = 24;
  const zRange = 2500;
  const zStep = zRange / totalInstances;

  for (let i = 0; i < totalInstances; i++) {
    const item = flightGalleryData[i % flightGalleryData.length];
    const pos = scatteredSlots[i % scatteredSlots.length];

    const el = document.createElement('div');
    el.className = 'flight-card';
    el.setAttribute('data-id', item.id);
    el.style.width = `${item.w}px`;
    el.style.height = `${item.h}px`;

    // Only the pure certificate / photograph image, no overlay text or captions
    el.innerHTML = `
      <div class="flight-card-media">
        <img src="${item.src}" alt="${item.title}" loading="lazy" />
      </div>
    `;

    // Lightbox Modal Expansion on Click
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

    const cardObj = {
      el,
      x: pos.x,
      y: pos.y,
      z: -((i + 1) * zStep) + 200,
      rx: pos.rx,
      ry: pos.ry,
      rotZ: pos.rz,
      baseX: pos.x,
      baseY: pos.y,
      isHovered: false
    };

    el.addEventListener('mouseenter', () => {
      cardObj.isHovered = true;
      isCardHovered = true;
    });

    el.addEventListener('mouseleave', () => {
      cardObj.isHovered = false;
      isCardHovered = false;
    });

    cards.push(cardObj);
  }

  // 3. Mouse Parallax & Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let isCardHovered = false;

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
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
  });

  // 4. Animation Loop (Popping Out, Zooming, Depth Blur, Black & White)
  const Z_MIN = -2600;
  const Z_MAX = 480;

  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // A. Render Cosmic Background Stars (Monochrome Slate / Silver Dust)
    ctx.clearRect(0, 0, width, height);

    const starSpeed = isCardHovered ? 1.0 : 4.5;

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
      const px = width / 2 + (star.x - mouseX * 2.0) * k;
      const py = height / 2 + (star.y - mouseY * 2.0) * k;

      const pk = f / (f + star.prevZ);
      const prevX = width / 2 + (star.x - mouseX * 2.0) * pk;
      const prevY = height / 2 + (star.y - mouseY * 2.0) * pk;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const alpha = Math.min(1, Math.max(0, (2000 - star.z) / 900)) * star.baseAlpha;

        // Subtle monochrome silver/white star dust
        ctx.strokeStyle = `rgba(220, 230, 245, ${alpha.toFixed(2)})`;
        ctx.lineWidth = Math.max(0.6, star.size * k * 1.8);
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    });

    // B. Animate 3D Black & White Photos Popping Out & Zooming
    const flightSpeed = isCardHovered ? 0.8 : 3.8;

    cards.forEach(card => {
      card.z += flightSpeed;

      // When the card passes the camera and fades out, recycle to the back
      if (card.z > Z_MAX) {
        card.z = Z_MIN + (Math.random() * 220 - 110);
        card.x = card.baseX + (Math.random() - 0.5) * 60;
        card.y = card.baseY + (Math.random() - 0.5) * 40;
      }

      // Calculate Opacity:
      // Fade in smoothly at distance (-2600 to -1900)
      // Fully visible throughout flight (-1900 to 100)
      // Fade out as it zooms past the screen (100 to 480)
      let opacity = 1;
      if (card.z < -1900) {
        opacity = (card.z - Z_MIN) / (-1900 - Z_MIN);
      } else if (card.z > 100) {
        opacity = 1 - (card.z - 100) / (Z_MAX - 100);
      }
      opacity = Math.max(0, Math.min(1, opacity));

      // Calculate Depth Blur (Blurred far away, sharp in focus, blurred as it pops close)
      let blurPx = 0;
      if (card.z < -200) {
        blurPx = Math.min(8.0, Math.abs(card.z + 200) / 280);
      } else if (card.z > 100) {
        blurPx = Math.min(6.0, (card.z - 100) / 60);
      }

      // 3D Perspective translation & rotation
      const curX = card.x - mouseX;
      const curY = card.y - mouseY;
      const rotY = card.ry + mouseX * 0.04;
      const rotX = card.rx - mouseY * 0.04;

      card.el.style.transform = `translate3d(${curX}px, ${curY}px, ${card.z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${card.rotZ}deg)`;
      card.el.style.opacity = opacity.toFixed(3);
      card.el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';

      // Apply dynamic depth blur and strict Black & White (Grayscale)
      if (!card.isHovered) {
        const blurStr = blurPx > 0.3 ? ` blur(${blurPx.toFixed(1)}px)` : '';
        const filterVal = `grayscale(100%) contrast(1.15) brightness(0.92)${blurStr}`;
        card.el.style.filter = filterVal;
        card.el.style.webkitFilter = filterVal;
      } else {
        card.el.style.filter = 'grayscale(100%) contrast(1.25) brightness(1.1) blur(0px)';
        card.el.style.webkitFilter = 'grayscale(100%) contrast(1.25) brightness(1.1) blur(0px)';
      }
    });
  }

  requestAnimationFrame(animate);
}
