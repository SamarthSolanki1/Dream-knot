package com.sergio.jwt.backend.entites;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dining")
@Data
public class DiningEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dining_style")
    private String diningStyle;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "menu_options")
    private String menuOptions;

    @Column(name = "staffing_options")
    private String staffingOptions;

    @Column(name = "food_service_price")
    private Double foodServicePrice;

    @Column(name = "staffing_price")
    private Double staffingPrice;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "contact_phone")
    private String contactPhone;

    @Column(name = "contact_email")
    private String contactEmail;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    public DiningEntity() {
    }

    public DiningEntity(Long id, String diningStyle, Integer capacity, String menuOptions,
                        String staffingOptions, Double foodServicePrice, Double staffingPrice,
                        String contactPerson, String contactPhone, String contactEmail,
                        String description, byte[] image) {
        this.id = id;
        this.diningStyle = diningStyle;
        this.capacity = capacity;
        this.menuOptions = menuOptions;
        this.staffingOptions = staffingOptions;
        this.foodServicePrice = foodServicePrice;
        this.staffingPrice = staffingPrice;
        this.contactPerson = contactPerson;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
        this.description = description;
        this.image = image;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiningStyle() {
        return diningStyle;
    }

    public void setDiningStyle(String diningStyle) {
        this.diningStyle = diningStyle;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getMenuOptions() {
        return menuOptions;
    }

    public void setMenuOptions(String menuOptions) {
        this.menuOptions = menuOptions;
    }

    public String getStaffingOptions() {
        return staffingOptions;
    }

    public void setStaffingOptions(String staffingOptions) {
        this.staffingOptions = staffingOptions;
    }

    public Double getFoodServicePrice() {
        return foodServicePrice;
    }

    public void setFoodServicePrice(Double foodServicePrice) {
        this.foodServicePrice = foodServicePrice;
    }

    public Double getStaffingPrice() {
        return staffingPrice;
    }

    public void setStaffingPrice(Double staffingPrice) {
        this.staffingPrice = staffingPrice;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}