package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.CustomVenue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomVenueRepository extends JpaRepository<CustomVenue, Long> {
}
