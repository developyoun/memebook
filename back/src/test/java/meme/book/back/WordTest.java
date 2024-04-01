package meme.book.back;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.WordRequestDto;
import meme.book.back.dto.WordResponseDto;
import meme.book.back.entity.Word;
import meme.book.back.repository.word.WordRepository;
import meme.book.back.utils.NationCode;
import meme.book.back.utils.SortType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Slf4j
@SpringBootTest
public class WordTest {

    @Autowired
    WordRepository wordRepository;

    Pageable pageable = PageRequest.of(0, 20);
    WordRequestDto requestDto = new WordRequestDto();

    @BeforeEach
    void init() {
        requestDto.setNationCode(NationCode.ALL)

                .setSort(SortType.LATEST)
        ;
    }

    @Test
    void getWordListTest() {
        Page<WordResponseDto> result = wordRepository.getAllWordList(pageable, requestDto);
        log.info("result: {}", result);
    }

    @Test
    void test() {
        log.info("{}", requestDto.getSortBy().equals("123"));
    }
}
