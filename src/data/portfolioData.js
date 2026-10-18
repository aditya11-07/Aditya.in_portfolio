/**
 * ==============================================================================
 * ADITYA PANDEY PORTFOLIO - CONTENT & PHOTO CONFIGURATION
 * ==============================================================================
 * 
 * ONLY YOU (ADITYA) CAN EDIT THIS FILE:
 * ------------------------------------------------------------------------------
 * 1. HOW TO CHANGE ANY PHOTO (TWO SIMPLE WAYS):
 *    WAY A: Edit directly in `index.html`!
 *           - Open `index.html`, find the photo tag (marked with 📸 comments),
 *             and change the `src="..."` to your photo path.
 *           - Changes in `index.html` are 100% direct and will never be overwritten!
 * 
 *    WAY B: Put your photo file in `public/images/` or `images/`!
 *           - Any image placed in `public/images/` or `images/` can be used as `/images/your_photo.jpg`.
 *           - Update the paths in `personal` below or in `index.html`.
 * 
 * 2. HOW TO CHANGE CONTENT & TEXT:
 *    - Edit either in `index.html` or in `portfolioData.js`.
 *    - Save the file and your portfolio updates instantly!
 * ==============================================================================
 */

export const portfolioData = {
  // ── 1. PERSONAL INFORMATION & PROFILE PHOTOS ──
  personal: {
    name: "Aditya Pandey",
    roleTitle: "Computer Science Engineer | Embedded Systems & Full Stack",
    heroHeading: "Engineering Reliable <span class=\"accent\">Embedded & Web Systems</span>",
    heroSubheading: "Hi, I'm **Aditya Pandey**. Computer Science & Engineering student at PSIT Kanpur. Bridging hardware and software through rocketry avionics, real-time telemetry, and high-performance applications.",
    statusBadge: "Open for Embedded Systems & Software Roles",

    // Profile Photos (change these to any image in /images/ or any image URL)
    heroPhoto: "/images/aditya_rocket.png",
    aboutPhoto: "/images/aditya_rocket.png",
    navAvatar: "/images/aditya_rocket.png",

    aboutTitle: "Hello, I'm <span>Aditya Pandey</span>",

    bioParagraphs: [
      "I am a Computer Science & Engineering student at **Pranveer Singh Institute of Technology (PSIT), Kanpur**. I have a deep passion for embedded systems, rocketry avionics, IoT telemetry, and modern software engineering.",
      "My work ranges from designing microelectronics and multi-sensor avionics payloads for **CanSat / IN-SPACe** rocketry competitions, to building real-time ground control stations and reactive web interfaces at **FlyRank AI**.",
      "I thrive at the intersection of low-level microcontroller protocols (UART, I²C, SPI, LoRa) and high-level software architectures, writing clean code and building resilient physical systems."
    ],

    socials: {
      linkedin: "https://linkedin.com/in/aditya-pandey-9a1811330",
      github: "https://github.com/aditya11-07",
      email: "adityavaibhavpandey@gmail.com"
    }
  },

  // ── 2. PRESET GALLERY PHOTOS (Quickly pickable in the in-browser customizer) ──
  availablePhotos: [
    { label: "Rocket Launch (Aditya)", path: "/images/aditya_rocket.png" },
    { label: "Portrait 1", path: "/images/aditya_portrait1.jpg" },
    { label: "Portrait 2", path: "/images/aditya_portrait2.jpg" },
    { label: "Aditya Profile", path: "/images/aditya.jpg" },
    { label: "HDR Studio", path: "/images/aditya_hdr.jpg" },
    { label: "CanSat Hardware", path: "/images/cansat_hardware.jpg" },
    { label: "CanSat Avionics", path: "/images/cansat_avionics.jpg" },
    { label: "Ground Station Telemetry", path: "/images/ground_station.jpg" },
    { label: "Schematic PCB Diagram", path: "/images/schematic.png" }
  ],

  // ── 3. MARQUEE BANNER TEXTS ──
  marquee: {
    topMuted: "CREATE · SHIP · REPEAT · CREATE · SHIP · REPEAT · CREATE · SHIP · REPEAT",
    bottomBold: "BUILD SYSTEMS NOT CHAOS · BUILD SYSTEMS NOT CHAOS · BUILD SYSTEMS NOT CHAOS"
  },

  // ── 4. CHRONOLOGICAL TIMELINE / JOURNEY MILESTONES ──
  // Categories: 'all' | 'rocketry' | 'software' | 'education'
  timeline: [
    {
      id: "timeline-phase-04-inspace",
      year: "2025 – Present",
      phase: "Phase 04 // IN-SPACe Rocketry",
      title: "IN-SPACe Rocketry Competition — Team Lead",
      organization: "IN-SPACe / ISRO & Department of Space, Government of India",
      badge: "PDR & CDR Qualified",
      category: "rocketry",
      description: "Serving as Team Lead for the rocketry avionics team in the IN-SPACe student rocketry competition. Successfully qualified both Preliminary Design Review (PDR) and Critical Design Review (CDR). Spearheading multi-sensor telemetry acquisition, wireless communication links, power distribution, and flight recovery payload architecture.",
      tags: ["IN-SPACe", "ISRO", "PDR Qualified", "CDR Qualified", "Team Lead", "CanSat Avionics", "Telemetry"],
      icon: "award"
    },
    {
      id: "timeline-phase-03-vyomnauts",
      year: "2025 – Present",
      phase: "Phase 03 // PSIT Vyomnauts",
      title: "Avionics Engineer — PSIT Vyomnauts",
      organization: "PSIT Vyomnauts Club — PSIT Kanpur",
      badge: "Avionics & Systems",
      category: "rocketry",
      description: "Joined PSIT Vyomnauts as an Avionics Engineer (2025–Present). Hands-on development and firmware engineering across microcontrollers (ESP32, ESP32-S3, ESP32-C3, Arduino Nano, Arduino Uno) and aerospace sensor arrays (BMP barometric altimeters, BNO 9-DOF IMUs, RTC, GPS GNSS, BLDC motors, and electronic speed controllers / ESC).",
      tags: ["ESP32", "ESP32-S3", "ESP32-C3", "Arduino Nano / Uno", "BMP Altimeter", "BNO IMU", "RTC", "GPS", "BLDC & ESC"],
      icon: "cpu"
    },
    {
      id: "timeline-phase-02-hovercraft",
      year: "2025",
      phase: "Phase 02 // Mini Project",
      title: "Smart Hovercraft Prototype",
      organization: "Guided Hardware Project (Motivated by Faiz Bhaiya)",
      badge: "Custom Phone Controller",
      category: "software",
      description: "Built a functional remotely controlled hovercraft prototype, motivated and mentored by Faiz Bhaiya. Powered by high-RPM BLDC thrust lift motors and electronic speed controllers (ESC), wirelessly steered and maneuvered using a self-made smartphone game controller interface with servo-vectored rudders and emergency fail-safes.",
      tags: ["Hovercraft", "Phone Game Controller", "BLDC Motors", "ESC", "Servo Steering", "Faiz Bhaiya Mentorship"],
      icon: "rocket"
    },
    {
      id: "timeline-phase-01-college",
      year: "2025 – 2029",
      phase: "Phase 01 // College Life",
      title: "B.Tech in Computer Science & Engineering",
      organization: "Pranveer Singh Institute of Technology (PSIT), Kanpur",
      badge: "Undergraduate Degree",
      category: "education",
      description: "Pursuing engineering at Pranveer Singh Institute of Technology (PSIT), Kanpur (2025–2029). Building a solid academic foundation in computer science, data structures, algorithms, computer architecture, and embedded systems, bridging pure software with physical hardware.",
      tags: ["PSIT Kanpur", "Computer Science", "Engineering", "Algorithms", "C / C++", "Microcontrollers"],
      icon: "graduation"
    },
    {
      id: "timeline-phase-00-academic",
      year: "Completed 2024",
      phase: "Phase 00 // Academic",
      title: "School Captain & Higher Secondary Education",
      organization: "PM Shri Kendriya Vidyalaya Amhat, Sultanpur",
      badge: "School Captain",
      category: "education",
      description: "Completed academic schooling in 2024 from PM Shri Kendriya Vidyalaya Amhat, Sultanpur. Proudly served as the School Captain, developing strong leadership qualities, team management, discipline, and responsibility that continue to guide my technical and collaborative engineering pursuits.",
      tags: ["School Captain", "Leadership & Responsibility", "Kendriya Vidyalaya Amhat", "Sultanpur", "Academic Foundation"],
      icon: "award"
    }
  ],

  // ── 5. TECHNICAL SKILLS ──
  skills: [
    { name: "C / C++", category: "embedded", icon: "cpp" },
    { name: "Python", category: "software", icon: "python" },
    { name: "ESP32 / MCU", category: "embedded", icon: "esp32" },
    { name: "Arduino & RPi", category: "embedded", icon: "arduino" },
    { name: "React", category: "software", icon: "react" },
    { name: "Node & JS", category: "software", icon: "node" },
    { name: "Docker", category: "devops", icon: "docker" },
    { name: "LoRa / XBee", category: "embedded", icon: "lora" },
    { name: "PCB & Circuit Design", category: "hardware", icon: "pcb" },
    { name: "Git & Linux", category: "devops", icon: "git" }
  ],

  // ── 6. EXPERIENCE CARDS ──
  experience: [
    {
      badge: "Frontend Engineering • 2025",
      role: "Frontend Developer",
      company: "FlyRank AI",
      year: "2025",
      description: "Developed responsive and interactive web interfaces; contributed to component implementation, state debugging, and performance optimization for client-facing features."
    },
    {
      badge: "Rocketry & Avionics",
      role: "Avionics & Payload Engineer",
      company: "Vyoumnauts Club — PSIT",
      description: "Integrated multi-sensor avionics arrays and wireless telemetry systems; engineered flight-data acquisition, communication protocols (LoRa & XBee), onboard SD logging, and payload ground station testing."
    }
  ],

  // ── 7. SIGNATURE PROJECTS ──
  projects: [
    {
      id: "in-space-rocketry",
      title: "Model Rocketry Avionics",
      categoryBadge: "IN-SPACE Rocketry",
      image: "/images/schematic.png",
      imagePosition: "center 25%",
      description: "Designed and developed the rocket avionics system for TRISHUL II under the IN-SPACe Model Rocketry India Student Competition 2026. Integrated ESP32-S3, BMP390 barometric altimeter, BNO085 IMU, GNSS modules, and power monitoring for real-time flight data acquisition. Implemented LoRa/XBee telemetry, onboard SD card data logging, apogee detection, and automated payload separation logic to support flight monitoring and mission operations.",
      tags: ["ESP32-S3", "Raspberry Pi", "BNO085", "BMP390", "LoRa", "XBee"],
      githubUrl: "https://github.com/aditya11-07",
      schematicUrl: "/images/schematic.png"
    },
    {
      id: "CAN-7USAT",
      title: "IN-SPACe Model Cansat",
      categoryBadge: "Payload & Hardware",
      image: "/images/CAN7USAT.png",
      imagePosition: "center center",
      description: "Designed and developed the CanSat payload system for the TRISHUL II rocket, focusing on sensor integration, onboard data acquisition, and mission monitoring. Integrated environmental sensors, GNSS positioning, and an embedded computing system with camera-based imaging and SD card data logging. Contributed to payload power management, real-time telemetry, and reliable operation under launch vibration and shock conditions.",
      tags: ["ESP32-S3", "BNO085", "BMP390", "LoRa", "XBee"],
      githubUrl: "https://github.com/aditya11-07",

    },
    {
      id: "smart-hovercraft",
      title: "Smart Hovercraft for Flood Rescue",
      categoryBadge: "Robotics & IoT",
      image: "/images/Hovercraft.jpeg",
      imagePosition: "center center",
      description: "Developed an ESP32-based remotely controlled hovercraft prototype designed for flood-rescue applications in shallow water and debris, motivated and mentored by Faiz Bhaiya. Powered by high-RPM BLDC thrust lift motors and electronic speed controllers (ESC). Directional thrust and throttle are wirelessly maneuvered via a self-made smartphone game controller interface with real-time response and emergency fail-safe protocol.",
      tags: ["ESP32", "Phone Game Controller", "BLDC Motors", "ESC", "Servo Steering", "Embedded C++"],
      githubUrl: "https://github.com/aditya11-07",

    }
  ],

  // ── 8. HONORS & ACHIEVEMENTS ──
  achievements: [
    {
      title: "IN-SPACe CANSAT India Student Competition",
      description: "National student competition (2025–2026). Qualified and designed the complete telemetry and avionics payload for model rocketry and CanSat payload.",
      icon: "award"
    },
    {
      title: "TCS iON — AI for All Certification",
      description: "Certified in core concepts of artificial intelligence, machine learning pipelines, and societal applications of AI algorithms.",
      icon: "certificate"
    },
    {
      title: "Google Cloud / Simplilearn — Generative AI",
      description: "Completed foundational training in Large Language Models (LLMs), attention mechanisms, and generative AI system integrations.",
      icon: "sparkles"
    }
  ],

  // ── 9. CONTACT INFORMATION ──
  contact: {
    email: "adityavaibhavpandey@gmail.com",
    linkedin: "https://linkedin.com/in/aditya-pandey-9a1811330",
    linkedinDisplay: "linkedin.com/in/aditya-pandey-9a1811330",
    github: "https://github.com/aditya11-07",
    githubDisplay: "github.com/aditya11-07"
  }
};
