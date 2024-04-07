package meme.book.back.dto.word;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordContentListResponseDto {

    List<WordContentDto> wordContentList;

    private Long wordIdx;

    private String wordName;

    private Long wordLike;

    private Long wordDislike;

    private int nowPage;

    private int totalPage;

    private long nowCount;

    private long totalCount;

}
