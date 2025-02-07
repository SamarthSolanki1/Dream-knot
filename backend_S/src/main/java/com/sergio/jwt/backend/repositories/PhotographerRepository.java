package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.Photographer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotographerRepository extends JpaRepository<Photographer, Long> {}
