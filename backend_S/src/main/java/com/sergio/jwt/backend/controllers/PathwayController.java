package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.dtos.PathwayDTO;
import com.sergio.jwt.backend.entites.PathwayEntity;
import com.sergio.jwt.backend.services.PathwayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/pathway")
@CrossOrigin(origins = "http://localhost:4000")
public class PathwayController {

    private static final Logger logger = LoggerFactory.getLogger(PathwayController.class);

    @Autowired
    private PathwayService pathwayService;

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addPathway(@RequestBody PathwayDTO pathwayDTO) {
        try {
            logger.info("Received pathway data: {}", pathwayDTO.getThemeType());
            PathwayEntity savedPathway = pathwayService.savePathway(pathwayDTO);
            return ResponseEntity.ok(savedPathway);
        } catch (Exception e) {
            logger.error("Error saving pathway details", e);
            return ResponseEntity.badRequest().body("Error saving pathway: " + e.getMessage());
        }
    }
}