package com.sergio.jwt.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class PhotographerDTO {
    private long id;
    private String name;
    private Double pricePerDay;
    private String specialization;
    private Integer experience;
    private String equipment;
    private String contactNumber;
    private String email;
    private String image;  // Base64 encoded string

    // Default constructor
    public PhotographerDTO() {
    }

    // Constructor with all fields
    public PhotographerDTO(long id,String name, Double pricePerDay, String specialization,
                           Integer experience, String equipment, String contactNumber,
                           String email, String image) {
        this.id = id;
        this.name = name;
        this.pricePerDay = pricePerDay;
        this.specialization = specialization;
        this.experience = experience;
        this.equipment = equipment;
        this.contactNumber = contactNumber;
        this.email = email;
        this.image = image;
    }

    public PhotographerDTO(Long id) {
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPricePerDay() {
        return pricePerDay;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setPricePerDay(Double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}