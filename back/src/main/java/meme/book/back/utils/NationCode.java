package meme.book.back.utils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NationCode {

    USA("ENG", "미국"),
    JPN("JAPAN", "일본"),
    VNM("VIETNAM", "베트남");

    private final String nation;

    private final String kor;


}
