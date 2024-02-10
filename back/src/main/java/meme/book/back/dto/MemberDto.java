package meme.book.back.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.MembersEntity;
import meme.book.back.utils.NationCode;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class MemberDto {

    // 회원 고유 번호
    private Long memberIdx;

    // 회원 ID
    private String memberId;

    // 회원 PW
    private String memberPw;

    // 회원 닉네임
    private String nickname;

    // 프로필 이미지
    private String imgUrl;

    // 회원 국가
    private NationCode hostNation;

    // 대상 국가
    private NationCode targetNation;

    // 회원 가입일
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime memberRegDtm;

    public static MemberDto toDto(MembersEntity membersEntity) {
        return new MemberDto()
                .setMemberIdx(membersEntity.getMemberIdx())
                .setMemberId(membersEntity.getMemberId())
                .setMemberPw(membersEntity.getMemberPw())
                .setNickname(membersEntity.getNickname())
                .setImgUrl(membersEntity.getImgUrl())
                .setHostNation(membersEntity.getHostNation())
                .setTargetNation(membersEntity.getTargetNation())
                .setMemberRegDtm(membersEntity.getMemberRegDtm());
    }
}
