package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    @Override
    Optional<Venue> findById(Long aLong);
}
