package meme.book.back.dto.member;

import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.Member;
import meme.book.back.utils.NationCode;
import meme.book.back.utils.ProviderType;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class MemberDto {

    // 회원 고유 번호
    private Long memberIdx;

    // 회원 Email
    private String memberEmail;

    // 회원 닉네임
    private String nickname;

    // 프로필 이미지
    private String profileImg;

    // 소속 국가
    private NationCode originNation = NationCode.KOR;

    // 대상 국가
    private NationCode targetNation = NationCode.KOR;

    // 회원 가입일
    private LocalDateTime memberRegDtm;

    // 로그인 제공자
    private ProviderType provider;

    public static MemberDto toDto(Member member) {
        return new MemberDto()
                .setMemberIdx(member.getMemberIdx())
                .setNickname(member.getNickname())
                .setMemberEmail(member.getMemberEmail())
                .setTargetNation(member.getTargetNation())
                .setOriginNation(member.getOriginNation())
                .setMemberRegDtm(member.getMemberRegDtm())
                .setProvider(member.getProvider())
                ;
    }
}