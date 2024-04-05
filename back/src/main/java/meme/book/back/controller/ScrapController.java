package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.ScrapDto;
import meme.book.back.service.ScrapService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Tag(name = "스크랩 API", description = "스크랩 관련 API")
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/scrap")
public class ScrapController {

    private final ScrapService scrapService;

    @Operation(summary = "회원 스크랩 API", description = "단일 회원의 스크랩 리스트를 조회한다.")
    @GetMapping("/word/list/{memberIdx}")
    public ResponseDto getWordScrap(@PathVariable Long memberIdx,
                                    @RequestParam(defaultValue = "1") int page,
                                    @RequestParam(defaultValue = "10") int pageSize
    ) {
        Pageable pageable = PageRequest.of(page-1, pageSize);

        return ResponseDto.of(scrapService.getScrapList(pageable, memberIdx));
    }

    @Operation(summary = "단어 스크랩 등록 API", description = "단어를 스크랩을 등록한다.")
    @PostMapping("/word")
    public ResponseDto saveWordScrap(@RequestBody ScrapDto scrapDto) {
        return scrapService.saveScrap(scrapDto);
    }

    @Operation(summary = "단어 스크랩 삭제 API", description = "단어의 스크랩을 삭제한다.")
    @DeleteMapping("/word")
    public ResponseDto deleteWordScrap(@RequestBody ScrapDto scrapDto) {
        scrapService.deleteWordScrap(scrapDto);
        return ResponseDto.of();
    }
}
