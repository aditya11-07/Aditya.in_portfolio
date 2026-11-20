# Aditya Pandey Portfolio — Java Backend System

Production-grade Java REST API backend engineered for Aditya Pandey's engineering portfolio.

---

## 🚀 Key Features

- **Modern Concurrency:** Virtual Threads (`Executors.newVirtualThreadPerTaskExecutor()`) for lightweight, high-throughput asynchronous request handling.
- **RESTful Endpoints:** Full JSON API for portfolio projects, rocketry telemetry stats, ISRO certifications, and skills.
- **Live Contact Inquiries:** Handles contact form submissions with input validation, in-memory caching, and persistent audit logging to `contact_messages.log`.
- **Visitor Telemetry:** Real-time pageview and unique visitor tracking.
- **Dual Architecture:**
  1. **Zero-Dependency Standalone Mode:** Runs instantly with standard JDK libraries (`com.sun.net.httpserver.HttpServer`) using `java backend/StandaloneServer.java`. No Maven or Gradle download required!
  2. **Enterprise Spring Boot 3 Mode:** Full Spring Web + Actuator Maven project ready for enterprise deployments.

---

## 🛠️ Quick Start

### Option 1: Instant Standalone Server (Zero Dependencies)
Requires only standard Java 21+ or 26 installed:

```bash
# Direct run
java backend/StandaloneServer.java

# Or pre-compile and run
javac -d bin backend/StandaloneServer.java
java -cp bin com.aditya.portfolio.StandaloneServer
```

The server starts immediately on **`http://localhost:8085`**.

### Option 2: Enterprise Spring Boot 3 (Maven)

```bash
cd backend
mvn clean spring-boot:run
```

Or build a production runnable JAR:
```bash
mvn clean package
java -jar target/portfolio-backend-1.0.0.jar
```

---

## 📡 REST API Reference

### 1. Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "success": true,
  "message": "Aditya Pandey Portfolio Backend is Healthy and Operational",
  "data": {
    "status": "UP",
    "javaVersion": "26.0.2",
    "totalMemoryMb": 128,
    "freeMemoryMb": 94,
    "activeThreads": 8
  },
  "timestamp": "2026-11-20T18:40:00Z"
}
```

---

### 2. Contact Submission
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Sarah Connor",
  "email": "sarah@cyberdyne.com",
  "subject": "Avionics Engineering Opportunity",
  "message": "Hi Aditya, impressed with your TRISHUL II rocketry avionics. Let's discuss an engineering role."
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Thank you, Sarah Connor! Your message has been received by Aditya's backend.",
  "data": {
    "id": "c89b21e4-3f11-482a-9e20-7b24d6738910",
    "status": "DELIVERED",
    "createdAt": "2026-11-20T18:41:20Z"
  },
  "timestamp": "2026-11-20T18:41:20Z"
}
```

---

### 3. List Inquiries (Admin)
```http
GET /api/contact/messages
```

---

### 4. Full Portfolio Data
```http
GET /api/portfolio
```
Returns personal bio, contact info, rocketry team milestones, and achievements.

---

### 5. Projects Listing
```http
GET /api/projects
GET /api/projects?category=Aerospace%20Avionics
```

---

### 6. Skills & Technology Stack
```http
GET /api/skills
```

---

### 7. Honors & Certifications
```http
GET /api/achievements
```

---

### 8. Analytics & Telemetry
```http
# Record page visit
POST /api/analytics/visit
Content-Type: application/json

{
  "path": "/#showcase",
  "referrer": "linkedin.com",
  "userAgent": "Mozilla/5.0..."
}

# View live telemetry stats
GET /api/analytics/stats
```
**Response:**
```json
{
  "success": true,
  "data": {
    "totalPageViews": 142,
    "uniqueVisitors": 38,
    "totalInquiriesReceived": 4,
    "serverUptimeSeconds": 7200,
    "serverStartTime": "2026-11-20T16:00:00Z"
  }
}
```

---

## 🔒 Security & CORS

All endpoints include pre-configured CORS headers (`Access-Control-Allow-Origin: *`) allowing seamless communication with the Vite frontend running on `http://localhost:3000` or deployed production domains.
