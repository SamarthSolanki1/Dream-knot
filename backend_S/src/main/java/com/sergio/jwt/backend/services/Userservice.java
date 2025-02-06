package com.sergio.jwt.backend.services;

import com.sergio.jwt.backend.dtos.LoginDto;
import com.sergio.jwt.backend.dtos.SignUpDto;
import com.sergio.jwt.backend.dtos.UserDto;
import com.sergio.jwt.backend.entites.Employee;
import com.sergio.jwt.backend.entites.User;
import com.sergio.jwt.backend.repositories.EmployeeRepository;
import com.sergio.jwt.backend.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class Userservice {

    private static final Logger log = LoggerFactory.getLogger(Userservice.class);
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public Userservice(UserRepository userRepository,
                       EmployeeRepository employeeRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
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

        // Parse role
        User.Role role;
        try {
            role = User.Role.valueOf(signUpDto.getRole());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role specified");
        }

        // Create new user
        User user = new User();
        user.setName(signUpDto.getName());
        user.setEmail(signUpDto.getEmail());
        user.setLogin(signUpDto.getLogin());
        user.setMobileNumber(signUpDto.getMobileNumber());
        user.setPassword(encodedPassword);
        user.setRole(role);

        // Save the user in the repository
        User savedUser = userRepository.save(user);
        log.info("User registered successfully with email: {}", signUpDto.getEmail());

        // If the user is an employee, create an Employee record
        if (role == User.Role.Employee) {
            Employee employee = new Employee();
            employee.setName(savedUser.getName());
            employee.setEmail(savedUser.getEmail());
            employee.setPhone(savedUser.getMobileNumber());
            employeeRepository.save(employee);
            log.info("Employee record created for email: {}", savedUser.getEmail());
        }

        // Return UserDto
        return new UserDto(savedUser);
    }

    // Login user logic
    public UserDto login(LoginDto loginDto) {
        // Parse role
        User.Role role;
        try {
            role = User.Role.valueOf(loginDto.getRole());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role specified");
        }

        // Find the user by email and role
        User user = userRepository.findByEmailAndRole(loginDto.getEmail(), role)
                .orElseThrow(() -> new RuntimeException("Invalid credentials or role mismatch"));

        // Check if password matches
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid ");
        }

        // Return UserDto
        return new UserDto(user);
    }
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findByRole(User.Role.User); // Only fetch Users
        return users.stream().map(UserDto::new).collect(Collectors.toList());
    }
    public List<UserDto> getAllemployee(){
        List<User> employee = userRepository.findByRole(User.Role.Employee);
        return employee.stream().map(UserDto::new).collect(Collectors.toList());
    }

    // Find user by login logic (used in UserAuthenticationProvider)
    public Optional<User> findByLogin(String login) {
        return userRepository.findByLogin(login);
    }
}
