package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import meme.book.back.utils.ActionType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "reactions")
public class ReactionsEntity {

    // 반응 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REACTION_IDX")
    private Long reactionIdx;

    // 리액션 타입
    @Enumerated(EnumType.STRING)
    @Column(name = "REACTION_TYPE")
    private ActionType reactionType;

    // 리액션 등록 시간
    @CreatedDate
    @Column(name = "REACTION_REG_DTM")
    private LocalDateTime reactionRegDtm;

    // 리액션 수정 시간
    @LastModifiedDate
    @Column(name = "REACTION_MOD_DTM")
    private LocalDateTime reactionModDtm;

    // 리액션 등록자
    @Column(name = "MEM_IDX")
    private Long memIdx;

    // 리액션할 단어
    @Column(name = "WORD_IDX")
    private Long wordIdx;

}
