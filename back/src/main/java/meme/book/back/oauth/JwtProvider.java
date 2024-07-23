package meme.book.back.oauth;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import meme.book.back.utils.ProviderType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.security.Provider;
import java.util.Date;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${auth.jwt.secret:123}")
    private String secretKey;

    // Access 토큰 유효 기간 = 1시간
    private static final long ACCESS_TOKEN_PERIOD = 60 * 3_600;

    // Refresh 토큰 유효 기간 = 7일
    private static final long REFRESH_TOKEN_PERIOD =  7 * 24 * 60 * 3_600;

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Access 토큰 생성
    public String createAccessToken(String email) {
        long nowTime = new Date().getTime();

        return Jwts.builder()
                .claim("email", email)
                .subject("AccessToken")
                .expiration(new Date(nowTime + ACCESS_TOKEN_PERIOD))
                .signWith(getSignKey())
                .compact();
    }

}
