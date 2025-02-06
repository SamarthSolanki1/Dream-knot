package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.dtos.PhotographerDTO;
import com.sergio.jwt.backend.entites.Photographer;
import com.sergio.jwt.backend.services.PhotographerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/photographer")
@CrossOrigin(origins = "http://localhost:4000")
public class PhotographerController {
    private static final Logger logger = LoggerFactory.getLogger(MandapController.class);

    @Autowired
    private PhotographerService photographerService;

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addPhotographer(@RequestBody PhotographerDTO photographerDTO) {
        try {
            Photographer savedPhotographer = photographerService.savePhotographer(photographerDTO);
            return ResponseEntity.ok(savedPhotographer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving photographer: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<PhotographerDTO>> getAllPhotographers() {
        try {
            List<PhotographerDTO> photographers = photographerService.getAllPhotographers();
            return ResponseEntity.ok(photographers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}