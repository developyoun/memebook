package meme.book.back;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.WordDto;
import meme.book.back.repository.TestInterface;
import meme.book.back.service.WordService;
import meme.book.back.utils.NationCode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Transactional
@SpringBootTest
public class WordTest {

    @Autowired
    WordService wordService;

    @Autowired
    TestInterface testInterface;

    @Test
    void createWordTest() {

        testInterface.test();

        LocalDateTime now = LocalDateTime.now();
        log.info("### Now: {}", now);

        WordDto wordDto = new WordDto()
                .setOriginWord("원본 단어")
                .setResultWord("결과 단어")
                .setWordNation(NationCode.KOR)
                .setWordRegDtm(now);

        WordDto result = wordService.createWordService(wordDto);

        log.info("### Result: {}", result.getWordRegDtm());
    }
}
