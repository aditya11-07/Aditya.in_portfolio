package com.aditya.portfolio.service;

import com.aditya.portfolio.model.VisitEvent;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Service managing live visitor telemetry, pageviews, and unique visitors.
 */
@Service
public class AnalyticsService {

    private final AtomicLong totalPageViews = new AtomicLong(0);
    private final Set<String> uniqueVisitorIps = ConcurrentHashMap.newKeySet();
    private final List<VisitEvent> recentVisits = new CopyOnWriteArrayList<>();
    private final Instant startTime = Instant.now();

    public void recordVisit(String path, String referrer, String userAgent, String ip) {
        totalPageViews.incrementAndGet();
        if (ip != null && !ip.isBlank()) {
            uniqueVisitorIps.add(ip);
        }

        VisitEvent event = new VisitEvent(
            UUID.randomUUID().toString(),
            path != null ? path : "/",
            referrer != null ? referrer : "direct",
            userAgent != null ? userAgent : "unknown",
            ip != null ? ip : "127.0.0.1",
            Instant.now()
        );

        recentVisits.add(event);
        if (recentVisits.size() > 50) {
            recentVisits.remove(0);
        }
    }

    public Map<String, Object> getAnalyticsSummary() {
        return Map.of(
            "totalPageViews", totalPageViews.get(),
            "uniqueVisitors", uniqueVisitorIps.size(),
            "uptimeSeconds", java.time.Duration.between(startTime, Instant.now()).getSeconds(),
            "serverStartTime", startTime.toString(),
            "recentVisitsCount", recentVisits.size()
        );
    }
}
