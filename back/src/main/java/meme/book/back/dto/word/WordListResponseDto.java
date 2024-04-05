package meme.book.back.dto.word;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.NationCode;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class WordListResponseDto {

    // 단어 고유 번호
    private Long wordIdx;

    // 단어명
    private String wordName;

    // 단어 설명
    private String wordContent;

    // 단어 국가
    private NationCode wordNation;

    // 좋아요 수
    private long likeCount;

    // 싫어요 수
    private long dislikeCount;
}
