package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.MandapDTO;
import com.sergio.jwt.backend.entites.MandapEntity;
import com.sergio.jwt.backend.repositories.MandapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MandapService {

    @Autowired
    private MandapRepository mandapRepository;

    public MandapEntity saveMandap(MandapDTO mandapDTO) {
        MandapEntity mandap = new MandapEntity();
        mandap.setName(mandapDTO.getName());
        mandap.setPrice(mandapDTO.getPrice());
        mandap.setCapacity(mandapDTO.getCapacity());
        mandap.setDecorationType(mandapDTO.getDecorationType());
        mandap.setContactPerson(mandapDTO.getContactPerson());
        mandap.setDescription(mandapDTO.getDescription());
        // Convert Base64 image to byte array
        if (mandapDTO.getImage() != null && !mandapDTO.getImage().isEmpty()) {
            String base64Image = mandapDTO.getImage().split(",")[1];
            mandap.setImage(Base64.getDecoder().decode(base64Image));
        }
        return mandapRepository.save(mandap);
    }

    public List<MandapDTO> getAllMandaps() {
        List<MandapEntity> mandapEntities = mandapRepository.findAll();
        return mandapEntities.stream().map(mandap -> {
            String base64Image = mandap.getImage() != null ? "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(mandap.getImage()) : null;
            return new MandapDTO(
                    mandap.getName(),
                    mandap.getPrice(),
                    mandap.getCapacity(),
                    mandap.getDecorationType(),
                    mandap.getContactPerson(),
                    mandap.getDescription(),
                    base64Image
            );
        }).collect(Collectors.toList());
    }
}
