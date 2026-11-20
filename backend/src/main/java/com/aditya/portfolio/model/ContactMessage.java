package com.aditya.portfolio.model;

import java.time.Instant;
import java.util.UUID;

/**
 * Record representing a visitor contact inquiry submitted through the portfolio.
 */
public record ContactMessage(
    String id,
    String name,
    String email,
    String subject,
    String message,
    String ipAddress,
    Instant createdAt
) {
    public static ContactMessage create(String name, String email, String subject, String message, String ipAddress) {
        return new ContactMessage(
            UUID.randomUUID().toString(),
            name != null ? name.trim() : "",
            email != null ? email.trim() : "",
            subject != null ? subject.trim() : "General Inquiry",
            message != null ? message.trim() : "",
            ipAddress != null ? ipAddress : "127.0.0.1",
            Instant.now()
        );
    }
}
