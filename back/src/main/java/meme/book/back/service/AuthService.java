package meme.book.back.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.exception.CustomException;
import meme.book.back.oauth.TokenVerifier;
import meme.book.back.utils.ErrorCode;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RequiredArgsConstructor
@Slf4j
@Service
public class AuthService {

    private final TokenVerifier tokenVerifier;

    public String accessTokenService(String code) {

        try {
            GoogleIdToken googleIdToken = tokenVerifier.getGoogleTokenVerifier().verify(code);
            if (googleIdToken == null) throw new CustomException(ErrorCode.FAILED_LOGIN);

            Payload payload = googleIdToken.getPayload();

            log.info("google Id Token: {}", googleIdToken.getPayload());
        } catch (GeneralSecurityException | IOException e) {
            log.error(e.getLocalizedMessage());
            throw new CustomException(ErrorCode.FAILED_LOGIN);
        }

        return null;
    }
}
