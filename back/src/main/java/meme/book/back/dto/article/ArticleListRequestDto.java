package meme.book.back.dto.article;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ArticleListRequestDto {

    private String search;

    private Long memberIdx;
}
