/**
 * Tech Arcanist Interactive Canvas & Animation Engine for Aditya Pandey
 * Palette: Midnight Graphite × Warm White × Muted Olive
 * Implements:
 * 1. Asia/Kolkata live clock ticker
 * 2. Theme accent switcher (Midnight Graphite / Warm White / Muted Olive)
 * 3. Hero interactive particle attractor canvas in Muted Olive & Warm White
 * 4. Ambient flowing dust canvas in Muted Olive
 * 5. Interactive terminal bootloader
 * 6. Quick command palette (Ctrl+K)
 */

export function initTechArcanistEngine() {
  // ── 1. ASIA / KOLKATA LIVE CLOCK ──
  const clockEl = document.getElementById('sig-clock');
  if (clockEl) {
    const updateClock = () => {
      try {
        clockEl.textContent = new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        const now = new Date();
        clockEl.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      }
    };
    updateClock();
    setInterval(updateClock, 15000);
  }

  // ── 2. DUAL THEME SWITCHER (MIDNIGHT GRAPHITE <-> WARM WHITE CANVAS) ──
  const themeBtn = document.getElementById('theme');
  const root = document.documentElement;

  // Restore saved theme
  try {
    const saved = localStorage.getItem('ta-theme');
    if (saved) {
      root.dataset.theme = saved;
    }
  } catch (e) {}

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.dataset.theme;
      const next = current === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try {
        localStorage.setItem('ta-theme', next);
      } catch (e) {}
    });
  }

  // ── 3. HERO PARTICLE ATTRACTOR CANVAS (#field2) ──
  const heroCanvas = document.getElementById('field2');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let W = 0, H = 0, dpr = 1, raf = 0;
    const particles = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      W = heroCanvas.parentElement.clientWidth;
      H = heroCanvas.parentElement.clientHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      heroCanvas.width = W * dpr;
      heroCanvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Build grid particles
      particles.length = 0;
      const step = W < 768 ? 36 : 28;
      for (let y = step / 2; y < H; y += step) {
        for (let x = step / 2; x < W; x += step) {
          particles.push({
            origX: x + (Math.random() - 0.5) * 14,
            origY: y + (Math.random() - 0.5) * 14,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.5 + 0.8,
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 0.8,
            colorHue: Math.random() < 0.65 ? 'accent' : 'faint'
          });
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroCanvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      });
      heroSection.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = -9999;
        mouse.y = -9999;
      });
    }

    let t = 0;
    const animate = () => {
      t += 0.02;
      ctx.clearRect(0, 0, W, H);

      const isLight = root.dataset.theme === 'light';
      // Muted Olive & Warm White RGBs
      const oliveRgb = isLight ? '104, 122, 79' : '141, 159, 113';
      const warmWhiteRgb = isLight ? '40, 43, 50' : '244, 241, 234';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Idle floating oscillation
        const targetX = p.origX + Math.sin(t * p.speed + p.phase) * 6;
        const targetY = p.origY + Math.cos(t * p.speed * 0.8 + p.phase) * 6;

        // Mouse displacement
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 120;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 35;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += (targetX - p.x) * 0.08 + p.vx * 0.15;
        p.y += (targetY - p.y) * 0.08 + p.vy * 0.15;

        // Render dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.colorHue === 'accent') {
          ctx.fillStyle = `rgba(${oliveRgb}, 0.55)`;
        } else {
          ctx.fillStyle = `rgba(${warmWhiteRgb}, 0.22)`;
        }
        ctx.fill();
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
  }

  // ── 4. AMBIENT STREAMING DUST CANVAS (#dots) ──
  const dustCanvas = document.getElementById('dots');
  if (dustCanvas) {
    const ctx = dustCanvas.getContext('2d');
    let W = 0, H = 0, dpr = 1;
    const dustParticles = [];

    const resizeDust = () => {
      W = window.innerWidth;
      H = Math.max(window.innerHeight, document.documentElement.scrollHeight);
      dpr = Math.min(1.5, window.devicePixelRatio || 1);
      dustCanvas.width = W * dpr;
      dustCanvas.height = Math.min(H, 12000) * dpr;
      dustCanvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dustParticles.length = 0;
      const count = Math.min(120, Math.floor(W / 12));
      for (let i = 0; i < count; i++) {
        dustParticles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          radius: Math.random() * 1.4 + 0.5,
          speedY: Math.random() * 0.6 + 0.2,
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.35 + 0.1
        });
      }
    };

    window.addEventListener('resize', resizeDust);
    setTimeout(resizeDust, 300);

    const drawDust = () => {
      ctx.clearRect(0, 0, W, H);
      const isLight = root.dataset.theme === 'light';
      const dustRgb = isLight ? '104, 122, 79' : '141, 159, 113';

      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > H) p.y = 0;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dustRgb}, ${p.opacity})`;
        ctx.fill();
      }

      requestAnimationFrame(drawDust);
    };

    drawDust();
  }

  // ── 5. TERMINAL BOOTLOADER ANIMATION ──
  const bootBox = document.getElementById('boot');
  if (bootBox) {
    const hasBooted = sessionStorage.getItem('ta-booted');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasBooted || prefersReducedMotion) {
      if (bootBox.parentNode) {
        bootBox.parentNode.removeChild(bootBox);
      }
      document.documentElement.classList.remove('booting');
    } else {
      document.documentElement.classList.add('booting');
      const lines = [].slice.call(bootBox.querySelectorAll('[data-at]'));
      const fill = document.getElementById('boot-fill');
      const pct = document.getElementById('boot-pct');
      const skipBtn = document.getElementById('bootSkipBtn');

      let currentProgress = 0;
      const finishBoot = () => {
        bootBox.classList.add('boot-done');
        sessionStorage.setItem('ta-booted', '1');
        setTimeout(() => {
          document.documentElement.classList.remove('booting');
          if (bootBox.parentNode) {
            bootBox.parentNode.removeChild(bootBox);
          }
        }, 500);
      };

      if (skipBtn) {
        skipBtn.addEventListener('click', finishBoot);
      }

      const totalDuration = 2200; // 2.2 seconds smooth boot
      const startTime = performance.now();

      const bootTick = (now) => {
        const elapsed = now - startTime;
        currentProgress = Math.min(1, elapsed / totalDuration);

        if (fill) fill.style.width = (currentProgress * 100).toFixed(0) + '%';
        if (pct) pct.textContent = Math.round(currentProgress * 100) + '%';

        lines.forEach((l) => {
          const at = parseFloat(l.dataset.at || '0');
          if (currentProgress >= at) {
            l.classList.add('on');
          }
        });

        if (currentProgress >= 1) {
          const timeEl = document.getElementById('boot-time');
          if (timeEl) timeEl.textContent = `[${(elapsed / 1000).toFixed(2)}s]`;
          setTimeout(finishBoot, 350);
        } else {
          requestAnimationFrame(bootTick);
        }
      };

      requestAnimationFrame(bootTick);
    }
  }

  // ── 6. COMMAND PALETTE (CTRL+K) ──
  const palette = document.getElementById('palette');
  const palOpenBtns = document.querySelectorAll('[data-palette]');
  const palInput = document.getElementById('pal-q');
  const palList = document.getElementById('pal-list');

  const searchableItems = [
    { name: "IN-SPACe National Finalist · PDR & CDR Qualified", category: "Honors", href: "#achievements" },
    { name: "CAN-7USAT & Rocketry Avionics System", category: "Project", href: "#projects" },
    { name: "Ground Control Station (GCS) — Rocket Telemetry", category: "Project", href: "#projects" },
    { name: "IN-SPACe CAN-7USAT 7U Satellite Payload", category: "Project", href: "#projects" },
    { name: "Smart Hovercraft for Flood Rescue", category: "Project", href: "#projects" },
    { name: "Precision Water Level Indicator & IoT Monitor", category: "Project", href: "#projects" },
    { name: "Engineering Journey & Milestones (2024–2026)", category: "Timeline", href: "#timeline" },
    { name: "Technical Toolbox & Hardware Sensors", category: "Toolbox", href: "#skills" },
    { name: "Work & Experience (Vyomnauts Club, FlyRank AI)", category: "Experience", href: "#experience" },
    { name: "Achievements & Certifications (ISRO, TCS iON, Google Cloud)", category: "Awards", href: "#achievements" },
    { name: "Contact & Email Aditya", category: "Contact", href: "#contact" },
    { name: "Download Full CV (PDF)", category: "Resume", action: "resume" },
    { name: "Open Engineering CV / Resume Modal", category: "Resume", action: "resume" }
  ];

  const renderPaletteList = (query = '') => {
    if (!palList) return;
    const q = query.toLowerCase().trim();
    const filtered = searchableItems.filter(i => 
      !q || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      palList.innerHTML = `<li style="padding: 16px; color: var(--muted); text-align: center; font-size: 0.9rem;">No matching items found</li>`;
      return;
    }

    palList.innerHTML = filtered.map((item, idx) => `
      <li class="pal-item ${idx === 0 ? 'selected' : ''}" data-href="${item.href || ''}" data-action="${item.action || ''}">
        <span>${item.name}</span>
        <span class="cat">${item.category}</span>
      </li>
    `).join('');

    palList.querySelectorAll('.pal-item').forEach(el => {
      el.addEventListener('click', () => {
        closePalette();
        const action = el.dataset.action;
        const href = el.dataset.href;
        if (action === 'resume') {
          const modal = document.getElementById('resumeModalOverlay');
          if (modal) modal.classList.add('open');
        } else if (href) {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  };

  const openPalette = () => {
    if (!palette) return;
    palette.hidden = false;
    if (palInput) {
      palInput.value = '';
      palInput.focus();
    }
    renderPaletteList('');
  };

  const closePalette = () => {
    if (!palette) return;
    palette.hidden = true;
  };

  palOpenBtns.forEach(btn => btn.addEventListener('click', openPalette));

  if (palInput) {
    palInput.addEventListener('input', (e) => renderPaletteList(e.target.value));
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette && palette.hidden) openPalette();
      else closePalette();
    } else if (e.key === 'Escape' && palette && !palette.hidden) {
      closePalette();
    }
  });

  if (palette) {
    palette.addEventListener('click', (e) => {
      if (e.target === palette) closePalette();
    });
  }

  // ── 7. EMAIL COPY ACTION WITH STATUS ──
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const email = 'adityavaibhavpandey@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btnCopyEmail.innerHTML;
        btnCopyEmail.innerHTML = '✓ Copied';
        btnCopyEmail.style.borderColor = 'var(--ok)';
        btnCopyEmail.style.color = 'var(--ok)';
        setTimeout(() => {
          btnCopyEmail.innerHTML = originalText;
          btnCopyEmail.style.borderColor = '';
          btnCopyEmail.style.color = '';
        }, 2200);
      });
    });
  }
}
