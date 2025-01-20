package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.dtos.EntranceDTO;
import com.sergio.jwt.backend.entities.EntranceEntity;
import com.sergio.jwt.backend.services.EntranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/entrance")
@CrossOrigin(origins = "http://localhost:4000")
public class EntranceController {

    private static final Logger logger = LoggerFactory.getLogger(EntranceController.class);

    @Autowired
    private EntranceService entranceService;

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addEntrance(@RequestBody EntranceDTO entranceDTO) {
        try {
            logger.info("Received entrance data: {}", entranceDTO.getThemeType());
            EntranceEntity savedEntrance = entranceService.saveEntrance(entranceDTO);
            return ResponseEntity.ok(savedEntrance);
        } catch (Exception e) {
            logger.error("Error saving entrance details", e);
            return ResponseEntity.badRequest().body("Error saving entrance: " + e.getMessage());
        }
    }
}