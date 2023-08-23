package meme.book.back.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.NationCode;

@Data
@Accessors(chain = true)
public class RequestWordDto {

    // 대상 단어
    String originWord;

    // 번역 단어
    String resultWord;

    // 단어 대상 국가
    NationCode wordNation;

    // 단어 등록자 번호
    long wordRegMem;

}
