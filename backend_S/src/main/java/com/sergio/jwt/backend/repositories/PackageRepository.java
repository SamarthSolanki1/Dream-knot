package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long> {
    @Override
    Optional<Package> findById(Long aLong);
}

