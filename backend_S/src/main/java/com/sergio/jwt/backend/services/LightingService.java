package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.LightingDTO;
import com.sergio.jwt.backend.entities.LightingEntity;
import com.sergio.jwt.backend.repositories.LightingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LightingService {

    @Autowired
    private LightingRepository lightingRepository;

    public LightingEntity saveLighting(LightingDTO lightingDTO) {
        LightingEntity lighting = new LightingEntity();
        lighting.setLightingType(lightingDTO.getLightingType());
        lighting.setPrice(lightingDTO.getPrice());
        lighting.setNumberOfUnits(lightingDTO.getNumberOfUnits());
        lighting.setPowerRequirement(lightingDTO.getPowerRequirement());
        lighting.setDuration(lightingDTO.getDuration());
        lighting.setInstallationTime(lightingDTO.getInstallationTime());
        lighting.setContactPerson(lightingDTO.getContactPerson());
        lighting.setContactPhone(lightingDTO.getContactPhone());
        lighting.setContactEmail(lightingDTO.getContactEmail());
        lighting.setDescription(lightingDTO.getDescription());

        if (lightingDTO.getImage() != null && !lightingDTO.getImage().isEmpty()) {
            String base64Image = lightingDTO.getImage().split(",")[1];
            lighting.setImage(Base64.getDecoder().decode(base64Image));
        }

        return lightingRepository.save(lighting);
    }

    public List<LightingDTO> getAllLightingOptions() {
        return lightingRepository.findAll().stream().map(lighting -> {
            String base64Image = lighting.getImage() != null
                    ? "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(lighting.getImage())
                    : null;
            return new LightingDTO(
                    lighting.getLightingType(),
                    lighting.getPrice(),
                    lighting.getNumberOfUnits(),
                    lighting.getPowerRequirement(),
                    lighting.getDuration(),
                    lighting.getInstallationTime(),
                    lighting.getContactPerson(),
                    lighting.getContactPhone(),
                    lighting.getContactEmail(),
                    lighting.getDescription(),
                    base64Image
            );
        }).collect(Collectors.toList());
    }
}
