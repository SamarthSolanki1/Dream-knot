package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.entites.Package;
import com.sergio.jwt.backend.repositories.PackageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {

    private static final Logger log = LoggerFactory.getLogger(PackageService.class);
    @Autowired
    private PackageRepository packageRepository;
     @GetMapping
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
     }

    public Optional<Package> getPackageById(Long id) {
        return packageRepository.findById(id);
    }

    public Package createPackage(Package packageEntity) {
        return packageRepository.save(packageEntity);
    }

    public Package updatePackage(Long id, Package packageEntity) {
        return packageRepository.findById(id)
                .map(existingPackage -> {
                    existingPackage.setTitle(packageEntity.getTitle());
                    existingPackage.setDescription(packageEntity.getDescription());
                    existingPackage.setImage(packageEntity.getImage());
                    existingPackage.setPrice(packageEntity.getPrice());
                    return packageRepository.save(existingPackage);
                })
                .orElseThrow(() -> new RuntimeException("Package not found"));
    }

    public void deletePackage(Long id) {
        packageRepository.deleteById(id);
    }
}

