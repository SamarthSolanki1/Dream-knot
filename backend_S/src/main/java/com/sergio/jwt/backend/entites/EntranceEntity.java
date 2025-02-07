package com.sergio.jwt.backend.entites;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "entrance")
@Data
public class EntranceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String themeType;
    private Double price;
    private String contactPerson;
    private String contactPhone;
    private String contactEmail;
    private String description;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    // Default constructor
    public EntranceEntity() {}

    // Constructor with all fields
    public EntranceEntity(Long id, String themeType, Double price, String contactPerson,
                          String contactPhone, String contactEmail, String description, byte[] image) {
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
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getThemeType() { return themeType; }
    public void setThemeType(String themeType) { this.themeType = themeType; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public byte[] getImage() { return image; }
    public void setImage(byte[] image) { this.image = image; }
}