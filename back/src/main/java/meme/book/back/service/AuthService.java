package meme.book.back.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.member.MemberDto;
import meme.book.back.dto.member.MemberLoginDto;
import meme.book.back.exception.CustomException;
import meme.book.back.oauth.TokenVerifier;
import meme.book.back.utils.ErrorCode;
import meme.book.back.utils.ProviderType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RequiredArgsConstructor
@Slf4j
@Service
public class AuthService {

    private final TokenVerifier tokenVerifier;
    private final MemberService memberService;

    public String memberDoLogin(String code) {
        try {
            GoogleIdToken googleIdToken = tokenVerifier.getGoogleTokenVerifier().verify(code);
            if (googleIdToken == null) throw new CustomException(ErrorCode.FAILED_LOGIN);

            Payload payload = googleIdToken.getPayload();

            String name = String.valueOf(payload.get("name"));
            String profileImg = String.valueOf(payload.get("picture"));

            MemberLoginDto memberLoginDto = new MemberLoginDto()
                    .setEmail(payload.getEmail())
                    .setName(name)
                    .setProfileImage(profileImg)
                    .setProvider(ProviderType.GOOGLE);

            MemberDto memberDto = memberService.findOrCreateMember(memberLoginDto);

            log.debug("Login Member Info: {}", memberDto);

        } catch (GeneralSecurityException | IOException e) {
            log.error(e.getLocalizedMessage());
            throw new CustomException(ErrorCode.FAILED_LOGIN);
        }

        return null;
    }
}
