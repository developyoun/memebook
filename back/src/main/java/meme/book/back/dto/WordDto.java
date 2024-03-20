package meme.book.back.dto;

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
    private String wordTitle;

    // 단어 설명
    private String wordContent;

    // 단어 국가
    private NationCode wordNation;

    // 단어 등록자
    private Long regMem;

    // 단어 등록일
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime regDtm;

    // 단어 수정자
    private Long modMem;

    // 단어 수정일
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime modDtm;

    // entity -> DTO
    public static WordDto toDto(Word wordsEntity) {
        return new WordDto()
                .setWordIdx(wordsEntity.getWordIdx())
                .setWordTitle(wordsEntity.getWordTitle())
                .setWordContent(wordsEntity.getWordContent())
                .setWordNation(wordsEntity.getWordNation())
                .setRegMem(wordsEntity.getRegMem())
                .setRegDtm(wordsEntity.getRegDtm())
                .setModMem(wordsEntity.getModMem())
                .setModDtm(wordsEntity.getModDtm())
                ;
    }
}
