package com.aditya.portfolio.controller;

import com.aditya.portfolio.model.ApiResponse;
import com.aditya.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller exposing Aditya Pandey's engineering portfolio data.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> healthCheck() {
        return ResponseEntity.ok(ApiResponse.ok("Aditya Pandey Portfolio API is healthy and operational", Map.of(
            "status", "UP",
            "environment", "production",
            "runtime", System.getProperty("java.version"),
            "jvmVendor", System.getProperty("java.vendor"),
            "totalMemoryMb", Runtime.getRuntime().totalMemory() / (1024 * 1024),
            "freeMemoryMb", Runtime.getRuntime().freeMemory() / (1024 * 1024)
        )));
    }

    @GetMapping("/portfolio")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getFullPortfolio() {
        return ResponseEntity.ok(ApiResponse.ok(portfolioService.getFullPortfolio()));
    }

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getProjects(
        @RequestParam(required = false) String category
    ) {
        List<Map<String, Object>> allProjects = portfolioService.getProjects();
        if (category == null || category.isBlank()) {
            return ResponseEntity.ok(ApiResponse.ok(allProjects));
        }

        List<Map<String, Object>> filtered = allProjects.stream()
            .filter(p -> category.equalsIgnoreCase((String) p.get("category")))
            .toList();

        return ResponseEntity.ok(ApiResponse.ok(filtered));
    }

    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<Map<String, List<String>>>> getSkills() {
        return ResponseEntity.ok(ApiResponse.ok(portfolioService.getSkills()));
    }

    @GetMapping("/achievements")
    public ResponseEntity<ApiResponse<List<Map<String, String>>>> getAchievements() {
        return ResponseEntity.ok(ApiResponse.ok(portfolioService.getAchievements()));
    }
}
