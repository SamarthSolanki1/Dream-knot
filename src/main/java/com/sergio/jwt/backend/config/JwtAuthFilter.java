package com.sergio.jwt.backend.config;

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

        if (header == null || !header.trim().startsWith("Bearer ")) {
            logger.debug("Authorization header is missing or invalid.");
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }

        try {
            String token = header.substring(7).trim(); // Extract token after "Bearer "
            logger.debug("Validating token: " + token.substring(0, Math.min(10, token.length())) + "... (truncated)");
            SecurityContextHolder.getContext().setAuthentication(
                    userAuthenticationProvider.validateToken(token));
        } catch (RuntimeException e) {
            logger.error("Token validation failed: " + e.getMessage());
            SecurityContextHolder.clearContext();
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}