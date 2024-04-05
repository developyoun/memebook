package meme.book.back.dto.word;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.Word;
import meme.book.back.utils.NationCode;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class WordDto {

    // 단어 고유 번호
    private Long wordIdx;

    // 단어명
    private String wordName;

    // 단어 국가
    private NationCode wordNation;

    private Long wordLike;

    private Long wordDislike;

    public static WordDto toWordDto(Word word) {
        return new WordDto()
                .setWordIdx(word.getWordIdx())
                .setWordName(word.getWordName())
                .setWordNation(word.getWordNation())
                .setWordLike(word.getWordLike())
                .setWordDislike(word.getWordDislike());
    }
}
