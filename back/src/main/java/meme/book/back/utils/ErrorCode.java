package meme.book.back.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 2xx
    SAME_NATION_CODE(HttpStatus.ALREADY_REPORTED, "기존 국가와 같은 국가 설정 입니다."),

    // 4xx
    NOT_CORRECT_PARAMETER(HttpStatus.BAD_REQUEST, "옳바르지 않은 파라미터 값입니다."),
    ALREADY_EXIST_NICKNAME(HttpStatus.CONFLICT, "이미 존재하는 닉네임입니다."),
    NOT_EXIST_WORD(HttpStatus.NOT_FOUND, "존재하지 않는 단어입니다."),
    NOT_EXIST_SCRAP(HttpStatus.NOT_FOUND, "존재하지 않는 스크랩입니다."),
    NOT_EXIST_MEMBER(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    NOT_EXIST_CONTENT_USER(HttpStatus.BAD_REQUEST, "회원이 작성한 컨텐츠가 아닙니다"),
    ALREADY_EXIST_MEMBER_WORD(HttpStatus.CONFLICT, "이미 회원의 단어가 존재합니다."),
    ALREADY_EXIST_MEMBER_SCRAP(HttpStatus.CONFLICT, "이미 회원의 스크랩 단어가 존재합니다."),
    ;

    private final HttpStatus status;
    private final String message;

}
