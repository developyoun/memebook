package meme.book.back.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.oauth.JwtTokenProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        try {
            String authenticationToken = request.getHeader("Authorization");
            log.info("Authorization: {}", authenticationToken);
            log.info("{}", jwtTokenProvider.extractInfoByToken(authenticationToken));

            UserDetails userDetails = User.builder()
                    .username("gdgd")
                    .password("123123")
                    .build();

            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null);

            log.info("#### UserDetail: {}", authentication);

//            userDetails.getAuthorities();
            filterChain.doFilter(request, response);

        } catch (ServletException | IOException exception) {
            log.error("### Filter Exception: {}", exception.getLocalizedMessage());
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String[] excludePath = {"/auth/login", "/swagger-ui", "/swagger", "/v3/api-docs", "/docs"};
        String path = request.getRequestURI();
        return Arrays.stream(excludePath).anyMatch(path::startsWith);
    }
}
