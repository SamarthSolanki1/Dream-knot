package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.CustomBooking;
import  org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CustomBookingRepository extends JpaRepository<CustomBooking, Long> {
    List<CustomBooking> findByUserId(Long userId);
    List<CustomBooking> findByStatus(String status);

    List<CustomBooking> findByEventDate(LocalDate eventDate);

}
