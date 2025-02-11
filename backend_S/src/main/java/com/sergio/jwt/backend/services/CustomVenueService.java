package com.sergio.jwt.backend.services;
import com.sergio.jwt.backend.dtos.CustomVenueDTO;
import com.sergio.jwt.backend.entites.CustomVenue;
import com.sergio.jwt.backend.repositories.CustomVenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class CustomVenueService {


        @Autowired
        private CustomVenueRepository cvenueRepository;

        public CustomVenue saveVenue(CustomVenueDTO venueDTO) {
            CustomVenue venue = new CustomVenue();
            venue.setName(venueDTO.getName());
            venue.setPrice(venueDTO.getPrice());
            venue.setCapacity(venueDTO.getCapacity());
            venue.setAreaSize(venueDTO.getAreaSize());
            venue.setContactPerson(venueDTO.getContactPerson());
            venue.setDescription(venueDTO.getDescription());

            if (venueDTO.getImage() != null && !venueDTO.getImage().isEmpty()) {
                String base64Image = venueDTO.getImage().split(",")[1];
                venue.setImage(Base64.getDecoder().decode(base64Image));
            }

            return cvenueRepository.save(venue);
        }

        public List<CustomVenueDTO> getAllVenues() {
            List<CustomVenue> venueEntities = cvenueRepository.findAll();
            return venueEntities.stream().map(venue -> {
                String base64Image = venue.getImage() != null ?
                        "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(venue.getImage()) :
                        null;
                return new CustomVenueDTO(
                        venue.getId(),
                        venue.getName(),
                        venue.getPrice(),
                        venue.getCapacity(),
                        venue.getAreaSize(),
                        venue.getContactPerson(),
                        venue.getDescription(),
                        base64Image
                );
            }).collect(Collectors.toList());
        }
    }

