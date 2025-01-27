package com.sergio.jwt.backend.controllers;
import com.sergio.jwt.backend.dtos.CustomVenueDTO;
import com.sergio.jwt.backend.entites.CustomVenue;
import com.sergio.jwt.backend.repositories.CustomVenueRepository;
import com.sergio.jwt.backend.services.CustomVenueService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/venue")
public class CustomVenueController {

    @Autowired
    private CustomVenueService venueService;

    @PostMapping("/add")
    public ResponseEntity<?> addVenue(@RequestBody CustomVenueDTO venueDTO) {
        try {
            System.out.println("received the venue details " + venueDTO);
            CustomVenue savedVenue = venueService.saveVenue(venueDTO);
            return ResponseEntity.ok(savedVenue);
        } catch (Exception e) {
            System.out.println("Error saving venue details");
            return ResponseEntity.badRequest().body("Error saving venue: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<CustomVenueDTO>> getAllVenues() {
        try {
            List<CustomVenueDTO> venues = venueService.getAllVenues();
            return ResponseEntity.ok(venues);
        } catch (Exception e) {
            System.out.println("Error fetching venue details");
            return ResponseEntity.badRequest().body(null);
        }
    }
}



