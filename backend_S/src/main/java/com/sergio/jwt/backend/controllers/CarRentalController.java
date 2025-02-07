package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.dtos.CarRentalDTO;
import com.sergio.jwt.backend.entites.CarRental;
import com.sergio.jwt.backend.services.CarRentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;




@RestController
@RequestMapping("/api/car-rental")
@CrossOrigin(origins = "http://localhost:4000")
public class CarRentalController {

    private static final Logger logger = LoggerFactory.getLogger(CarRentalController.class);

    @Autowired
    private CarRentalService carRentalService;

    @PostMapping("/add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addCarRental(@RequestBody CarRentalDTO carRentalDTO) {
        try {
            logger.info("Received car rental data: {}", carRentalDTO.getModelName());
            CarRental savedCarRental = carRentalService.saveCarRental(carRentalDTO);
            return ResponseEntity.ok(savedCarRental);
        } catch (Exception e) {
            logger.error("Error saving car rental details", e);
            return ResponseEntity.badRequest().body("Error saving car rental: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CarRentalDTO>> getAllCarRentals() {
        try {
            List<CarRentalDTO> carRentals = carRentalService.getAllCarRentals();
            return ResponseEntity.ok(carRentals);
        } catch (Exception e) {
            logger.error("Error fetching car rental details", e);
            return ResponseEntity.badRequest().body(null);
        }
    }
}
