package meme.book.back.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.Accessors;
import meme.book.back.utils.NationCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Accessors(chain = true)
@Setter @Getter @ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "MEMBER")
public class Member implements Serializable {

    @Serial
    private static final long serialVersionUID = -4629779128073180218L;

    // 회원 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_IDX")
    private Long memberIdx;

    // 회원 ID
    @Column(name = "MEMBER_ID")
    private String memberId;

    // 회원 PW
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
    @Enumerated(value = EnumType.STRING)
    @Column(name = "ORIGIN_NATION")
    private NationCode originNation = NationCode.KOR;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "TARGET_NATION")
    private NationCode targetNation = NationCode.ALL;

    // 회원 가입일
    @CreatedDate
    @Column(name = "MEMBER_REG_DTM")
    private LocalDateTime memberRegDtm;

}


