package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.RequestWordDto;
import meme.book.back.entity.WordEntity;
import meme.book.back.service.WordService;
import meme.book.back.utils.NationCode;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/word")
public class WordController {

    private final WordService wordService;

    // 단어 리스트 조회
    @GetMapping("/list/{nationCode}")
    public List<WordEntity> getWordListController(@PathVariable NationCode nationCode,
                                                  @RequestParam(defaultValue = "1") int page,
                                                  @RequestParam(defaultValue = "10") int pageSize) {
        Pageable pages = PageRequest.of(page-1, pageSize);
        log.info("### Nation: {}, Page: {}", nationCode, pages);

        return wordService.getWordListService(nationCode, pages);
    }

    // 단어 등록 API
    @PostMapping("/create")
    public void createWordController(@RequestBody RequestWordDto requestWordDto) {
        log.info("### Create Word: {}", requestWordDto);
        wordService.createWordService(requestWordDto);
    }
}
