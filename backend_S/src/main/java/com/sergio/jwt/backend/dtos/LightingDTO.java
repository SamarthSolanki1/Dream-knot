package com.sergio.jwt.backend.dtos;

import lombok.Data;

@Data
public class LightingDTO {
    private long id;
    private String lightingType;
    private Double price;
    private Integer numberOfUnits;
    private String powerRequirement;
    private String duration;
    private String installationTime;
    private String contactPerson;
    private String contactPhone;
    private String contactEmail;
    private String description;
    private String image;

    @Override
    public String toString() {
        return "LightingDTO{" +
                "lightingType='" + lightingType + '\'' +
                ",id=" + id +
                ", price=" + price +
                ", numberOfUnits=" + numberOfUnits +
                ", powerRequirement='" + powerRequirement + '\'' +
                ", duration='" + duration + '\'' +
                ", installationTime='" + installationTime + '\'' +
                ", contactPerson='" + contactPerson + '\'' +
                ", contactPhone='" + contactPhone + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                '}';
    }

    public LightingDTO() {
    }

    public LightingDTO(Long id,String lightingType, Double price, Integer numberOfUnits, String powerRequirement, String duration, String installationTime, String contactPerson, String contactPhone, String contactEmail, String description, String image) {
        this.id = id;
        this.lightingType = lightingType;
        this.price = price;
        this.numberOfUnits = numberOfUnits;
        this.powerRequirement = powerRequirement;
        this.duration = duration;
        this.installationTime = installationTime;
        this.contactPerson = contactPerson;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
        this.description = description;
        this.image = image;
    }

    public String getLightingType() {
        return lightingType;
    }

    public void setLightingType(String lightingType) {
        this.lightingType = lightingType;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getNumberOfUnits() {
        return numberOfUnits;
    }

    public void setNumberOfUnits(Integer numberOfUnits) {
        this.numberOfUnits = numberOfUnits;
    }

    public String getPowerRequirement() {
        return powerRequirement;
    }

    public void setPowerRequirement(String powerRequirement) {
        this.powerRequirement = powerRequirement;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getInstallationTime() {
        return installationTime;
    }

    public void setInstallationTime(String installationTime) {
        this.installationTime = installationTime;
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