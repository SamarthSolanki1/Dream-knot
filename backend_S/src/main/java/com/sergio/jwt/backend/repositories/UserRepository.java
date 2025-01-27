package com.sergio.jwt.backend.repositories;

import com.sergio.jwt.backend.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndRole(String email, User.Role role);

    Optional<User> findByLoginAndRole(String login, User.Role role);
}

