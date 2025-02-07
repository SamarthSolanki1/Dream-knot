package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.LightingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LightingRepository extends JpaRepository<LightingEntity, Long> {
}