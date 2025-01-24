package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.dtos.LightingDTO;
import com.sergio.jwt.backend.services.LightingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/lighting")
@CrossOrigin(origins = "http://localhost:4000")
public class LightingController {

    private static final Logger logger = LoggerFactory.getLogger(LightingController.class);

    @Autowired
    private LightingService lightingService;

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addLighting(@RequestBody LightingDTO lightingDTO) {
        try {
            logger.info("Received lighting data: {}", lightingDTO.getLightingType());
            return ResponseEntity.ok(lightingService.saveLighting(lightingDTO));
        } catch (Exception e) {
            logger.error("Error saving lighting details", e);
            return ResponseEntity.badRequest().body("Error saving lighting: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<LightingDTO>> getAllLightingOptions() {
        try {
            return ResponseEntity.ok(lightingService.getAllLightingOptions());
        } catch (Exception e) {
            logger.error("Error fetching lighting details", e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}
