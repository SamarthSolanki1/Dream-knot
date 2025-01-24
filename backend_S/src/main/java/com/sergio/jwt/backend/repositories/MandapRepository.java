package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.MandapEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MandapRepository extends JpaRepository<MandapEntity, Long> {
}