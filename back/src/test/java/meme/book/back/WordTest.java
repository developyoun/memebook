package meme.book.back;

import com.querydsl.core.Tuple;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.WordResponseDto;
import meme.book.back.repository.word.WordRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Slf4j
@SpringBootTest
public class WordTest {

    @Autowired
    WordRepository wordRepository;

    @Test
    void getWordListTest() {
        List<Tuple> result = wordRepository.getAllWordList(0, 20);

        result.forEach(r -> {
            log.info("{}", r);
        });

        log.info("result: {}", result);
    }
}
