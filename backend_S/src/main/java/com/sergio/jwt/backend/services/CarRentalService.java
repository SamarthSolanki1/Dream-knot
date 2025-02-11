package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.CarRentalDTO;
import com.sergio.jwt.backend.entites.CarRental;
import com.sergio.jwt.backend.repositories.CarRentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarRentalService {

    @Autowired
    private CarRentalRepository carRentalRepository;

    public CarRental saveCarRental(CarRentalDTO carRentalDTO) {
        CarRental carRental = new CarRental();
        carRental.setModelName(carRentalDTO.getModelName());
        carRental.setPricePerDay(carRentalDTO.getPricePerDay());
        carRental.setCapacity(carRentalDTO.getCapacity());
        carRental.setContactPerson(carRentalDTO.getContactPerson());
        carRental.setContactNumber(carRentalDTO.getContactNumber());
        carRental.setRegistrationNumber(carRentalDTO.getRegistrationNumber());
        carRental.setDescription(carRentalDTO.getDescription());

        // Handle image conversion from base64 to byte array
        if (carRentalDTO.getImage() != null && !carRentalDTO.getImage().isEmpty()) {
            String base64Image = carRentalDTO.getImage().split(",")[1];
            carRental.setImage(Base64.getDecoder().decode(base64Image));
        }

        return carRentalRepository.save(carRental);
    }

    public List<CarRentalDTO> getAllCarRentals() {
        List<CarRental> carRentals = carRentalRepository.findAll();
        return carRentals.stream().map(carRental -> {
            // Convert byte array back to base64 string for the DTO
            String base64Image = carRental.getImage() != null ?
                    "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(carRental.getImage()) :
                    null;

            return new CarRentalDTO(
                    carRental.getId(),
                    carRental.getModelName(),
                    carRental.getPricePerDay(),
                    carRental.getCapacity(),
                    carRental.getContactPerson(),
                    carRental.getContactNumber(),
                    carRental.getRegistrationNumber(),
                    carRental.getDescription(),
                    base64Image
            );
        }).collect(Collectors.toList());
    }
}