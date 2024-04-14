package meme.book.back.dto.follow;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class FollowRequestDto {

    private Long follower;

    private Long followee;

}
