package meme.book.back.dto.reaction;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ReactionCountDto {

    Long likeCount;

    Long dislikeCount;
}
