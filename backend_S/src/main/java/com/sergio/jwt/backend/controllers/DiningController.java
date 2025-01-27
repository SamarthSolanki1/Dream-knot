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

import java.util.List;

@RestController
@RequestMapping("/api/dining")
@CrossOrigin(origins = "http://localhost:4000")
public class DiningController {
    private static final Logger logger = LoggerFactory.getLogger(DiningController.class);

    @Autowired
    private DiningService diningService;

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addDining(@RequestBody DiningDTO diningDTO) {
        try {
            logger.info("Received dining data: {}", diningDTO);

            // Validate key fields
            if (diningDTO.getDiningStyle() == null || diningDTO.getCapacity() == null) {
                logger.error("Validation failed: Dining style or capacity is null");
                return ResponseEntity.badRequest().body("Dining style and capacity are required");
            }

            DiningEntity savedDining = diningService.saveDining(diningDTO);

            return ResponseEntity.ok(savedDining);
        } catch (Exception e) {
            logger.error("Error saving dining details", e);
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<DiningDTO>> getAllDiningOptions() {
        try {
            List<DiningDTO> diningOptions = diningService.getAllDiningOptions();
            return ResponseEntity.ok(diningOptions);
        } catch (Exception e) {
            logger.error("Error fetching dining details", e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}