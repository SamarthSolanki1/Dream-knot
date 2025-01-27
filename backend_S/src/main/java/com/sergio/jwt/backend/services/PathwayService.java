package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.PathwayDTO;
import com.sergio.jwt.backend.entites.PathwayEntity;
import com.sergio.jwt.backend.repositories.PathwayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class PathwayService {

    @Autowired
    private PathwayRepository pathwayRepository;

    public PathwayEntity savePathway(PathwayDTO pathwayDTO) {
        PathwayEntity pathway = new PathwayEntity();
        pathway.setThemeType(pathwayDTO.getThemeType());
        pathway.setPrice(pathwayDTO.getPrice());
        pathway.setContactPerson(pathwayDTO.getContactPerson());
        pathway.setContactPhone(pathwayDTO.getContactPhone());
        pathway.setContactEmail(pathwayDTO.getContactEmail());
        pathway.setDescription(pathwayDTO.getDescription());

        // Convert Base64 image to byte array
        if (pathwayDTO.getImage() != null && !pathwayDTO.getImage().isEmpty()) {
            String base64Image = pathwayDTO.getImage().split(",")[1];
            pathway.setImage(Base64.getDecoder().decode(base64Image));
        }

        return pathwayRepository.save(pathway);
    }
}