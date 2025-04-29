package com.sergio.jwt.backend.services;


import com.sergio.jwt.backend.entites.*;
import com.sergio.jwt.backend.entites.Package;
import com.sergio.jwt.backend.repositories.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import java.io.ByteArrayOutputStream;
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

    @Autowired
    private JavaMailSender mailSender; // Ensure JavaMailSender is properly injected

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

    public DecorDetail saveDecorDetail(DecorDetail decorDetail) {
        return decorDetailRepository.save(decorDetail);
    }

    public Booking saveBooking(Booking booking, String employeeName) throws Exception {
        Optional<Booking> existingBooking = bookingRepository.findByVenueIdAndEventDate(
                booking.getVenue().getId(),
                booking.getEventDate()
        );


        if (existingBooking.isPresent()) {
            System.out.println(existingBooking);
            throw new Exception("The selected venue is already booked for the given date.");
        }

        if (booking.getVenue() == null || booking.getBookingPackage() == null) {
            throw new IllegalArgumentException("Venue and Package cannot be null");
        }

        Venue venue = venueRepository.findById(booking.getVenue().getId())
                .orElseThrow(() -> new RuntimeException("Venue not found"));

        Package bookingPackage = packageRepository.findById(booking.getBookingPackage().getId())
                .orElseThrow(() -> new RuntimeException("Package not found"));

        User user = userRepository.findById(booking.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Employee employee = employeeRepository.findByName(employeeName)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        booking.setVenue(venue);
        booking.setBookingPackage(bookingPackage);
        booking.setUser(user);
        booking.setEmployee(employee);

        Booking savedBooking = bookingRepository.save(booking);

        // Send email with invoice
        sendInvoiceEmail(user.getEmail(), user.getName(), venue.getName(), bookingPackage.getTitle(), booking.getBookingDate().toString(), bookingPackage.getPrice());

        return savedBooking;
    }

    public void sendInvoiceEmail(String to, String userName, String venueName, String packageName, String date, String price) {
        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("Your Wedding Booking Invoice");

            String emailBody = "Dear " + userName + ",\n\n"
                    + "📅 **Booking Details:**\n"
                    + "🏛 Venue: " + venueName + "\n"
                    + "🎁 Package: " + packageName + "\n"
                    + "📆 Date: " + date + "\n"
                    + "💰 Total Price: $" + price + "\n\n"
                    + "We appreciate your trust in us. If you have any questions, feel free to contact us.\n\n"
                    + "Best regards,\nDreamNot Team";

            helper.setText(emailBody, false); // false = Plain text email

            // Attach PDF

            mailSender.send(message);
            System.out.println("✅ Invoice email sent successfully to: " + to);
        } catch (MessagingException e) {
            System.err.println("❌ Failed to send invoice email: " + e.getMessage());
            e.printStackTrace();
        }
    }



    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getBookingsByVenueId(Long venueId) {
        return bookingRepository.findByVenueId(venueId);
    }

    public List<Booking> getBookingsByEmployeeId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        String userEmail = user.getEmail();

        Employee employee = employeeRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Employee not found with email: " + userEmail));

        return bookingRepository.findByEmployeeId(employee.getId());
    }

    public List<Booking> getallBookings() {
        return bookingRepository.findAll();
    }
}
