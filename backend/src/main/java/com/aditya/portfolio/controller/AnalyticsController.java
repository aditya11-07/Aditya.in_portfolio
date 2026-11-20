package com.aditya.portfolio.controller;

import com.aditya.portfolio.model.ApiResponse;
import com.aditya.portfolio.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST Controller recording and reporting visitor analytics and telemetry.
 */
@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    public record VisitRequest(String path, String referrer, String userAgent) {}

    @PostMapping("/visit")
    public ResponseEntity<ApiResponse<String>> recordVisit(
        @RequestBody(required = false) VisitRequest request,
        HttpServletRequest httpRequest
    ) {
        String path = request != null ? request.path() : "/";
        String referrer = request != null ? request.referrer() : "direct";
        String userAgent = request != null ? request.userAgent() : "unknown";
        String ip = httpRequest != null ? httpRequest.getRemoteAddr() : "127.0.0.1";

        analyticsService.recordVisit(path, referrer, userAgent, ip);
        return ResponseEntity.ok(ApiResponse.ok("Telemetry recorded", "OK"));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStats() {
        return ResponseEntity.ok(ApiResponse.ok(analyticsService.getAnalyticsSummary()));
    }
}
