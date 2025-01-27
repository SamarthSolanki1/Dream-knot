package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByName(String name);// Additional query methods can be added if needed
    Optional<Employee> findByEmail(String email);

}
