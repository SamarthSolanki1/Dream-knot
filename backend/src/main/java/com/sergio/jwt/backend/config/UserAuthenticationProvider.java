package com.sergio.jwt.backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.sergio.jwt.backend.dtos.UserDto;
import com.sergio.jwt.backend.entites.User;
import com.sergio.jwt.backend.services.Userservice;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @Value("${security.jwt.token.expiry-time:3600000}") // Configurable token expiry time
    private long tokenExpiryTime;

    private final Userservice userService;

    @PostConstruct
    protected void init() {
        // Encode secret key to avoid exposing raw secret key
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String login) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenExpiryTime); // Use configurable expiry time

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(login)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);
    }

    public Authentication validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decoded = verifier.verify(token);

            // Retrieve user data
            Optional<User> userOptional = userService.findByLogin(decoded.getSubject());

            // Check if the user exists
            User user = userOptional.orElseThrow(() -> new RuntimeException("User not found"));

            // Convert User to UserDto
            UserDto userDto = new UserDto(user);  // Assuming you have a constructor in UserDto to handle this conversion

            return new UsernamePasswordAuthenticationToken(userDto, null, Collections.emptyList());
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired token", e); // Add more specific error handling
        }
    }
}
