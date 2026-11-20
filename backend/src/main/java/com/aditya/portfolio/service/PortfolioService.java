package com.aditya.portfolio.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Service providing structured portfolio data for Aditya Pandey.
 * Includes aerospace projects, avionics engineering, skills, and academic milestones.
 */
@Service
public class PortfolioService {

    public Map<String, Object> getFullPortfolio() {
        return Map.of(
            "personal", getPersonalInfo(),
            "projects", getProjects(),
            "skills", getSkills(),
            "achievements", getAchievements()
        );
    }

    public Map<String, Object> getPersonalInfo() {
        return Map.of(
            "name", "Aditya Pandey",
            "title", "Computer Science Engineer · Model Rocketry Team Leader & Avionics Engineer",
            "institution", "Pranveer Singh Institute of Technology (PSIT), Kanpur",
            "location", "Kanpur, Uttar Pradesh, India",
            "email", "adityavaibhavpandey@gmail.com",
            "phone", "+91 9555075608",
            "github", "https://github.com/aditya11-07",
            "linkedin", "https://linkedin.com/in/aditya-pandey-9a1811330",
            "bio", "Computer Science undergraduate specializing in aerospace telemetry systems, embedded C/C++, and full-stack software architecture. Team Leader & National Finalist in the IN-SPACe Model Rocketry Competition."
        );
    }

    public List<Map<String, Object>> getProjects() {
        return List.of(
            Map.of(
                "id", "trishul-rocket-avionics",
                "title", "TRISHUL II Rocket Flight Avionics System",
                "category", "Aerospace Avionics",
                "role", "Team Leader & Lead Avionics Engineer",
                "description", "Engineered the flight computer and multi-sensor telemetry payload for the TRISHUL II sounding rocket targeting ~1000m altitude in the IN-SPACe Student Competition 2026. Successfully defended PDR and CDR before ISRO scientists.",
                "tech", List.of("ESP32-S3", "BMP390", "BNO085", "GNSS", "LoRa 433MHz", "XBee", "INA226"),
                "image", "/images/gallery/gallery-10.jpg"
            ),
            Map.of(
                "id", "ground-control-station",
                "title", "Ground Control Station (GCS) Telemetry",
                "category", "Software & Systems",
                "role", "Full-Stack Software Engineer",
                "description", "Web-based ground station for decoding, visualizing, and logging rocket & CanSat telemetry in real time. Packaged with Docker and SQLite persistence.",
                "tech", List.of("Python", "JavaScript", "Docker", "SQLite", "LoRa / XBee"),
                "image", "/images/schematic.png"
            ),
            Map.of(
                "id", "can7usat-payload",
                "title", "CAN-7USAT (7U Satellite Payload)",
                "category", "Satellite Engineering",
                "role", "Avionics Lead",
                "description", "7U format CanSat payload meeting IN-SPACe specifications with dual recovery, shock resistance, and live telemetry broadcast.",
                "tech", List.of("ESP32-S3", "BNO085 9-DOF", "BMP390", "GNSS", "Dual Parachute"),
                "image", "/images/CAN7USAT.png"
            ),
            Map.of(
                "id", "smart-hovercraft",
                "title", "Smart Hovercraft for Flood Rescue",
                "category", "Robotics & Hardware",
                "role", "Hardware & Firmware Engineer",
                "description", "Remotely controlled amphibious hovercraft prototype engineered for flood-rescue operations in shallow water and debris.",
                "tech", List.of("ESP32", "BLDC Thrust Motors", "30A ESC", "Bluetooth Game Controller"),
                "image", "/images/Hovercraft.jpeg"
            ),
            Map.of(
                "id", "water-level-indicator",
                "title", "Precision Water Level Indicator & IoT Monitor",
                "category", "IoT & Microcontrollers",
                "role", "Embedded Systems Engineer",
                "description", "Multi-stage water level monitoring system with real-time status indicators, microcontroller interfacing, and noise filtering.",
                "tech", List.of("Microcontrollers", "Sensors", "Embedded C", "Hardware Debugging"),
                "image", "/images/water_level_indicator.webp"
            )
        );
    }

    public Map<String, List<String>> getSkills() {
        return Map.of(
            "Languages", List.of("Java", "C / C++", "Python", "JavaScript", "TypeScript", "SQL"),
            "Embedded & Hardware", List.of("ESP32-S3", "Arduino", "Raspberry Pi", "LoRa 433MHz", "XBee", "BMP390", "BNO085", "GNSS", "EasyEDA"),
            "Software & Frameworks", List.of("Spring Boot", "React", "Node.js", "Docker", "Vite", "Tailwind CSS", "RESTful APIs"),
            "Tools & Systems", List.of("Git & GitHub", "Linux / Ubuntu", "VS Code", "Postman", "Maven", "SQLite")
        );
    }

    public List<Map<String, String>> getAchievements() {
        return List.of(
            Map.of(
                "title", "Team Leader — IN-SPACe Model Rocketry & CAN-7USAT National Finalist (PDR & CDR Qualified)",
                "organization", "IN-SPACe (Department of Space) & ISRO",
                "year", "2025–2026",
                "description", "Led student rocketry team among 115 registered teams nationwide. Defended Preliminary & Critical Design Reviews evaluated by senior ISRO scientists."
            ),
            Map.of(
                "title", "National Space Day Quiz Certification",
                "organization", "ISRO & MyGov",
                "year", "2024",
                "description", "Certified by Dr. S. Somanath (Chairman ISRO & Secretary, Department of Space) for excellence in space science."
            ),
            Map.of(
                "title", "Pariksha Pe Charcha 2024 Certification",
                "organization", "Ministry of Education & NCERT",
                "year", "2024",
                "description", "Certified by Prof. Dinesh Prasad Saklani (Director, NCERT) for national initiative participation."
            ),
            Map.of(
                "title", "Swachh Bharat Mission Grameen Phase-II Quiz Certification",
                "organization", "Ministry of Jal Shakti & MyGov",
                "year", "2024",
                "description", "National award by Ms. Vini Mahajan (Secretary, DDWS) for awareness and mission qualification."
            )
        );
    }
}
