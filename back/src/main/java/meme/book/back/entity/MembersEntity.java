package meme.book.back.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import meme.book.back.dto.MemberDto;
import meme.book.back.utils.NationCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "members")
public class MembersEntity {

    // 회원 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_IDX")
    private Long memberIdx;

    // 회원 ID
    @NotNull
    @Column(name = "MEMBER_ID")
    private String memberId;

    // 회원 PW
    @NotNull
    @Column(name = "MEMBER_PW")
    private String memberPw;

    // 회원 닉네임
    @NotNull
    @Column(name = "NICKNAME")
    private String nickname;

    // 프로필 이미지
    @Column(name = "IMG_URL")
    private String imgUrl;

    // 회원 소속 국가
    @NotNull
    @Enumerated(value = EnumType.STRING)
    @Column(name = "NATION")
    private NationCode nationCode;

    // 회원 가입일
    @CreatedDate
    @Column(name = "MEMBER_REG_DTM")
    private LocalDateTime memberRegDtm;

    @Builder
    public MembersEntity(MemberDto memberDto) {
        this.memberIdx = memberDto.getMemberIdx();
        this.memberId = memberDto.getMemberId();
        this.memberPw = memberDto.getMemberPw();
        this.nickname = memberDto.getNickname();
        this.imgUrl = memberDto.getImgUrl();
        this.nationCode = memberDto.getNationCode();
        this.memberRegDtm = memberDto.getMemberRegDtm();
    }

}

