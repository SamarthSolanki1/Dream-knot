package com.sergio.jwt.backend.entites;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "mandap")
@Data
public class MandapEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Integer capacity;
    private String decorationType;
    private String contactPerson;
    private String description;

    public MandapEntity() {
    }

    public MandapEntity(Long id, String name, Double price, Integer capacity, String decorationType, String contactPerson, String description, byte[] image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.capacity = capacity;
        this.decorationType = decorationType;
        this.contactPerson = contactPerson;
        this.description = description;
        this.image = image;
    }

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

    public String getDecorationType() {
        return decorationType;
    }

    public void setDecorationType(String decorationType) {
        this.decorationType = decorationType;
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

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
}