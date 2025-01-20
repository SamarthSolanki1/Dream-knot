package com.sergio.jwt.backend.entites;
import jakarta.persistence.*;
@Entity
@Table(name = "decor_details")
public class DecorDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // Example: Mandap, Entrance, Pathway, etc.
    private String description;
    private String image;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    private Package aPackage;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public Package getPackage() {
        return aPackage;
    }

    public void setPackage(Package aPackage) {
        this.aPackage = aPackage;
    }
}
