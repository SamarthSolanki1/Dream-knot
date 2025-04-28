package com.sergio.jwt.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
public class DeepAIController {

    @Value("${huggingface.api.key}")
    private String huggingFaceApiKey;

    @PostMapping("/generate")
    public ResponseEntity<?> generateImage(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");

        if (prompt == null || prompt.isEmpty()) {
            return ResponseEntity.badRequest().body("Prompt cannot be empty");
        }

        // Log the API key (first few chars only for security)
        String keyPrefix = huggingFaceApiKey.length() > 4 ? huggingFaceApiKey.substring(0, 4) + "..." : "empty";
        System.out.println("Using Hugging Face API key starting with: " + keyPrefix);

        // Set up headers for Hugging Face API
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + huggingFaceApiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Choose a specific model from Hugging Face
        String model = "stabilityai/stable-diffusion-xl-base-1.0";
        String apiUrl = "https://api-inference.huggingface.co/models/" + model;

        // Create request body with prompt and options
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("inputs", prompt);

        Map<String, Object> options = new HashMap<>();
        options.put("wait_for_model", true);
        requestBody.put("options", options);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Hugging Face returns the image as bytes
            ResponseEntity<byte[]> response = restTemplate.exchange(
                    apiUrl,
                    HttpMethod.POST,
                    entity,
                    byte[].class
            );

            // Convert image bytes to base64 for frontend display
            byte[] imageBytes = response.getBody();
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            return ResponseEntity.ok(Map.of("image", "data:image/jpeg;base64," + base64Image));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "error", "Error generating image: " + e.getMessage(),
                            "full_error", e.toString()
                    ));
        }
    }
}