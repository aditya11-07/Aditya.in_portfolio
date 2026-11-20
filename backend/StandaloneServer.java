package com.aditya.portfolio;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Standalone Zero-Dependency High-Performance Java HTTP Server.
 * Runs instantly with modern Java (Java 21/26) using standard JDK libraries only:
 *
 *   Usage:
 *     java backend/StandaloneServer.java
 *   Or compile and run:
 *     javac -d bin backend/StandaloneServer.java
 *     java -cp bin com.aditya.portfolio.StandaloneServer
 */
public class StandaloneServer {

    private static final int PORT = 8085;
    private static final AtomicLong totalVisits = new AtomicLong(0);
    private static final Set<String> uniqueIps = ConcurrentHashMap.newKeySet();
    private static final List<Map<String, String>> contactMessages = new CopyOnWriteArrayList<>();
    private static final Instant serverStartTime = Instant.now();
    private static final File logFile = new File("contact_messages.log");

    public static void main(String[] args) throws IOException {
        int port = PORT;
        if (args.length > 0) {
            try { port = Integer.parseInt(args[0]); } catch (NumberFormatException ignored) {}
        }

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Modern Java Virtual Threads Executor for high throughput
        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor());

        // API Context Handlers
        server.createContext("/api/health", new HealthHandler());
        server.createContext("/api/portfolio", new PortfolioHandler());
        server.createContext("/api/projects", new ProjectsHandler());
        server.createContext("/api/skills", new SkillsHandler());
        server.createContext("/api/achievements", new AchievementsHandler());
        server.createContext("/api/contact", new ContactHandler());
        server.createContext("/api/analytics/visit", new AnalyticsVisitHandler());
        server.createContext("/api/analytics/stats", new AnalyticsStatsHandler());

        // Static File Server Handler (serves dist/ or fallback response)
        server.createContext("/", new StaticFileHandler());

        server.start();

        System.out.println(String.format("""
            ===================================================================
               ADITYA PANDEY PORTFOLIO - STANDALONE JAVA BACKEND ACTIVE
               Runtime: Java %s (%s)
               Port:    %d
               Concurrency: Virtual Threads Enabled
               Endpoints:
                 - GET  http://localhost:%d/api/health
                 - GET  http://localhost:%d/api/portfolio
                 - GET  http://localhost:%d/api/projects
                 - GET  http://localhost:%d/api/skills
                 - GET  http://localhost:%d/api/achievements
                 - POST http://localhost:%d/api/contact
                 - GET  http://localhost:%d/api/contact/messages
                 - POST http://localhost:%d/api/analytics/visit
                 - GET  http://localhost:%d/api/analytics/stats
            ===================================================================
            """,
            System.getProperty("java.version"),
            System.getProperty("java.vendor"),
            port, port, port, port, port, port, port, port, port, port
        ));
    }

    // ── CORS & Response Utility ──
    private static void sendJsonResponse(HttpExchange exchange, int statusCode, String jsonResponse) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        byte[] bytes = jsonResponse.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static String readRequestBody(HttpExchange exchange) throws IOException {
        try (InputStream is = exchange.getRequestBody();
             ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = is.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
            }
            return bos.toString(StandardCharsets.UTF_8);
        }
    }

    private static String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\b", "\\b")
                .replace("\f", "\\f")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }

    // ── 1. Health Handler ──
    static class HealthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            Runtime rt = Runtime.getRuntime();
            long totalMem = rt.totalMemory() / (1024 * 1024);
            long freeMem = rt.freeMemory() / (1024 * 1024);

            String json = String.format("""
                {
                  "success": true,
                  "message": "Aditya Pandey Portfolio Backend is Healthy and Operational",
                  "data": {
                    "status": "UP",
                    "javaVersion": "%s",
                    "totalMemoryMb": %d,
                    "freeMemoryMb": %d,
                    "activeThreads": %d
                  },
                  "timestamp": "%s"
                }
                """,
                System.getProperty("java.version"),
                totalMem, freeMem,
                Thread.activeCount(),
                Instant.now().toString()
            );
            sendJsonResponse(exchange, 200, json);
        }
    }

    // ── 2. Full Portfolio Handler ──
    static class PortfolioHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String json = """
                {
                  "success": true,
                  "data": {
                    "personal": {
                      "name": "Aditya Pandey",
                      "title": "Computer Science Engineer · Model Rocketry Team Leader & Lead Avionics Engineer",
                      "institution": "Pranveer Singh Institute of Technology (PSIT), Kanpur",
                      "email": "adityavaibhavpandey@gmail.com",
                      "phone": "+91 9555075608",
                      "github": "https://github.com/aditya11-07",
                      "linkedin": "https://linkedin.com/in/aditya-pandey-9a1811330"
                    },
                    "milestones": [
                      "Team Leader — IN-SPACe Model Rocketry & CAN-7USAT National Finalist (PDR & CDR Qualified)",
                      "National Space Day Quiz Certification (ISRO & MyGov)",
                      "Pariksha Pe Charcha 2024 Certification (Ministry of Education & NCERT)",
                      "Swachh Bharat Mission Grameen Quiz Certification (Govt. of India)"
                    ]
                  },
                  "timestamp": "%s"
                }
                """.formatted(Instant.now().toString());
            sendJsonResponse(exchange, 200, json);
        }
    }

    // ── 3. Projects Handler ──
    static class ProjectsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String json = """
                {
                  "success": true,
                  "count": 5,
                  "data": [
                    {
                      "id": "trishul-rocket-avionics",
                      "title": "TRISHUL II Rocket Flight Avionics System",
                      "category": "Aerospace Avionics",
                      "role": "Team Leader & Lead Avionics Engineer",
                      "tech": ["ESP32-S3", "BMP390", "BNO085", "GNSS", "LoRa 433MHz", "XBee", "INA226"],
                      "image": "/images/gallery/gallery-10.jpg"
                    },
                    {
                      "id": "ground-control-station",
                      "title": "Ground Control Station (GCS) Telemetry",
                      "category": "Software & Systems",
                      "role": "Full-Stack Software Engineer",
                      "tech": ["Python", "JavaScript", "Docker", "SQLite", "LoRa / XBee"],
                      "image": "/images/schematic.png"
                    },
                    {
                      "id": "can7usat-payload",
                      "title": "CAN-7USAT (7U Satellite Payload)",
                      "category": "Satellite Engineering",
                      "role": "Avionics Lead",
                      "tech": ["ESP32-S3", "BNO085 9-DOF", "BMP390", "GNSS"],
                      "image": "/images/CAN7USAT.png"
                    },
                    {
                      "id": "smart-hovercraft",
                      "title": "Smart Hovercraft for Flood Rescue",
                      "category": "Robotics & Hardware",
                      "role": "Hardware & Firmware Engineer",
                      "tech": ["ESP32", "BLDC Thrust Motors", "30A ESC", "Bluetooth"],
                      "image": "/images/Hovercraft.jpeg"
                    },
                    {
                      "id": "water-level-indicator",
                      "title": "Precision Water Level Indicator & IoT Monitor",
                      "category": "IoT & Microcontrollers",
                      "role": "Embedded Systems Engineer",
                      "tech": ["Microcontrollers", "Sensors", "Embedded C"],
                      "image": "/images/water_level_indicator.webp"
                    }
                  ],
                  "timestamp": "%s"
                }
                """.formatted(Instant.now().toString());
            sendJsonResponse(exchange, 200, json);
        }
    }

    // ── 4. Skills Handler ──
    static class SkillsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String json = """
                {
                  "success": true,
                  "data": {
                    "Languages": ["Java", "C / C++", "Python", "JavaScript", "TypeScript", "SQL"],
                    "Embedded & Hardware": ["ESP32-S3", "Arduino", "Raspberry Pi", "LoRa 433MHz", "XBee", "BMP390", "BNO085", "GNSS", "EasyEDA"],
                    "Software & Frameworks": ["Spring Boot", "React", "Node.js", "Docker", "Vite", "RESTful APIs"],
                    "Tools": ["Git & GitHub", "Linux", "VS Code", "Maven"]
                  },
                  "timestamp": "%s"
                }
                """.formatted(Instant.now().toString());
            sendJsonResponse(exchange, 200, json);
        }
    }

    // ── 5. Achievements Handler ──
    static class AchievementsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String json = """
                {
                  "success": true,
                  "count": 4,
                  "data": [
                    {
                      "title": "Team Leader — IN-SPACe Model Rocketry & CAN-7USAT National Finalist",
                      "organization": "IN-SPACe (Department of Space) & ISRO",
                      "year": "2025–2026",
                      "evaluation": "PDR & CDR Qualified by Senior ISRO Scientists"
                    },
                    {
                      "title": "National Space Day Quiz Certification",
                      "organization": "ISRO & MyGov",
                      "year": "2024",
                      "signatory": "Dr. S. Somanath (Chairman ISRO & Secretary DoS)"
                    },
                    {
                      "title": "Pariksha Pe Charcha 2024 Certification",
                      "organization": "Ministry of Education & NCERT",
                      "year": "2024",
                      "signatory": "Prof. Dinesh Prasad Saklani (Director, NCERT)"
                    },
                    {
                      "title": "Swachh Bharat Mission Grameen Quiz Certification",
                      "organization": "Ministry of Jal Shakti & MyGov",
                      "year": "2024",
                      "signatory": "Ms. Vini Mahajan (Secretary, DDWS)"
                    }
                  ],
                  "timestamp": "%s"
                }
                """.formatted(Instant.now().toString());
            sendJsonResponse(exchange, 200, json);
        }
    }

    // ── 6. Contact Submission & Messages Handler ──
    static class ContactHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();

            if ("OPTIONS".equalsIgnoreCase(method)) {
                sendJsonResponse(exchange, 204, "");
                return;
            }

            if ("POST".equalsIgnoreCase(method)) {
                String body = readRequestBody(exchange);
                String clientIp = exchange.getRemoteAddress().getAddress().getHostAddress();

                // Simple JSON field parsing without heavy external parser
                String name = extractJsonField(body, "name");
                String email = extractJsonField(body, "email");
                String subject = extractJsonField(body, "subject");
                String message = extractJsonField(body, "message");

                if (name.isBlank() || email.isBlank() || message.isBlank()) {
                    String err = """
                        {
                          "success": false,
                          "message": "Validation error: name, email, and message are required fields.",
                          "timestamp": "%s"
                        }
                        """.formatted(Instant.now().toString());
                    sendJsonResponse(exchange, 400, err);
                    return;
                }

                String id = UUID.randomUUID().toString();
                String timestamp = Instant.now().toString();

                Map<String, String> record = new HashMap<>();
                record.put("id", id);
                record.put("name", name);
                record.put("email", email);
                record.put("subject", subject.isBlank() ? "General Inquiry" : subject);
                record.put("message", message);
                record.put("ip", clientIp);
                record.put("createdAt", timestamp);

                contactMessages.add(record);

                // Persist to audit log file
                try (BufferedWriter writer = new BufferedWriter(new FileWriter(logFile, true))) {
                    writer.write(String.format("[%s] ID: %s | %s <%s> | Subject: %s | IP: %s\nMessage: %s\n---\n",
                        timestamp, id, name, email, subject, clientIp, message.replace("\n", " ")));
                } catch (IOException ignored) {}

                String res = String.format("""
                    {
                      "success": true,
                      "message": "Thank you, %s! Your message has been received by Aditya's backend.",
                      "data": {
                        "id": "%s",
                        "status": "DELIVERED",
                        "createdAt": "%s"
                      },
                      "timestamp": "%s"
                    }
                    """,
                    escapeJson(name), id, timestamp, timestamp
                );
                sendJsonResponse(exchange, 201, res);
                return;
            }

            if ("GET".equalsIgnoreCase(method)) {
                StringBuilder sb = new StringBuilder();
                sb.append("[\n");
                for (int i = 0; i < contactMessages.size(); i++) {
                    Map<String, String> m = contactMessages.get(i);
                    sb.append(String.format("""
                        {
                          "id": "%s",
                          "name": "%s",
                          "email": "%s",
                          "subject": "%s",
                          "message": "%s",
                          "createdAt": "%s"
                        }%s
                        """,
                        m.get("id"),
                        escapeJson(m.get("name")),
                        escapeJson(m.get("email")),
                        escapeJson(m.get("subject")),
                        escapeJson(m.get("message")),
                        m.get("createdAt"),
                        (i < contactMessages.size() - 1 ? "," : "")
                    ));
                }
                sb.append("]");

                String res = String.format("""
                    {
                      "success": true,
                      "count": %d,
                      "data": %s,
                      "timestamp": "%s"
                    }
                    """,
                    contactMessages.size(), sb.toString(), Instant.now().toString()
                );
                sendJsonResponse(exchange, 200, res);
                return;
            }

            sendJsonResponse(exchange, 405, "{\"error\": \"Method not allowed\"}");
        }

        private String extractJsonField(String json, String field) {
            if (json == null) return "";
            java.util.regex.Pattern p = java.util.regex.Pattern.compile(
                "\"" + java.util.regex.Pattern.quote(field) + "\"\\s*:\\s*\"([^\"]*)\""
            );
            java.util.regex.Matcher m = p.matcher(json);
            if (m.find()) {
                return m.group(1).trim();
            }
            return "";
        }
    }

    // ── 7. Analytics Handlers ──
    static class AnalyticsVisitHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            totalVisits.incrementAndGet();
            String ip = exchange.getRemoteAddress().getAddress().getHostAddress();
            uniqueIps.add(ip);

            String json = """
                {
                  "success": true,
                  "message": "Page view recorded",
                  "totalVisits": %d,
                  "timestamp": "%s"
                }
                """.formatted(totalVisits.get(), Instant.now().toString());
            sendJsonResponse(exchange, 200, json);
        }
    }

    static class AnalyticsStatsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            long uptimeSeconds = java.time.Duration.between(serverStartTime, Instant.now()).getSeconds();

            String json = String.format("""
                {
                  "success": true,
                  "data": {
                    "totalPageViews": %d,
                    "uniqueVisitors": %d,
                    "totalInquiriesReceived": %d,
                    "serverUptimeSeconds": %d,
                    "serverStartTime": "%s"
                  },
                  "timestamp": "%s"
                }
                """,
                totalVisits.get(),
                uniqueIps.size(),
                contactMessages.size(),
                uptimeSeconds,
                serverStartTime.toString(),
                Instant.now().toString()
            );
            sendJsonResponse(exchange, 200, json);
        }
    }

    // ── 8. Static File Handler (Serves dist/ or index.html if available) ──
    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if (path == null || path.equals("/")) path = "/index.html";

            // Check if file exists in dist/ or public/
            Path filePath = Path.of("dist" + path);
            if (!Files.exists(filePath)) {
                filePath = Path.of("public" + path);
            }
            if (!Files.exists(filePath) && path.endsWith(".html")) {
                filePath = Path.of("index.html");
            }

            if (Files.exists(filePath) && !Files.isDirectory(filePath)) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    if (path.endsWith(".css")) contentType = "text/css";
                    else if (path.endsWith(".js")) contentType = "application/javascript";
                    else if (path.endsWith(".json")) contentType = "application/json";
                    else if (path.endsWith(".svg")) contentType = "image/svg+xml";
                    else if (path.endsWith(".png")) contentType = "image/png";
                    else if (path.endsWith(".jpg") || path.endsWith(".jpeg")) contentType = "image/jpeg";
                    else if (path.endsWith(".pdf")) contentType = "application/pdf";
                    else contentType = "text/html; charset=UTF-8";
                }

                exchange.getResponseHeaders().set("Content-Type", contentType);
                byte[] bytes = Files.readAllBytes(filePath);
                exchange.sendResponseHeaders(200, bytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(bytes);
                }
                return;
            }

            // Fallback for root /
            String welcomeHtml = """
                <!DOCTYPE html>
                <html>
                <head>
                  <title>Aditya Pandey - Portfolio Java Backend</title>
                  <style>
                    body { font-family: monospace; background: #07090e; color: #a3be8c; padding: 40px; }
                    h1 { color: #fff; }
                    a { color: #88c0d0; }
                    .card { background: #0c1018; border: 1px solid #2e3440; padding: 20px; border-radius: 8px; margin: 20px 0; }
                  </style>
                </head>
                <body>
                  <h1>Aditya Pandey Portfolio — Java Backend is Online</h1>
                  <p>Status: <strong>HEALTHY (Port 8080)</strong></p>
                  <div class="card">
                    <h3>Explore REST Endpoints:</h3>
                    <ul>
                      <li><a href="/api/health">GET /api/health</a></li>
                      <li><a href="/api/portfolio">GET /api/portfolio</a></li>
                      <li><a href="/api/projects">GET /api/projects</a></li>
                      <li><a href="/api/skills">GET /api/skills</a></li>
                      <li><a href="/api/achievements">GET /api/achievements</a></li>
                      <li><a href="/api/analytics/stats">GET /api/analytics/stats</a></li>
                      <li><a href="/api/contact/messages">GET /api/contact/messages</a></li>
                    </ul>
                  </div>
                </body>
                </html>
                """;
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            byte[] bytes = welcomeHtml.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, bytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(bytes);
            }
        }
    }
}
