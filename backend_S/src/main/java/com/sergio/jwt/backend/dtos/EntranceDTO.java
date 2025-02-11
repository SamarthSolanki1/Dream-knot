package com.sergio.jwt.backend.dtos;

import lombok.Data;

@Data
public class EntranceDTO {
    private Long id;
    private String themeType;
    private Double price;
    private String contactPerson;
    private String contactPhone;
    private String contactEmail;
    private String description;
    private String image;

    // Default constructor
    public EntranceDTO() {}

    // Constructor with all fields
    public EntranceDTO(Long id,String themeType, Double price, String contactPerson,
                       String contactPhone, String contactEmail, String description, String image) {
       this.id = id;
        this.themeType = themeType;
        this.price = price;
        this.contactPerson = contactPerson;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
        this.description = description;
        this.image = image;
    }

    // Getters and Setters
    public String getThemeType() { return themeType; }
    public void setThemeType(String themeType) { this.themeType = themeType; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getContactEmail() { return contactEmail; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}