package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.VenueDTO;
import com.sergio.jwt.backend.entites.VenueEntity;
import com.sergio.jwt.backend.repositories.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public VenueEntity saveVenue(VenueDTO venueDTO) {
        VenueEntity venue = new VenueEntity();
        venue.setName(venueDTO.getName());
        venue.setPrice(venueDTO.getPrice());
        venue.setCapacity(venueDTO.getCapacity());
        venue.setAreaSize(venueDTO.getAreaSize());
        venue.setContactPerson(venueDTO.getContactPerson());
        venue.setDescription(venueDTO.getDescription());

        // Convert Base64 image to byte array
        if (venueDTO.getImage() != null && !venueDTO.getImage().isEmpty()) {
            String base64Image = venueDTO.getImage().split(",")[1];
            venue.setImage(Base64.getDecoder().decode(base64Image));
        }

        return venueRepository.save(venue);
    }
}