package meme.book.back.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.ActionType;

@Data
@Accessors(chain = true)
public class ReactionRequestDto {

    private Long reactionIdx;

    private ActionType reactionType;

    private Long memIdx;

    private Long wordIdx;

}
