package com.sergio.jwt.backend.dtos;

import lombok.Data;

@Data
public class DiningDTO {
    private String diningStyle;
    private Integer capacity;
    private String menuOptions;
    private String staffingOptions;
    private Double foodServicePrice;
    private Double staffingPrice;
    private String contactPerson;
    private String contactPhone;
    private String contactEmail;
    private String description;
    private String image;

    public DiningDTO() {
    }

    @Override
    public String toString() {
        return "DiningDTO{" +
                "diningStyle='" + diningStyle + '\'' +
                ", capacity=" + capacity +
                ", menuOptions='" + menuOptions + '\'' +
                ", staffingOptions='" + staffingOptions + '\'' +
                ", foodServicePrice=" + foodServicePrice +
                ", staffingPrice=" + staffingPrice +
                ", contactPerson='" + contactPerson + '\'' +
                ", contactPhone='" + contactPhone + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                '}';
    }

    public DiningDTO(String diningStyle, Integer capacity, String menuOptions, String staffingOptions,
                     Double foodServicePrice, Double staffingPrice, String contactPerson,
                     String contactPhone, String contactEmail, String description, String image) {
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}