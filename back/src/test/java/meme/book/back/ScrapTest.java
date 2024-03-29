package meme.book.back;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.controller.ScrapController;
import meme.book.back.dto.ScrapDto;
import meme.book.back.service.ScrapService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Transactional
@SpringBootTest
public class ScrapTest {

    @Autowired
    private ScrapService scrapService;

    @Autowired
    private ScrapController scrapController;

    ScrapDto scrapDto = new ScrapDto();

    @BeforeEach
    void init() {
        scrapDto.setMemberIdx(111L)
                .setWordIdx(222L)
                .setScrapRegDtm(LocalDateTime.now())
                ;
    }

    @Test
    void saveScrap() {
        scrapController.saveWordScrap(scrapDto);
    }
}
