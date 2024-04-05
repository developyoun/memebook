package meme.book.back;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.word.WordListRequestDto;
import meme.book.back.dto.word.WordUpsertRequestDto;
import meme.book.back.repository.word.WordRepository;
import meme.book.back.service.WordService;
import meme.book.back.utils.NationCode;
import meme.book.back.utils.SortType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Slf4j
@SpringBootTest
public class WordTest {

    @Autowired
    WordRepository wordRepository;

    @Autowired
    private WordService wordService;

    Pageable pageable = PageRequest.of(0, 20);
    WordListRequestDto requestDto = new WordListRequestDto();
    WordUpsertRequestDto wordCreateRequestDto = new WordUpsertRequestDto();

    @BeforeEach
    void init() {
        requestDto.setNationCode(NationCode.ALL)
                .setSort(SortType.LATEST)
        ;

        wordCreateRequestDto.setWordName("하이f후우우우")
                .setMemberIdx(12L)
                .setWordNation(NationCode.KOR)
                .setWordContent("내용이요~");
    }

    @Rollback(value = false)
    @Test
    @DisplayName("단어 생성 테스트")
    void createWordTest() {
        wordService.createWord(wordCreateRequestDto);
    }

    @Test
    @DisplayName("단일 단어 조회")
    void getOneWordTest() {
        wordService.getWordContent(pageable, 109L);
    }
}
