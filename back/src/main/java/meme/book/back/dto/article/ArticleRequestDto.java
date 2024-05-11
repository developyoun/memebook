package meme.book.back.dto.article;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ArticleRequestDto {

    @Schema(name = "articleTitle", description = "게시글 제목")
    private String articleTitle;

    @Schema(name = "memberIdx", description = "회원 번호")
    private Long memberIdx;

    @Schema(name = "articleContent", description = "게시글 내용")
    private String articleContent;

}
