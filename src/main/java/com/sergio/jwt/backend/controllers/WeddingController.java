package com.sergio.jwt.backend.controllers;

import com.sergio.jwt.backend.entites.Booking;
import com.sergio.jwt.backend.entites.DecorDetail;
import com.sergio.jwt.backend.entites.Venue;
import com.sergio.jwt.backend.services.WeddingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WeddingController {

    @Autowired
    private WeddingService weddingService;

    @GetMapping("/venues")
    public List<Venue> getAllVenues() {
        return weddingService.getAllVenues();
    }

    @GetMapping("/venues/{id}")
    public Venue getVenueById(@PathVariable Long id) {
        return weddingService.getVenueById(id);
    }

    @GetMapping("/decor/{packageId}")
    public List<DecorDetail> getDecorDetailsByPackageId(@PathVariable Long packageId) {
        return weddingService.getDecorDetailsByPackageId(packageId);
    }

    @PostMapping("/venues")
    public Venue createVenue(@RequestBody Venue venue) {
        return weddingService.saveVenue(venue);
    }

    @PostMapping("/decor")
    public DecorDetail createDecorDetail(@RequestBody DecorDetail decorDetail) {
        return weddingService.saveDecorDetail(decorDetail);
    }
    @PostMapping("/booking")
    public Booking createBooking(@RequestBody Booking booking, @RequestParam String employeeName) throws Exception {
        return weddingService.saveBooking(booking, employeeName);
    }

    @GetMapping("/bookings/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Long userId) {
        return weddingService.getBookingsByUserId(userId);
    }

    @GetMapping("/bookings/venue/{venueId}")
    public List<Booking> getBookingsByVenueId(@PathVariable Long venueId) {
        return weddingService.getBookingsByVenueId(venueId);
    }
}