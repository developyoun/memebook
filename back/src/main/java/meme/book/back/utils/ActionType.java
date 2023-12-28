package meme.book.back.utils;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ActionType {

    LIKE("좋아요"),
    UNLIKE("싫어요");

    private final String kor;
}
