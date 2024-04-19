package meme.book.back.dto.word;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class WordContentListResponseDto {

    List<WordContentDto> wordContentList;

    private Long wordIdx;

    private String wordName;

    private Long wordLike;

    private Long wordDislike;

    private Long scrapIdx;

    private int nowPage;

    private int totalPage;

    private long nowCount;

    private long totalCount;

}
