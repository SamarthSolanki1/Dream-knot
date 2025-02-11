package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.DiningDTO;
import com.sergio.jwt.backend.entites.DiningEntity;
import com.sergio.jwt.backend.repositories.DiningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiningService {

    @Autowired
    private DiningRepository diningRepository;

    public DiningEntity saveDining(DiningDTO diningDTO) {
        try {
            DiningEntity dining = new DiningEntity();
            dining.setDiningStyle(diningDTO.getDiningStyle());
            dining.setCapacity(diningDTO.getCapacity());
            dining.setMenuOptions(diningDTO.getMenuOptions());
            dining.setStaffingOptions(diningDTO.getStaffingOptions());
            dining.setFoodServicePrice(diningDTO.getFoodServicePrice());
            dining.setStaffingPrice(diningDTO.getStaffingPrice());
            dining.setContactPerson(diningDTO.getContactPerson());
            dining.setContactPhone(diningDTO.getContactPhone());
            dining.setContactEmail(diningDTO.getContactEmail());
            dining.setDescription(diningDTO.getDescription());

            // Convert Base64 image to byte array
            if (diningDTO.getImage() != null && !diningDTO.getImage().isEmpty()) {
                String base64Image = diningDTO.getImage().split(",")[1];
                dining.setImage(Base64.getDecoder().decode(base64Image));
            }

            return diningRepository.save(dining);
        } catch (Exception e) {

            throw new RuntimeException("Failed to save dining details", e);
        }
    }

    public List<DiningDTO> getAllDiningOptions() {
        List<DiningEntity> diningEntities = diningRepository.findAll();
        return diningEntities.stream().map(dining -> {
            String base64Image = dining.getImage() != null
                    ? "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(dining.getImage())
                    : null;
            return new DiningDTO(
                    dining.getId(),
                    dining.getDiningStyle(),
                    dining.getCapacity(),
                    dining.getMenuOptions(),
                    dining.getStaffingOptions(),
                    dining.getFoodServicePrice(),
                    dining.getStaffingPrice(),
                    dining.getContactPerson(),
                    dining.getContactPhone(),
                    dining.getContactEmail(),
                    dining.getDescription(),
                    base64Image
            );
        }).collect(Collectors.toList());
    }
}