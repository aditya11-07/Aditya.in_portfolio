package com.aditya.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application Entry Point for Aditya Pandey's Portfolio.
 */
@SpringBootApplication
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        System.out.println("""
            ===================================================================
               ADITYA PANDEY PORTFOLIO - SPRING BOOT JAVA BACKEND ACTIVE
               Port: 8080
               REST API Endpoints:
                 - GET  http://localhost:8080/api/health
                 - GET  http://localhost:8080/api/portfolio
                 - GET  http://localhost:8080/api/projects
                 - GET  http://localhost:8080/api/skills
                 - GET  http://localhost:8080/api/achievements
                 - POST http://localhost:8080/api/contact
                 - GET  http://localhost:8080/api/contact/messages
                 - POST http://localhost:8080/api/analytics/visit
                 - GET  http://localhost:8080/api/analytics/stats
            ===================================================================
            """);
    }
}
