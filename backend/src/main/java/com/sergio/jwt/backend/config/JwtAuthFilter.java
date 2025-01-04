package com.sergio.jwt.backend.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserAuthenticationProvider userAuthenticationProvider;



    @Override
    protected void doFilterInternal(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            FilterChain filterChain) throws ServletException, IOException {

        String header = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(httpServletRequest, httpServletResponse); // Continue filter chain without authentication
            return;
        }

        String token = header.split(" ")[1]; // Extract token after 'Bearer'

        try {
            // Validate the token and set the authentication context
            SecurityContextHolder.getContext().setAuthentication(
                    userAuthenticationProvider.validateToken(token));
        } catch (RuntimeException e) {
            // If token validation fails, clear the context and throw an exception
            SecurityContextHolder.clearContext();
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            throw e; // Propagate the exception
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse); // Continue with the filter chain
    }
}
