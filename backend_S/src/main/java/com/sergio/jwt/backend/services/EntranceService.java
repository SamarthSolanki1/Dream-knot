package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.EntranceDTO;
import com.sergio.jwt.backend.entites.EntranceEntity;
import com.sergio.jwt.backend.repositories.EntranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntranceService {

    @Autowired
    private EntranceRepository entranceRepository;

    public EntranceEntity saveEntrance(EntranceDTO entranceDTO) {
        EntranceEntity entrance = new EntranceEntity();
        entrance.setThemeType(entranceDTO.getThemeType());
        entrance.setPrice(entranceDTO.getPrice());
        entrance.setContactPerson(entranceDTO.getContactPerson());
        entrance.setContactPhone(entranceDTO.getContactPhone());
        entrance.setContactEmail(entranceDTO.getContactEmail());
        entrance.setDescription(entranceDTO.getDescription());

        // Convert Base64 image to byte array
        if (entranceDTO.getImage() != null && !entranceDTO.getImage().isEmpty()) {
            String base64Image = entranceDTO.getImage().split(",")[1];
            entrance.setImage(Base64.getDecoder().decode(base64Image));
        }

        return entranceRepository.save(entrance);
    }

    public List<EntranceDTO> getAllEntrances() {
        List<EntranceEntity> entranceEntities = entranceRepository.findAll();
        return entranceEntities.stream().map(entrance -> {
            String base64Image = entrance.getImage() != null
                    ? "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(entrance.getImage())
                    : null;
            return new EntranceDTO(
                    entrance.getThemeType(),
                    entrance.getPrice(),
                    entrance.getContactPerson(),
                    entrance.getContactPhone(),
                    entrance.getContactEmail(),
                    entrance.getDescription(),
                    base64Image
            );
        }).collect(Collectors.toList());
    }
}
