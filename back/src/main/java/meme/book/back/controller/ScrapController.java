package meme.book.back.controller;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.ScrapDto;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/scrap")
public class ScrapController {

    @GetMapping("/word/list")
    public ResponseDto getWordScrap() {
        return ResponseDto.of();
    }

    @PostMapping("/word")
    public ResponseDto saveWordScrap(@RequestBody ScrapDto scrapDto) {
        log.info("User Scrap: wordIdx {}, {}", scrapDto.getWordIdx(), scrapDto.getWordIdx());

        return ResponseDto.of();
    }
}
