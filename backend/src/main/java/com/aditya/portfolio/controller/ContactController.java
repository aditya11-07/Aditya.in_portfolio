package com.aditya.portfolio.controller;

import com.aditya.portfolio.model.ApiResponse;
import com.aditya.portfolio.model.ContactMessage;
import com.aditya.portfolio.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller handling contact form submissions and message inquiries.
 */
@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    public record ContactFormRequest(String name, String email, String subject, String message) {}

    @PostMapping
    public ResponseEntity<ApiResponse<ContactMessage>> submitContact(
        @RequestBody ContactFormRequest request,
        HttpServletRequest httpRequest
    ) {
        try {
            String clientIp = httpRequest != null ? httpRequest.getRemoteAddr() : "127.0.0.1";
            ContactMessage message = contactService.processContactMessage(
                request.name(),
                request.email(),
                request.subject(),
                request.message(),
                clientIp
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.ok("Thank you! Your message has been successfully received by Aditya's backend.", message)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.error("Failed to process message: " + e.getMessage())
            );
        }
    }

    @GetMapping("/messages")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMessages() {
        List<ContactMessage> list = contactService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.ok(Map.of(
            "count", list.size(),
            "messages", list
        )));
    }
}
