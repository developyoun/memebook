package meme.book.back.dto.member;

import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.ProviderType;

@Data
@Accessors(chain = true)
public class MemberLoginDto {

    /* 로그인 이메일 */
    private String email;

    /* 회원 이름 */
    private String name;

    /* 프로필 이미지 */
    private String profileImage;

    /* 로그인 제공자 */
    private ProviderType provider;
}
