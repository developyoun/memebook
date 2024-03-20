package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.GoogleTokenDto;
import meme.book.back.oauth.GoogleClient;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class AuthService {

    private final GoogleClient googleClient;

    public String accessTokenService(String code) {

        GoogleTokenDto googleToken = googleClient.getAccessToken(code);
        log.info("Google Token: {}", googleToken);

        return null;
    }
}
