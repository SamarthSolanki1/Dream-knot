package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.LoginDto;
import com.sergio.jwt.backend.dtos.SignUpDto;
import com.sergio.jwt.backend.dtos.UserDto;
import com.sergio.jwt.backend.entites.User;
import com.sergio.jwt.backend.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Userservice {

    private static final Logger log = LoggerFactory.getLogger(Userservice.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Userservice(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register user logic
    public UserDto register(SignUpDto signUpDto) {
        // Check if email already exists
        Optional<User> existingUser = userRepository.findByEmail(signUpDto.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email is already in use");
        }

        // Encode password
        String encodedPassword = passwordEncoder.encode(signUpDto.getPassword());

        // Create new user
        User user = new User(
                signUpDto.getname(),          // Updated to match corrected field name
                signUpDto.getEmail(),
                signUpDto.getLogin(),
                signUpDto.getMobileNumber(),
                encodedPassword
        );


        // Save the user in the repository
        User savedUser = userRepository.save(user);
        System.out.println(signUpDto.getMobileNumber());
        System.out.println(user);


        // Return UserDto (DTO for response)
        return new UserDto(
                savedUser.getId(),
                savedUser.getname(),         // Correct method for name retrieval
                savedUser.getEmail(),
                savedUser.getNumber(),
                savedUser.getLogin()
        );
    }

    // Login user logic
    public UserDto login(LoginDto loginDto) {
        // Find the user by email
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Check if password matches
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Return UserDto
        return new UserDto(
                user.getId(),
                user.getname(),
                user.getEmail(),
                user.getNumber(),
                user.getLogin()
        );
    }

    // Find user by login logic (used in UserAuthenticationProvider)
    public Optional<User> findByLogin(String login) {
        return userRepository.findByLogin(login); // Delegate to UserRepository
    }
}
