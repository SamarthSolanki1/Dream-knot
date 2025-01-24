package com.sergio.jwt.backend.dtos;

import lombok.Data;

@Data
public class VenueDTO {
    private String name;
    private Double price;
    private Integer capacity;
    private String areaSize;
    private String contactPerson;
    private String description;
    private String image;

    // Default constructor
    public VenueDTO() {
    }

    // Constructor with all fields
    public VenueDTO(String name, Double price, Integer capacity,
                    String areaSize, String contactPerson, String description, String image) {
        this.name = name;
        this.price = price;
        this.capacity = capacity;
        this.areaSize = areaSize;
        this.contactPerson = contactPerson;
        this.description = description;
        this.image = image;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getAreaSize() {
        return areaSize;
    }

    public void setAreaSize(String areaSize) {
        this.areaSize = areaSize;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
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