package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);

    List<Booking> findByVenueId(Long venueId);

    Optional<Booking> findByVenueIdAndBookingDate(Long venueId, LocalDate bookingDate);
}

