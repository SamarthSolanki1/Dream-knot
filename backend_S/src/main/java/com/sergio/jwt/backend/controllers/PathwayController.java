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

import java.util.List;

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

    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<PathwayDTO>> getAllPathways() {
        try {
            List<PathwayDTO> pathways = pathwayService.getAllPathways();
            return ResponseEntity.ok(pathways);
        } catch (Exception e) {
            logger.error("Error fetching pathway details", e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}
