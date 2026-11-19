/**
 * ==============================================================================
 * ADITYA PANDEY PORTFOLIO - CONTENT & PHOTO CONFIGURATION
 * ==============================================================================
 * 
 * Verified against:
 * - Aditya_Pandey_CV.pdf
 * - Aditya_Pandey_Techkriti_Resume.pdf
 * - IN-SPACe / ISRO National Finale (Team Leader & Finalist)
 * - LinkedIn: in/aditya-pandey-9a1811330
 * ==============================================================================
 */

export const portfolioData = {
  // ── 1. PERSONAL INFORMATION & PROFILE PHOTOS ──
  personal: {
    name: "Aditya Pandey",
    roleTitle: "Computer Science Engineer | Full-Stack Software, Real-Time Systems & Rocketry Avionics",
    heroHeading: "Engineering Scalable <span class=\"accent\">Software & High-Reliability Systems</span>",
    heroSubheading: "Undergraduate Computer Science & Engineering student at **PSIT Kanpur** and **Team Leader & National Finalist in the IN-SPACe Model Rocketry & CAN-7USAT India Student Competition 2026** (PDR & CDR Qualified). Specializing in full-stack software development, systems architecture, real-time RF telemetry (LoRa / XBee), and rocketry avionics.",
    statusBadge: "Team Leader · IN-SPACe Model Rocketry National Finalist",

    // Profile Photos
    heroPhoto: "/images/aditya_trishul_rocket.jpg",
    aboutPhoto: "/images/Aditya_Profile.png",
    navAvatar: "/images/Aditya_Profile.png",

    aboutTitle: "Hello, I'm <span>Aditya Pandey</span>",

    bioParagraphs: [
      "I am a Computer Science & Engineering undergraduate at **Pranveer Singh Institute of Technology (PSIT), Kanpur** (Class of 2025–2029) with a strong secondary education foundation from **PM Shri Kendriya Vidyalaya Amhat, Sultanpur** (School Captain, Class X: 90.8%, Class XII: 82%).",
      "I served as the **Team Leader & Lead Avionics Engineer** for the **IN-SPACe Model Rocketry & CAN-7USAT India Student Competition 2026** (organized by IN-SPACe, Department of Space, Govt. of India in association with ISRO). Heading our student engineering team from PSIT Vyomnauts Club, I led our technical design and defense through both the rigorous **Preliminary Design Review (PDR)** and **Critical Design Review (CDR)** evaluated by senior ISRO and IN-SPACe scientists, earning our place as **National Finalists** among 115 registered teams nationwide for launch at the Narayani Model Rocketry Launch Pad, Kushinagar.",
      "My engineering work places core focus on **software engineering and systems architecture**: developing full-stack web applications with React, Node.js, and Python, engineering Dockerized ground control stations, and writing high-reliability low-level firmware in C/C++. Alongside my leadership in rocketry avionics, I work as a **Frontend Developer at FlyRank AI**, engineering responsive web applications, interactive state architectures, and telemetry monitoring dashboards."
    ],

    education: {
      college: "Pranveer Singh Institute of Technology (PSIT), Kanpur",
      degree: "B.Tech in Computer Science & Engineering",
      years: "2025 – 2029 (Present)",
      school: "PM Shri Kendriya Vidyalaya Amhat, Sultanpur",
      schoolHonor: "School Captain (Completed 2024)",
      class12: "82%",
      class10: "90.8%"
    },

    socials: {
      linkedin: "https://linkedin.com/in/aditya-pandey-9a1811330",
      github: "https://github.com/aditya11-07",
      email: "adityavaibhavpandey@gmail.com",
      collegeEmail: "2k25cse2513677@gmail.com",
      phone: "+91 9555075608",
      location: "Kanpur, Uttar Pradesh, India",
      cvPdf: "/Aditya_Pandey_CV.pdf",
      resumePdf: "/Aditya_Pandey_Resume.pdf"
    }
  },

  // ── 2. PRESET GALLERY PHOTOS ──
  availablePhotos: [
    { label: "TRISHUL II Rocket Launch Pad (Aditya)", path: "/images/aditya_trishul_rocket.jpg" },
    { label: "Rocket Launch (Aditya)", path: "/images/aditya_rocket.png" },
    { label: "Aditya Profile", path: "/images/Aditya_Profile.png" },
    { label: "CanSat 7U Payload", path: "/images/CAN7USAT.png" },
    { label: "Smart Hovercraft", path: "/images/Hovercraft.jpeg" },
    { label: "Avionics PCB & Circuit", path: "/images/PCB.jpeg" },
    { label: "Rocketry Launch Pad", path: "/images/rocketry.jpeg" },
    { label: "CAN-7USAT Schematic", path: "/images/schematic.png" }
  ],

  // ── 3. MARQUEE BANNER TEXTS ──
  marquee: {
    topMuted: "TEAM LEADER · IN-SPACE NATIONAL FINALIST · PDR & CDR QUALIFIED · CAN-7USAT 7U PAYLOAD · FULL-STACK SOFTWARE & AVIONICS",
    bottomBold: "BUILD SYSTEMS NOT CHAOS · FULL-STACK SOFTWARE · ~1000M ROCKETRY · FLYRANK AI · PSIT VYOMNAUTS"
  },

  // ── 4. CHRONOLOGICAL TIMELINE / JOURNEY MILESTONES ──
  timeline: [
    {
      id: "timeline-phase-05-inspace",
      year: "2025 – 2026",
      phase: "Phase 04 // National Finale & Vyomnauts",
      title: "Team Leader & Lead Avionics Engineer — IN-SPACe Rocketry (Vyomnauts Club)",
      organization: "IN-SPACe / ISRO & PSIT Vyomnauts Club",
      badge: "National Finalist",
      category: "rocketry",
      description: "Serving as Team Leader & Lead Avionics Engineer for PSIT Vyomnauts Club, directing our rocketry team to National Finalist status among 115 registered teams nationwide in the prestigious IN-SPACe Model Rocketry & CAN-7USAT Student Competition 2026. Successfully led our technical proposals and defended both the Preliminary Design Review (PDR) and Critical Design Review (CDR) evaluated by senior ISRO, DRDO, and IN-SPACe scientists. Directed the 1 kg CAN-7USAT avionics payload, 1000m deployment systems, multi-sensor integration (ESP32-S3, BNO085 IMU, BMP390, GNSS), and real-time telemetry architecture (LoRa 433MHz & XBee) for launch at Narayani Model Rocketry Launch Pad, Kushinagar, UP.",
      tags: ["Team Leader", "IN-SPACe Finalist", "ISRO", "PDR & CDR Qualified", "ESP32-S3", "CAN-7USAT", "LoRa & XBee", "Vyomnauts Club"],
      icon: "award"
    },
    {
      id: "timeline-phase-03-flyrank",
      year: "2025",
      phase: "Phase 03 // FlyRank AI",
      title: "Frontend Developer — FlyRank AI",
      organization: "FlyRank AI",
      badge: "Software Engineering",
      category: "software",
      description: "Engineered responsive and interactive web applications; implemented reusable modular components, state management workflows, REST API integrations, and UI rendering performance optimization for client-facing software products.",
      tags: ["React", "JavaScript (ES6+)", "REST APIs", "State Management", "Frontend Architecture", "UI Optimization"],
      icon: "code"
    },
    {
      id: "timeline-phase-02-hovercraft",
      year: "2025",
      phase: "Phase 02 // Robotics Prototype",
      title: "Smart Hovercraft for Flood Rescue Prototype",
      organization: "Guided Hardware Project (Motivated & Mentored by Faiz Bhaiya)",
      badge: "Amphibious Robotics",
      category: "software",
      description: "Engineered an ESP32-powered remotely controlled amphibious hovercraft designed for flood-rescue operations in shallow waters and debris. Powered by dual high-RPM BLDC thrust and lift motors with electronic speed controllers (ESCs), vectored servo rudders, smartphone game controller interface, and emergency fail-safe stop logic.",
      tags: ["Hovercraft", "ESP32", "BLDC Motors", "ESC", "Servo Steering", "Bluetooth", "Faiz Bhaiya Mentorship"],
      icon: "rocket"
    },
    {
      id: "timeline-phase-01-college",
      year: "2025 – 2029",
      phase: "Phase 01 // Undergraduate",
      title: "B.Tech in Computer Science & Engineering",
      organization: "Pranveer Singh Institute of Technology (PSIT), Kanpur",
      badge: "Computer Science",
      category: "education",
      description: "Pursuing Bachelor of Technology in Computer Science & Engineering (2025–2029). Focused coursework and practical lab work in Data Structures & Algorithms, Systems Architecture, Object-Oriented Programming, Operating Systems, and Embedded Systems.",
      tags: ["PSIT Kanpur", "Computer Science", "Data Structures", "Algorithms", "C / C++", "Full-Stack Dev"],
      icon: "graduation"
    },
    {
      id: "timeline-phase-00-academic",
      year: "Completed 2024",
      phase: "Phase 00 // Academic & Leadership",
      title: "School Captain & Higher Secondary (Class XII: 82% | Class X: 90.8%)",
      organization: "PM Shri Kendriya Vidyalaya Amhat, Sultanpur",
      badge: "School Captain & Honors",
      category: "education",
      description: "Graduated with 82% in Class XII and 90.8% in Class X from PM Shri Kendriya Vidyalaya Amhat, Sultanpur. Served with distinction as School Captain, developing foundational leadership, team management, discipline, and public communication skills.",
      tags: ["School Captain", "Class XII 82%", "Class X 90.8%", "Kendriya Vidyalaya Amhat", "Leadership"],
      icon: "award"
    }
  ],

  // ── 5. TECHNICAL SKILLS (SOFTWARE-FOCUSED) ──
  skills: [
    { name: "React & JS", category: "software", icon: "react" },
    { name: "Python", category: "software", icon: "python" },
    { name: "Node.js & Express", category: "software", icon: "node" },
    { name: "Data Structures & C++", category: "software", icon: "cpp" },
    { name: "Docker & DevOps", category: "devops", icon: "docker" },
    { name: "Git & Linux", category: "devops", icon: "git" },
    { name: "REST APIs & WebSockets", category: "software", icon: "code" },
    { name: "Embedded C / C++", category: "embedded", icon: "cpp" },
    { name: "ESP32 & S3 Firmware", category: "embedded", icon: "esp32" },
    { name: "LoRa & Telemetry Streams", category: "embedded", icon: "lora" },
    { name: "Aerospace Sensor Fusion", category: "hardware", icon: "sensor" },
    { name: "PCB Design & EasyEDA", category: "hardware", icon: "pcb" }
  ],

  // ── 6. EXPERIENCE CARDS ──
  experience: [
    {
      badge: "Team Leader • Rocketry & Avionics • 2025 – Present",
      role: "Team Leader & Lead Avionics Engineer",
      company: "Vyomnauts Club — PSIT Kanpur",
      year: "2025 – Present",
      description: "Led the student aerospace rocketry team for national competitions. Supervised and engineered multi-sensor avionics arrays and wireless telemetry systems for TRISHUL II and CAN-7USAT missions. Directed flight-data acquisition, communication protocols (LoRa 433MHz & XBee RF), onboard SD logging, and ground station payload validation, leading the team through PDR and CDR qualification in the national IN-SPACe competition."
    },
    {
      badge: "Software Engineering • 2025",
      role: "Frontend Developer",
      company: "FlyRank AI",
      year: "2025",
      description: "Developed responsive and interactive web interfaces; contributed to component implementation, state debugging, and performance optimization for client-facing software applications. Bridged web software design with real-time data flow architectures."
    }
  ],

  // ── 7. SIGNATURE PROJECTS ──
  projects: [
    {
      id: "CAN-7USAT-avionics",
      title: "CAN-7USAT & Rocketry Avionics System",
      categoryBadge: "IN-SPACe Team Leader · National Finalist",
      image: "/images/PCB.jpeg",
      imagePosition: "center 25%",
      description: "Led as Team Leader and Chief Avionics Engineer in designing and engineering the complete flight avionics architecture for the TRISHUL II model rocket and 1 kg CAN-7USAT payload targeting ~1000m altitude in the IN-SPACe Model Rocketry India Student Competition 2026. Successfully guided our team to qualify both PDR (Preliminary Design Review) and CDR (Critical Design Review) evaluated by senior ISRO & IN-SPACe directors. Integrated ESP32-S3, BNO085 9-DOF IMU, BMP390 precision barometer, GNSS, and INA226 power monitoring for real-time telemetry, apogee detection, payload deployment logic, and SD-card flight data logging.",
      tags: ["Team Leader", "ESP32-S3", "Raspberry Pi", "BNO085", "BMP390", "GNSS", "LoRa", "XBee", "INA226"],
      githubUrl: "https://github.com/aditya11-07",
      schematicUrl: "/images/schematic.png"
    },
    {
      id: "ground-control-station",
      title: "Ground Control Station (GCS) — Rocket Telemetry",
      categoryBadge: "Ground Station & Full-Stack Telemetry",
      image: "/images/schematic.png",
      imagePosition: "center center",
      description: "Developed a web-based ground station for receiving, decoding, and visualizing rocket and CanSat telemetry in real time. Implemented telemetry logging, real-time trajectory graphs, and embedded-to-web data flow over serial/RF links. Packaged with a Docker-based deployment architecture with SQLite telemetry persistence.",
      tags: ["Python", "JavaScript", "HTML / CSS", "Docker", "SQLite", "LoRa / XBee", "Telemetry Streams"],
      githubUrl: "https://github.com/aditya11-07",
      schematicUrl: "/images/schematic.png"
    },
    {
      id: "CAN-7USAT-payload",
      title: "IN-SPACe CAN-7USAT (7U Satellite Payload)",
      categoryBadge: "7U CanSat · Team Leader Finalist",
      image: "/images/CAN7USAT.png",
      imagePosition: "center center",
      description: "Led development of the CanSat payload system (7U format, <1 kg) meeting IN-SPACe mission specifications. Features autonomous sensor subsystems, descent control recovery system opening at 600m altitude, vibration and shock resilience, GNSS tracking, and live telemetry broadcast to ground station.",
      tags: ["Team Leader", "ESP32-S3", "BNO085", "BMP390", "GNSS", "LoRa", "XBee", "CanSat 7U"],
      githubUrl: "https://github.com/aditya11-07",
      schematicUrl: "/images/CAN7USAT.png"
    },
    {
      id: "smart-hovercraft",
      title: "Smart Hovercraft for Flood Rescue",
      categoryBadge: "Robotics & Embedded Hardware",
      image: "/images/Hovercraft.jpeg",
      imagePosition: "center center",
      description: "Developed an ESP32-based remotely controlled amphibious hovercraft prototype designed for flood-rescue operations in shallow water and debris, motivated and mentored by Faiz Bhaiya. Powered by high-RPM BLDC thrust lift motors and electronic speed controllers (ESC). Directional thrust and throttle are wirelessly maneuvered via a smartphone game controller interface with real-time response and emergency fail-safe protocol.",
      tags: ["ESP32", "Phone Game Controller", "BLDC Motors", "ESC", "Servo Steering", "Bluetooth"],
      githubUrl: "https://github.com/aditya11-07",
      schematicUrl: "/images/Hovercraft.jpeg"
    },
    {
      id: "water-level-indicator",
      title: "Precision Water Level Indicator & IoT Monitor",
      categoryBadge: "IoT & Microcontroller Interfacing",
      image: "/images/PCB.jpeg",
      imagePosition: "center center",
      description: "Built a water-level monitoring system with multi-stage sensing, real-time status indicators, and microcontroller interfacing. Practiced input/output handling, sensor calibration, noise filtering, and fault-tolerant embedded-system troubleshooting.",
      tags: ["Microcontrollers", "Sensors", "Embedded C", "Hardware Debugging", "Power Monitoring"],
      githubUrl: "https://github.com/aditya11-07",
      schematicUrl: "/images/PCB.jpeg"
    }
  ],

  // ── 8. HONORS & ACHIEVEMENTS ──
  achievements: [
    {
      title: "Team Leader — IN-SPACe Model Rocketry & CAN-7USAT National Finalist & PDR/CDR Qualified",
      description: "Served as Team Leader, guiding our student team to the top finalist tier nationwide out of 115 registered teams in the national competition organized by IN-SPACe (Department of Space) & ISRO. Qualified both Preliminary Design Review (PDR) and Critical Design Review (CDR), earning clearance to launch at Narayani Model Rocketry Launch Pad, Kushinagar (Grand Finale: Oct 31 – Nov 3, 2026).",
      icon: "award"
    },
    {
      title: "School Captain & Academic Excellence — PM Shri KV Amhat",
      description: "Served as School Captain at PM Shri Kendriya Vidyalaya Amhat, Sultanpur (Completed 2024). Graduated with 90.8% in Class X and 82% in Class XII, demonstrating proven leadership, discipline, and organizational excellence.",
      icon: "graduation"
    },
    {
      title: "TCS iON — AI for All Certification",
      description: "Certified in core concepts of artificial intelligence, machine learning pipelines, and societal applications of AI algorithms.",
      icon: "certificate"
    },
    {
      title: "Google Cloud / Simplilearn — Generative AI Certification",
      description: "Completed foundational training in Large Language Models (LLMs), deep learning transformer architectures, attention mechanisms, and generative AI integrations.",
      icon: "sparkles"
    }
  ],

  // ── 9. CONTACT INFORMATION ──
  contact: {
    email: "adityavaibhavpandey@gmail.com",
    collegeEmail: "2k25cse2513677@gmail.com",
    phone: "+91 9555075608",
    linkedin: "https://linkedin.com/in/aditya-pandey-9a1811330",
    linkedinDisplay: "linkedin.com/in/aditya-pandey-9a1811330",
    github: "https://github.com/aditya11-07",
    githubDisplay: "github.com/aditya11-07",
    location: "Kanpur, Uttar Pradesh, India",
    cvPdf: "/Aditya_Pandey_CV.pdf",
    resumePdf: "/Aditya_Pandey_Resume.pdf"
  }
};
