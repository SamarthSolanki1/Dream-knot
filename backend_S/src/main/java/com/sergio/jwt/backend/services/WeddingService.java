package com.sergio.jwt.backend.services;
import com.sergio.jwt.backend.entites.*;
import com.sergio.jwt.backend.entites.Package;
import com.sergio.jwt.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WeddingService {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private DecorDetailRepository decorDetailRepository;

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Venue getVenueById(Long id) {
        return venueRepository.findById(id).orElse(null);
    }

    public List<DecorDetail> getDecorDetailsByPackageId(Long packageId) {
        return decorDetailRepository.findAll().stream()
                .filter(decorDetail -> decorDetail.getPackage().getId().equals(packageId))
                .toList();
    }

   // public VenueEntity saveVenue(Venue venue) {
     //   return venueRepository.save(venue);
    //}

    public DecorDetail saveDecorDetail(DecorDetail decorDetail) {
        return decorDetailRepository.save(decorDetail);
    }
    public Booking saveBooking(Booking booking, String employeeName) throws Exception {
        // Validate if a booking already exists for the same venue and date
        Optional<Booking> existingBooking = bookingRepository.findByVenueIdAndBookingDate(
                booking.getVenue().getId(),
                booking.getBookingDate()
        );

        if (existingBooking.isPresent()) {
            throw new Exception("The selected venue is already booked for the given date.");
        }

        if (booking.getVenue() == null) {
            throw new IllegalArgumentException("Venue cannot be null");
        }

        if (booking.getBookingPackage() == null) {
            throw new IllegalArgumentException("Package cannot be null");
        }

        Long venueId = booking.getVenue().getId();
        Long packageId = booking.getBookingPackage().getId();

        // Fetch the venue from the repository
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new RuntimeException("Venue not found"));

        // Fetch the package from the repository
        Package bookingPackage = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        // Set the venue and package for the booking
        booking.setVenue(venue);
        booking.setBookingPackage(bookingPackage);

        Long userId = booking.getUser().getId();
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        // Fetch the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        booking.setUser(user);

        // Fetch the employee by name
        Employee employee = employeeRepository.findByName(employeeName)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        booking.setEmployee(employee);

        // Save the booking to the repository
        return bookingRepository.save(booking);
    }


    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getBookingsByVenueId(Long venueId) {
        return bookingRepository.findByVenueId(venueId);
    }
    public List<Booking> getBookingsByEmployeeId(Long userId) {
        // Step 1: Get the user by ID from the app_user table
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Step 2: Extract the email from the User object
        String userEmail = user.getEmail();

        // Step 3: Use the email to fetch the employee from the employee table
        Employee employee = employeeRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Employee not found with email: " + userEmail));

        // Step 4: Retrieve bookings for the employee using their ID
        return bookingRepository.findByEmployeeId(employee.getId());
    }

}