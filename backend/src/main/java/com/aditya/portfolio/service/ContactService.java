package com.aditya.portfolio.service;

import com.aditya.portfolio.model.ContactMessage;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Service managing contact form messages with in-memory cache and persistent audit log.
 */
@Service
public class ContactService {

    private final List<ContactMessage> messages = new CopyOnWriteArrayList<>();
    private final File logFile = new File("contact_messages.log");

    public ContactMessage processContactMessage(String name, String email, String subject, String message, String ipAddress) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name is required.");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("A valid email address is required.");
        }
        if (message == null || message.isBlank()) {
            throw new IllegalArgumentException("Message body cannot be empty.");
        }

        ContactMessage msg = ContactMessage.create(name, email, subject, message, ipAddress);
        messages.add(msg);
        persistToFile(msg);

        return msg;
    }

    public List<ContactMessage> getAllMessages() {
        return Collections.unmodifiableList(new ArrayList<>(messages));
    }

    public int getMessageCount() {
        return messages.size();
    }

    private synchronized void persistToFile(ContactMessage msg) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(logFile, true))) {
            String entry = String.format("[%s] ID: %s | Name: %s | Email: %s | Subject: %s | IP: %s\nMessage: %s\n---\n",
                DateTimeFormatter.ISO_INSTANT.format(msg.createdAt()),
                msg.id(),
                msg.name(),
                msg.email(),
                msg.subject(),
                msg.ipAddress(),
                msg.message().replace("\n", " ")
            );
            writer.write(entry);
        } catch (IOException e) {
            System.err.println("Failed to write contact message to audit log: " + e.getMessage());
        }
    }
}
