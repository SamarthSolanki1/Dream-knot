package com.sergio.jwt.backend.entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    private Package bookingPackage;

   // @ManyToOne
    //@JoinColumn(name = "employee_id", nullable = false) // New column for the manager
    //private Employee manager;

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;
    // e.g., Pending, Confirmed, Cancelled

    // Getters and Setters
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee; // Add this field for employee

    // Other fields...

    // Getters and Setters
    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }


    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Package getBookingPackage() {
        return bookingPackage;
    }

    public void setBookingPackage(Package bookingPackage) {
        this.bookingPackage = bookingPackage;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
