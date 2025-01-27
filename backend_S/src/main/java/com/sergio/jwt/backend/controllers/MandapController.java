package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.dtos.MandapDTO;
import com.sergio.jwt.backend.entites.MandapEntity;
import com.sergio.jwt.backend.services.MandapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/mandap")
@CrossOrigin(origins = "http://localhost:4000")
public class MandapController {

    private static final Logger logger = LoggerFactory.getLogger(MandapController.class);

    @Autowired
    private MandapService mandapService;

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()") // Ensure user is authenticated
    public ResponseEntity<?> addMandap(@RequestBody MandapDTO mandapDTO) {
        try {
            logger.info("Received mandap data: {}", mandapDTO.getName());
            MandapEntity savedMandap = mandapService.saveMandap(mandapDTO);
            return ResponseEntity.ok(savedMandap);
        } catch (Exception e) {
            logger.error("Error saving mandap details", e);
            return ResponseEntity.badRequest().body("Error saving mandap: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()") // Ensure user is authenticated
    public ResponseEntity<List<MandapDTO>> getAllMandaps() {
        try {
            List<MandapDTO> mandaps = mandapService.getAllMandaps();
            return ResponseEntity.ok(mandaps);
        } catch (Exception e) {
            logger.error("Error fetching mandap details", e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}
