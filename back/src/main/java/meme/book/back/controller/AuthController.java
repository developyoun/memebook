package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.AuthRequestDto;
import meme.book.back.exception.AuthException;
import meme.book.back.service.AuthService;
import meme.book.back.utils.ErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login/{provider}")
    public ResponseEntity<?> login(@PathVariable String provider,
                        @RequestBody AuthRequestDto authRequest) {
        log.debug("Authenticate Request: {}", authRequest);

        if (provider.equals("google")) {
            String accessToken = authService.memberDoLogin(authRequest.getCode());
        } else {
            log.error("Provider 값을 확인해야 합니다.");
            throw new AuthException(ErrorCode.NOT_FOUND_PROVIDER);
        }

        return ResponseEntity.ok().build();
    }
}
