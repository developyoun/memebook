package meme.book.back.oauth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.GoogleTokenDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Component
@RequiredArgsConstructor
public class GoogleClient {

    private final String GRANT_CODE = "authorization_code";

    @Value("${spring.oauth2.client.google.url}")
    private String authUrl;

    @Value("${spring.oauth2.client.google.client-id}")
    private String clientId;

    @Value("${spring.oauth2.client.google.client-secret}")
    private String clientSecret;

    @Value("${spring.oauth2.client.google.redirect-url}")
    private String redirectUrl;

    public GoogleTokenDto getAccessToken(String code) {
        WebClient webClient = WebClient.create(authUrl);

        GoogleTokenDto googleToken = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("client_id", clientId)
                        .queryParam("client_secret", clientSecret)
                        .queryParam("grant_type", GRANT_CODE)
                        .queryParam("redirect_uri", redirectUrl)
                        .queryParam("code", code)
                        .build()
                )
                .retrieve()
                .bodyToMono(GoogleTokenDto.class)
                .block();
        return googleToken;

    }

}
