package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.PathwayEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PathwayRepository extends JpaRepository<PathwayEntity, Long> {
}