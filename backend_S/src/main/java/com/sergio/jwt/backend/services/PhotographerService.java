package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.PhotographerDTO;
import com.sergio.jwt.backend.entites.Photographer;
import com.sergio.jwt.backend.repositories.PhotographerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PhotographerService {
    private static final Logger logger = LoggerFactory.getLogger(PhotographerService.class);

    @Autowired
    private PhotographerRepository photographerRepository;

    public Photographer savePhotographer(PhotographerDTO photographerDTO) {
        try {
            logger.info("Attempting to save photographer: {}", photographerDTO.getName());

            Photographer photographer = new Photographer();
            photographer.setId(photographerDTO.getId());
            photographer.setName(photographerDTO.getName());
            photographer.setPricePerDay(photographerDTO.getPricePerDay());
            photographer.setSpecialization(photographerDTO.getSpecialization());
            photographer.setExperience(photographerDTO.getExperience());
            photographer.setEquipment(photographerDTO.getEquipment());
            photographer.setContactNumber(photographerDTO.getContactNumber());
            photographer.setEmail(photographerDTO.getEmail());

            if (photographerDTO.getImage() != null && !photographerDTO.getImage().isEmpty()) {
                try {
                    String base64Image = photographerDTO.getImage().split(",")[1];
                    photographer.setImage(Base64.getDecoder().decode(base64Image));
                    logger.info("Image processed successfully");
                } catch (Exception e) {
                    logger.error("Error processing image: ", e);
                }
            }

            Photographer savedPhotographer = photographerRepository.save(photographer);
            logger.info("Photographer saved successfully with ID: {}", savedPhotographer.getId());
            return savedPhotographer;

        } catch (Exception e) {
            logger.error("Error saving photographer: ", e);
            throw e;
        }
    }

    public List<PhotographerDTO> getAllPhotographers() {
        List<Photographer> photographerEntities = photographerRepository.findAll();
        return photographerEntities.stream().map(photographer -> {
            String base64Image = photographer.getImage() != null ?
                    "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(photographer.getImage()) : null;
            return new PhotographerDTO(
                    photographer.getId(),
                    photographer.getName(),
                    photographer.getPricePerDay(),
                    photographer.getSpecialization(),
                    photographer.getExperience(),
                    photographer.getEquipment(),
                    photographer.getContactNumber(),
                    photographer.getEmail(),
                    base64Image
            );
        }).collect(Collectors.toList());
    }
}