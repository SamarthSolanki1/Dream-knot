package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.entites.CustomBooking;
import com.sergio.jwt.backend.services.CustomBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/custom-bookings")
@CrossOrigin(origins = "*")
public class CustomBookingController {

    @Autowired
    private CustomBookingService customBookingService;

    @GetMapping
    public List<CustomBooking> getAllCustomBookings() {
        return customBookingService.getAllCustomBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomBooking> getCustomBookingById(@PathVariable Long id) {
        Optional<CustomBooking> booking = customBookingService.getCustomBookingById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<CustomBooking> getBookingsByUser(@PathVariable Long userId) {
        return customBookingService.getBookingsByUserId(userId);
    }

    @PostMapping
    public CustomBooking createCustomBooking(@RequestBody CustomBooking customBooking) {
        return customBookingService.createCustomBooking(customBooking);
    }

    @PutMapping("/{id}/assign-employee/{employeeId}")
    public ResponseEntity<CustomBooking> assignEmployee(@PathVariable Long id, @PathVariable Long employeeId) {
        CustomBooking updatedBooking = customBookingService.assignEmployee(id, employeeId);
        return updatedBooking != null ? ResponseEntity.ok(updatedBooking) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomBooking(@PathVariable Long id) {
        customBookingService.deleteCustomBooking(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/check-bookings")
    public ResponseEntity<List<CustomBooking>> getBookedItemsByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate eventDate) {
        List<CustomBooking> bookedItems = customBookingService.getBookedItemsByDate(eventDate);
        return ResponseEntity.ok(bookedItems);
    }
}
