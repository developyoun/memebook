package meme.book.back.dto.word;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordListResponseDto {

    List<WordDto> wordList;

    private int nowPage;

    private int totalPage;

    private long nowCount;

    private long totalCount;

}
