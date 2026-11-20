package com.aditya.portfolio.model;

import java.time.Instant;

/**
 * Record tracking an individual visitor pageview or interaction event.
 */
public record VisitEvent(
    String id,
    String path,
    String referrer,
    String userAgent,
    String ipAddress,
    Instant timestamp
) {}
