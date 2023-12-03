package meme.book.back.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.WordsEntity;
import meme.book.back.utils.NationCode;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class WordDto {

    // 단어 고유 번호
    private Long wordIdx;

    // 기존 단어
    private String originWord;

    // 결과 단어
    private String resultWord;

    // 단어 국가
    private NationCode wordNation;

    // 단어 등록자
    private Long wordRegMem;

    // 단어 등록일
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime wordRegDtm;

    // entity -> DTO
    public static WordDto toDto(WordsEntity wordsEntity) {
        return new WordDto()
                .setWordIdx(wordsEntity.getWordIdx())
                .setOriginWord(wordsEntity.getOriginWord())
                .setResultWord(wordsEntity.getResultWord())
                .setWordNation(wordsEntity.getWordNation())
                .setWordRegMem(wordsEntity.getWordRegMem())
                .setWordRegDtm(wordsEntity.getWordRegDtm());
    }
}
