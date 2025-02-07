package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.EntranceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntranceRepository extends JpaRepository<EntranceEntity, Long> {
}