package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.ScrapDto;
import meme.book.back.service.ScrapService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/scrap")
public class ScrapController {

    private final ScrapService scrapService;

    @GetMapping("/word/list/{memberIdx}")
    public ResponseDto getWordScrap(@PathVariable Long memberIdx,
                                    @RequestParam(defaultValue = "1") int page,
                                    @RequestParam(defaultValue = "10") int pageSize
    ) {
        Pageable pageable = PageRequest.of(page-1, pageSize);

        return ResponseDto.of(scrapService.getScrapList(pageable, memberIdx));
    }



    @PostMapping("/word")
    public ResponseDto saveWordScrap(@RequestBody ScrapDto scrapDto) {
        return scrapService.saveScrap(scrapDto);
    }

    @DeleteMapping("/word")
    public ResponseDto deleteWordScrap(@RequestBody ScrapDto scrapDto) {
        scrapService.deleteWordScrap(scrapDto);
        return ResponseDto.of();
    }
}
