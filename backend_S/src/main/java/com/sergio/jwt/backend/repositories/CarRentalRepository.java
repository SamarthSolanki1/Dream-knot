package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.CarRental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRentalRepository extends JpaRepository<CarRental, Long> {}
