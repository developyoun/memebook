package meme.book.back.oauth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.PrivateKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;

    public JwtTokenProvider(
            @Value("${auth.jwt.secret:lobjymuPoM5qqZ99JmGyT79EeTOLUZAxqHcVmPMZt7C6nb6cUgfJOnH2NaqqKJMR}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // Access 토큰 유효 기간 = 1시간
    private static final long ACCESS_TOKEN_PERIOD = 3_600;

    // Refresh 토큰 유효 기간 = 7일
    private static final long REFRESH_TOKEN_PERIOD =  7 * 24 * 3_600;

//    private SecretKey getSecretKey() {
//        System.out.println(secretKey);
//        return new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_16), Jwts.SIG.HS512.key().build().getAlgorithm());
//    }

    private JwtParser jwtParser(String token) {
        System.out.println(token);
        JwtParser jwtParser = Jwts.parser()
                .verifyWith(secretKey)
                .build();

        return jwtParser;
    }

    // Access 토큰 생성
    public String createAccessToken(String email) {
        Date nowTime = new Date();

        return Jwts.builder()
                .claim("email", email)
                .subject("AccessToken")
                .signWith(secretKey)
                .expiration(new Date(nowTime.getTime() + ACCESS_TOKEN_PERIOD))
                .compact();
    }

    public Claims extractInfoByToken(String token) {
        return jwtParser(token).parseSignedClaims(token).getPayload();
    }

}
