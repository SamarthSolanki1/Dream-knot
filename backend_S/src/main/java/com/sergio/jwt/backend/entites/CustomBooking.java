package com.sergio.jwt.backend.entites;

import jakarta.persistence.*;
import java.time.LocalDate;



@Entity
public class CustomBooking {

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public CustomVenue getCustomVenue() {
        return customVenue;
    }

    public void setCustomVenue(CustomVenue customVenue) {
        this.customVenue = customVenue;
    }

    public DiningEntity getDining() {
        return dining;
    }

    public void setDining(DiningEntity dining) {
        this.dining = dining;
    }

    public LightingEntity getLighting() {
        return lighting;
    }

    public void setLighting(LightingEntity lighting) {
        this.lighting = lighting;
    }

    public EntranceEntity getEntrance() {
        return entrance;
    }

    public void setEntrance(EntranceEntity entrance) {
        this.entrance = entrance;
    }

    public PathwayEntity getPathway() {
        return pathway;
    }

    public void setPathway(PathwayEntity pathway) {
        this.pathway = pathway;
    }

    public MandapEntity getMandap() {
        return mandap;
    }

    public void setMandap(MandapEntity mandap) {
        this.mandap = mandap;
    }

    public Photographer getPhotographer() {
        return photographer;
    }

    public void setPhotographer(Photographer photographer) {
        this.photographer = photographer;
    }

    public CarRental getCarRental() {
        return CarRental;
    }

    public void setCarRental(CarRental CarRental) {
        this.CarRental = CarRental;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    private CustomVenue customVenue;

    @ManyToOne
    @JoinColumn(name = "dining_id", nullable = false)
    private DiningEntity dining;

    @ManyToOne
    @JoinColumn(name = "lighting_id", nullable = false)
    private LightingEntity lighting;

    @ManyToOne
    @JoinColumn(name = "entrance_id", nullable = false)
    private EntranceEntity entrance;

    @ManyToOne
    @JoinColumn(name = "pathway_id", nullable = false)
    private PathwayEntity pathway;

    @ManyToOne
    @JoinColumn(name = "mandap_id", nullable = false)
    private MandapEntity mandap;

    @ManyToOne
    @JoinColumn(name = "photographer_id", nullable = false)
    private Photographer photographer;

    @ManyToOne
    @JoinColumn(name = "car_rental_id", nullable = false)
    private CarRental CarRental;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = true)
    private Employee employee; // Initially null, assigned by admin

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;
    private String status; // e.g., "Pending", "Confirmed", "Completed"

}
