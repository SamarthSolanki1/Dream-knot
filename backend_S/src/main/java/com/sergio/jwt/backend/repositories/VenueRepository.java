package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
}