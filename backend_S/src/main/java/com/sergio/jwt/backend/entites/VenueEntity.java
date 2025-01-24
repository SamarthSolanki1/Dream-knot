package com.sergio.jwt.backend.entites;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "venue")
@Data
public class VenueEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Integer capacity;
    private String areaSize;
    private String contactPerson;
    private String description;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    // Default constructor
    public VenueEntity() {
    }

    // Constructor with all fields
    public VenueEntity(Long id, String name, Double price, Integer capacity,
                       String areaSize, String contactPerson, String description, byte[] image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.capacity = capacity;
        this.areaSize = areaSize;
        this.contactPerson = contactPerson;
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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}