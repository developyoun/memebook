package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

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
    @Column(name = "REACTION_TYPE")
    private Character reactionType;

    // 리액션 등록자
    @Column(name = "REACTION_REG_MEM")
    private Long reactionRegMem;

    // 리액션 등록 시간
    @Column(name = "REACTION_REG_DTM")
    private LocalDateTime reactionRegDtm;

    // 리액션 수정자
    @Column(name = "REACTION_MOD_MEM")
    private Long reactionModMem;

    // 리액션 수정 시간
    @Column(name = "REACTION_MOD_DTM")
    private LocalDateTime reactionModDtm;

}
