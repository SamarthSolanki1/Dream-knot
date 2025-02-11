package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.entites.*;
import com.sergio.jwt.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomBookingService {

    @Autowired
    private CustomBookingRepository customBookingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomVenueRepository customVenueRepository;

    @Autowired
    private DiningRepository diningEntityRepository;

    @Autowired
    private LightingRepository lightingEntityRepository;

    @Autowired
    private EntranceRepository entranceEntityRepository;

    @Autowired
    private PathwayRepository pathwayEntityRepository;

    @Autowired
    private MandapRepository mandapEntityRepository;

    @Autowired
    private PhotographerRepository photographerRepository;

    @Autowired
    private CarRentalRepository carRentalRepository;

    public List<CustomBooking> getAllCustomBookings() {
        return customBookingRepository.findAll();
    }

    public Optional<CustomBooking> getCustomBookingById(Long id) {
        return customBookingRepository.findById(id);
    }

    public List<CustomBooking> getBookingsByUserId(Long userId) {
        return customBookingRepository.findByUserId(userId);
    }

    public CustomBooking createCustomBooking(CustomBooking customBooking) {
        System.out.println("Received Booking Data: " + customBooking);
        customBooking.setStatus("Pending");// Default status
        if (customBooking.getUser() == null || customBooking.getUser().getId() == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        Long userid = customBooking.getUser().getId();
        if (userid == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        System.out.println(userid);
        System.out.println("Received Booking Data: " + customBooking);
        User user = userRepository.findById(userid)
                .orElseThrow(() -> new RuntimeException("User not found"));
        customBooking.setUser(user);
        CustomVenue venue = customVenueRepository.findById(customBooking.getCustomVenue().getId())
                .orElseThrow(() -> new RuntimeException("Venue not found"));

        DiningEntity dining = diningEntityRepository.findById(customBooking.getDining().getId())
                .orElseThrow(() -> new RuntimeException("Dining option not found"));

        LightingEntity lighting = lightingEntityRepository.findById(customBooking.getLighting().getId())
                .orElseThrow(() -> new RuntimeException("Lighting option not found"));

        EntranceEntity entrance = entranceEntityRepository.findById(customBooking.getEntrance().getId())
                .orElseThrow(() -> new RuntimeException("Entrance option not found"));

        PathwayEntity pathway = pathwayEntityRepository.findById(customBooking.getPathway().getId())
                .orElseThrow(() -> new RuntimeException("Pathway option not found"));

        MandapEntity mandap = mandapEntityRepository.findById(customBooking.getMandap().getId())
                .orElseThrow(() -> new RuntimeException("Mandap option not found"));

        Photographer photographer = photographerRepository.findById(customBooking.getPhotographer().getId())
                .orElseThrow(() -> new RuntimeException("Photographer not found"));

        CarRental carRental = carRentalRepository.findById(customBooking.getCarRental().getId())
                .orElseThrow(() -> new RuntimeException("Car rental option not found"));

        // Set fetched entities to the booking
        customBooking.setUser(user);
        customBooking.setCustomVenue(venue);
        customBooking.setDining(dining);
        customBooking.setLighting(lighting);
        customBooking.setEntrance(entrance);
        customBooking.setPathway(pathway);
        customBooking.setMandap(mandap);
        customBooking.setPhotographer(photographer);
        customBooking.setCarRental(carRental);

        // Employee is initially null (admin assigns it later)
        customBooking.setEmployee(null);

        // Save the booking
        return customBookingRepository.save(customBooking);

    }

    public CustomBooking assignEmployee(Long bookingId, Long employeeId) {
        Optional<CustomBooking> optionalBooking = customBookingRepository.findById(bookingId);
        if (optionalBooking.isPresent()) {
            CustomBooking booking = optionalBooking.get();
            Employee employee = new Employee(); // Fetch employee by ID if needed
            employee.setId(employeeId);
            booking.setStatus("Success");
            booking.setEmployee(employee);
            return customBookingRepository.save(booking);
        }
        return null;
    }

    public void deleteCustomBooking(Long id) {
        customBookingRepository.deleteById(id);
    }
}