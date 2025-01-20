package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.dtos.DiningDTO;
import com.sergio.jwt.backend.entites.DiningEntity;
import com.sergio.jwt.backend.services.DiningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dining")
@CrossOrigin(origins = "http://localhost:4000")
public class DiningController {

    private static final Logger logger = LoggerFactory.getLogger(DiningController.class);

    @Autowired
    private DiningService diningService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addDining(@RequestBody DiningDTO diningDTO) {
        logger.info("Received dining request with data: {}", diningDTO);

        Map<String, Object> response = new HashMap<>();

        try {
            // Input validation
            if (diningDTO == null || diningDTO.getDescription() == null ||
                    diningDTO.getDescription().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Description is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Save the dining details
            DiningEntity savedDining = diningService.saveDining(diningDTO);

            if (savedDining == null) {
                response.put("success", false);
                response.put("message", "Failed to save dining details");
                return ResponseEntity.internalServerError().body(response);
            }

            response.put("success", true);
            response.put("message", "Dining details saved successfully");
            response.put("data", savedDining);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error saving dining details", e);

            response.put("success", false);
            response.put("message", "Error saving dining details: " + e.getMessage());

            return ResponseEntity.internalServerError().body(response);
        }
    }
}