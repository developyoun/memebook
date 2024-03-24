package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.WordDto;
import meme.book.back.service.WordService;
import meme.book.back.utils.NationCode;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/word")
public class WordController {

    private final WordService wordService;

    // 단일 단어 조회
    @GetMapping("/{wordIdx}")
    public ResponseDto getWordController(@PathVariable Long wordIdx) {
        return wordService.getWordService(wordIdx);
    }

    // 단어 리스트 조회
    @GetMapping("/list")
    public ResponseDto getWordListController(@RequestParam(defaultValue = "ALL") NationCode nation,
                                             @RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "10") int pageSize
    ) {
        // 좋아요 싫어요 스크랩 최신순
        Pageable pages = PageRequest.of(page-1, pageSize);

        return ResponseDto.of(wordService.getWordListService(nation, pages));
    }

    // 단어 등록 Controller
    @PostMapping("/create")
    public ResponseDto createWordController(@RequestBody WordDto requestWordDto) {
        return wordService.createWordService(requestWordDto);
    }

    // 단어 수정 Controller
    @PutMapping("/update")
    public ResponseDto updateWordController(@RequestBody WordDto requestWordDto) {
        return wordService.updateWordService(requestWordDto);
    }

}
