package com.sergio.jwt.backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.sergio.jwt.backend.dtos.UserDto;
import com.sergio.jwt.backend.entites.User;
import com.sergio.jwt.backend.services.Userservice;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @Value("${security.jwt.token.expiry-time:9900000}") // Configurable token expiry time
    private long tokenExpiryTime;

    private final Userservice userService;

    @PostConstruct
    protected void init() {
        // Encode secret key to avoid exposing raw secret key
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // ✅ Modify createToken to include user role
    public String createToken(String login) {
        Optional<User> userOptional = userService.findByLogin(login);
        User user = userOptional.orElseThrow(() -> new RuntimeException("User not found"));

        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenExpiryTime); // Use configurable expiry time

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(login)
                .withClaim("role", user.getRole().name()) // ✅ Add user role in token
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);
    }

    // ✅ Modify validateToken to extract role and grant authorities
    public Authentication validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decoded = verifier.verify(token);

            // Retrieve user data
            Optional<User> userOptional = userService.findByLogin(decoded.getSubject());
            User user = userOptional.orElseThrow(() -> new RuntimeException("User not found"));

            // Extract role from JWT claims
            String role = decoded.getClaim("role").asString();
            if (role == null) {
                throw new RuntimeException("Role not found in token");
            }

            // Grant authorities based on role
            List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

            // Convert User to UserDto
            UserDto userDto = new UserDto(user);

            return new UsernamePasswordAuthenticationToken(userDto, null, authorities);
        } catch (TokenExpiredException e) {
            throw new RuntimeException("Token has expired", e);
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Invalid token", e);
        }
    }
}
