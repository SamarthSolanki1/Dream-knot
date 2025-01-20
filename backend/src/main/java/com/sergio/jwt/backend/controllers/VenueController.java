package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.dtos.VenueDTO;
import com.sergio.jwt.backend.entites.VenueEntity;
import com.sergio.jwt.backend.services.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/venue")
@CrossOrigin(origins = "http://localhost:4000")
public class VenueController {

    private static final Logger logger = LoggerFactory.getLogger(VenueController.class);

    @Autowired
    private VenueService venueService;

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addVenue(@RequestBody VenueDTO venueDTO) {
        try {
            logger.info("Received venue data: {}", venueDTO.getName());
            VenueEntity savedVenue = venueService.saveVenue(venueDTO);
            return ResponseEntity.ok(savedVenue);
        } catch (Exception e) {
            logger.error("Error saving venue details", e);
            return ResponseEntity.badRequest().body("Error saving venue: " + e.getMessage());
        }
    }
}