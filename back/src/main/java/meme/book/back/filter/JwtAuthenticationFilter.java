package meme.book.back.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.exception.CustomException;
import meme.book.back.oauth.JwtTokenProvider;
import meme.book.back.utils.ErrorCode;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        try {
            if (!request.getMethod().equals(HttpMethod.GET.name())) {

                log.debug("Request Filter URL: {}, ", request.getRequestURI());

                String authorizationToken = request.getHeader("Authorization");
                if (authorizationToken == null) {
                    throw new CustomException(ErrorCode.INVALID_AUTHENTICATION_TOKEN);
                }

                String memberEmail = jwtTokenProvider.getEmailByToken(authorizationToken);
                if (memberEmail == null) {
                    throw new CustomException(ErrorCode.INVALID_AUTHENTICATION_TOKEN);
                }

                UserDetails userDetails = User.builder()
                        .username(memberEmail)
                        .password(memberEmail)
                        .build();

                Authentication authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, new ArrayList<>());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);

        } catch (ServletException | IOException exception) {
            log.error("### Filter Exception: {}", exception.getLocalizedMessage());
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String[] excludePath = {"/auth/login", "/swagger-ui", "/swagger", "/v3/api-docs", "/docs", "/"};
        String path = request.getRequestURI();

        log.info("path: {}", path);

        return Arrays.asList(excludePath).contains(path);
    }

}
