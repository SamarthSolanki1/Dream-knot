package com.sergio.jwt.backend.controllers;


import com.sergio.jwt.backend.dtos.LoginDto;
import com.sergio.jwt.backend.dtos.SignUpDto;
import com.sergio.jwt.backend.dtos.UserDto;
import com.sergio.jwt.backend.services.Userservice;
import com.sergio.jwt.backend.config.UserAuthenticationProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "https://dream-knot.vercel.app")  // Allow only from frontend (localhost:4000)
@Slf4j
public class AuthController {

    private final Userservice userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDto loginDto) {
        try {
            log.info("Login attempt for email: {}", loginDto.getEmail());
            UserDto userDto = userService.login(loginDto);

            // Generate JWT token
            userDto.setToken(userAuthenticationProvider.createToken(userDto.getLogin()));
            return ResponseEntity.ok(userDto);

        } catch (RuntimeException e) {
            log.error("Login failed for email: {}", loginDto.getEmail(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    // Register endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid SignUpDto signUpDto) {
        try {
            log.info("Register attempt for email: {}", signUpDto.getEmail());
            UserDto createdUser = userService.register(signUpDto);

            // Generate JWT token
            createdUser.setToken(userAuthenticationProvider.createToken(createdUser.getLogin()));
            return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);

        } catch (RuntimeException e) {
            log.error("Registration failed for email: {}", signUpDto.getEmail(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/employee")
    public ResponseEntity<List<UserDto>> getAllemployee(){
        List<UserDto> employees = userService.getAllemployee();
        return ResponseEntity.ok(employees);
    }

    // Global Exception Handler (optional)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleExceptions(Exception ex) {
        log.error("An error occurred: {}", ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
    }
}