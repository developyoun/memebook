package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.ScrapDto;
import meme.book.back.service.ScrapService;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/scrap")
public class ScrapController {

    private final ScrapService scrapService;

    @GetMapping("/word/list")
    public ResponseDto getWordScrap() {

        return ResponseDto.of();
    }

    @PostMapping("/word")
    public ResponseDto saveWordScrap(@RequestBody ScrapDto scrapDto) {
        return scrapService.saveWordScrap(scrapDto);
    }
}
