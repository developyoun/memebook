package meme.book.back.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.WordDto;
import meme.book.back.service.WordService;
import meme.book.back.utils.NationCode;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/word")
public class WordController {

    private final WordService wordService;

    // 단어 리스트 조회
    @GetMapping("/list/{nationCode}")
    public ResponseDto getWordListController(@PathVariable NationCode nationCode,
                                             @RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "10") int pageSize) {
        Pageable pages = PageRequest.of(page-1, pageSize);

        return ResponseDto.of(wordService.getWordListService(nationCode, pages));
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
