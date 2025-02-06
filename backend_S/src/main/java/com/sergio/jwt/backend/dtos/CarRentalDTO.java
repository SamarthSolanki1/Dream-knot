package com.sergio.jwt.backend.dtos;

import lombok.Data;

@Data
public class CarRentalDTO {
    private String modelName;
    private Double pricePerDay;
    private Integer capacity;
    private String contactPerson;
    private String contactNumber;
    private String registrationNumber;
    private String description;
    private String image;

    public CarRentalDTO() {
    }

    public CarRentalDTO(String modelName, Double pricePerDay, Integer capacity,
                        String contactPerson, String contactNumber, String registrationNumber,
                        String description, String image) {
        this.modelName = modelName;
        this.pricePerDay = pricePerDay;
        this.capacity = capacity;
        this.contactPerson = contactPerson;
        this.contactNumber = contactNumber;
        this.registrationNumber = registrationNumber;
        this.description = description;
        this.image = image;
    }

    // Getters and setters
    public String getModelName() { return modelName; }
    public void setModelName(String modelName) { this.modelName = modelName; }

    public Double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(Double pricePerDay) { this.pricePerDay = pricePerDay; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}