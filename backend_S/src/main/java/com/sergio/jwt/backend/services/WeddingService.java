package com.sergio.jwt.backend.services;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.sergio.jwt.backend.entites.*;
import com.sergio.jwt.backend.entites.Package;
import com.sergio.jwt.backend.repositories.*;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;

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
            byte[] pdfBytes = generateInvoice(userName, venueName, packageName, date, String.valueOf(Double.parseDouble(price)));

            if (pdfBytes == null) {
                System.err.println("Error: PDF invoice generation failed.");
                return;
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("Your Wedding Booking Invoice");

            String emailBody = "Dear " + userName + ",\n\n"
                    + "Thank you for booking with DreamNot! Please find your invoice attached.\n\n"
                    + "📅 **Booking Details:**\n"
                    + "🏛 Venue: " + venueName + "\n"
                    + "🎁 Package: " + packageName + "\n"
                    + "📆 Date: " + date + "\n"
                    + "💰 Total Price: $" + price + "\n\n"
                    + "We appreciate your trust in us. If you have any questions, feel free to contact us.\n\n"
                    + "Best regards,\nDreamNot Team";

            helper.setText(emailBody, false); // false = Plain text email

            // Attach PDF
            helper.addAttachment("Invoice.pdf", new ByteArrayResource(pdfBytes));

            mailSender.send(message);
            System.out.println("✅ Invoice email sent successfully to: " + to);
        } catch (MessagingException e) {
            System.err.println("❌ Failed to send invoice email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static byte[] generateInvoice(String customerName, String venueName, String packageName, String date, String price) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc, PageSize.A4);
            document.setMargins(20, 20, 20, 20);

            // ✅ 1. Invoice Title
            Paragraph title = new Paragraph("DreamKnot Wedding Booking Invoice")
                    .setFontSize(18)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(title);

            // ✅ 2. Company Details
            Paragraph companyDetails = new Paragraph("DreamKnot Weddings Pvt. Ltd.\n123 Wedding Street, City, Country\nContact: +123 456 7890 | Email: info@dreamknot.com")
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(15);
            document.add(companyDetails);

            // ✅ 3. Customer Details
            Paragraph customerInfo = new Paragraph("Billed To:\n" + customerName)
                    .setFontSize(12)
                    .setBold()
                    .setMarginBottom(10);
            document.add(customerInfo);

            // ✅ 4. Booking Details Table
            float[] columnWidths = {4, 6}; // Two-column table
            Table table = new Table(columnWidths);
            table.setWidth(UnitValue.createPercentValue(100));

            // Add table header row
            table.addHeaderCell(new Cell().add(new Paragraph("Description").setBold()).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Details").setBold()).setBackgroundColor(ColorConstants.LIGHT_GRAY));

            // Add booking details
            table.addCell("Venue");
            table.addCell(venueName);
            table.addCell("Package");
            table.addCell(packageName);
            table.addCell("Booking Date");
            table.addCell(date);
            table.addCell("Total Price");
            table.addCell("$" + price);

            document.add(table.setMarginBottom(20));

            // ✅ 5. Total Amount
            Paragraph totalAmount = new Paragraph("Total Amount Payable: $" + price)
                    .setFontSize(14)
                    .setBold()
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setMarginBottom(20);
            document.add(totalAmount);

            // ✅ 6. Footer Message
            Paragraph footer = new Paragraph("Thank you for choosing DreamKnot Weddings!\nWe look forward to making your special day truly magical.")
                    .setFontSize(10)
                    .setItalic()
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(footer);

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            System.err.println("❌ Error generating invoice PDF: " + e.getMessage());
            e.printStackTrace();
            return null;
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
