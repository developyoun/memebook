package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import meme.book.back.utils.NationCode;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "members")
public class MembersEntity {

    // 회원 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long memberId;

    // 회원 닉네임
    @Column(name = "NICKNAME")
    private String nickName;

    // 가입 접근 타입
    @Column(name = "ACCESS_TYPE")
    private String accessType;

    // 프로필 이미지
    @Column(name = "IMG_URL")
    private String imgUrl;

    // 회원 소속 국가
    @Enumerated(value = EnumType.STRING)
    @Column(name = "NATION")
    private NationCode nationCode;

    // 회원 가입일
    @Column(name = "MEMBER_REG_DTM")
    private LocalDateTime memberRegDtm;

    // 회원 고유 토큰
    @Column(name = "TOKEN")
    private String token;
}

