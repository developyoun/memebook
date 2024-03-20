package meme.book.back.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.Reaction;
import meme.book.back.utils.ActionType;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class ReactionDto {

    /* 리액션 idx */
    private Long reactionIdx;

    /* 리액션 타입 */
    private ActionType reactionType;

    /* 리액션 등록자 */
    private Long memIdx;

    /* 리액션 단어 */
    private Long wordIdx;

    /* 리액션 생성시간 */
    private LocalDateTime reactionRegDtm;

    /* 리액션 수정시간 */
    private LocalDateTime reactionModDtm;

    // Entity -> DTO 변환
    public static ReactionDto toDto(Reaction entity) {
        return new ReactionDto()
                .setReactionIdx(entity.getReactionIdx())
                .setReactionType(entity.getReactionType())
                .setMemIdx(entity.getMemIdx())
                .setWordIdx(entity.getWordIdx())
                .setReactionRegDtm(entity.getReactionRegDtm())
                .setReactionModDtm(entity.getReactionModDtm());
    }

}
