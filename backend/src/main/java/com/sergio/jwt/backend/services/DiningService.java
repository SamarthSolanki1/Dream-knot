package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.DiningDTO;
import com.sergio.jwt.backend.entites.DiningEntity;
import com.sergio.jwt.backend.repositories.DiningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class DiningService {

    @Autowired
    private DiningRepository diningRepository;

    public DiningEntity saveDining(DiningDTO diningDTO) {
        DiningEntity diningEntity = new DiningEntity();
        diningEntity.setDiningStyle(diningDTO.getDiningStyle());
        diningEntity.setCapacity(diningDTO.getCapacity());
        diningEntity.setMenuOptions(diningDTO.getMenuOptions());
        diningEntity.setStaffingOptions(diningDTO.getStaffingOptions());
        diningEntity.setFoodServicePrice(diningDTO.getFoodServicePrice());
        diningEntity.setStaffingPrice(diningDTO.getStaffingPrice());
        diningEntity.setContactPerson(diningDTO.getContactPerson());
        diningEntity.setContactPhone(diningDTO.getContactPhone());
        diningEntity.setContactEmail(diningDTO.getContactEmail());
        diningEntity.setDescription(diningDTO.getDescription());

        // Convert Base64 image to byte array
        if (diningDTO.getImage() != null && !diningDTO.getImage().isEmpty()) {
            String base64Image = diningDTO.getImage().split(",")[1];
            diningEntity.setImage(Base64.getDecoder().decode(base64Image));
        }

        return diningRepository.save(diningEntity);
    }
}