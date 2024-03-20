package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.AuthRequestDto;
import meme.book.back.service.AuthService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody AuthRequestDto authRequest) {
        log.debug("Authenticate Request: {}", authRequest);

        String accessToken = authService.accessTokenService(authRequest.getCode());

        return accessToken;
    }
}
