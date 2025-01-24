package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.DiningEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiningRepository extends JpaRepository<DiningEntity, Long> {
}