package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.*;
import meme.book.back.dto.word.WordContentDto;
import meme.book.back.dto.word.WordListRequestDto;
import meme.book.back.dto.word.WordUpsertRequestDto;
import meme.book.back.service.WordService;
import meme.book.back.utils.ErrorCode;
import meme.book.back.utils.NationCode;
import meme.book.back.utils.SortType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Tag(name = "단어 API", description = "단어 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/word")
public class WordController {

    private final WordService wordService;

    @Operation(summary = "단어 등록 API", description = "단어를 등록한다.")
    @PostMapping("/create")
    public ResponseDto createWord(@RequestBody WordUpsertRequestDto requestDto) {
        return ResponseDto.of(wordService.createWord(requestDto));
    }

    @Operation(summary = "단어 수정 API", description = "단어를 수정한다.")
    @PutMapping("/update")
    public ResponseDto updateWord(@RequestBody WordUpsertRequestDto requestDto) {
        return ResponseDto.of(wordService.updateWord(requestDto));
    }

    @Operation(summary = "단일 단어 조회 API", description = "단일 단어를 조회한다.")
    @GetMapping("/{wordIdx}")
    public ResponseDto getWord(@PathVariable Long wordIdx,
                               @RequestParam(defaultValue = "1") int page,
                               @RequestParam(defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);

        return ResponseDto.of(wordService.getWordContent(pageable, wordIdx));
    }

    @Operation(summary = "단어 리스트 조회 API", description = "단어를 리스트를 조회한다.")
    @GetMapping("/list")
    public ResponseDto getWordListController(@RequestParam(defaultValue = "1") int page,
                                             @RequestParam(defaultValue = "10") int pageSize,
                                             @RequestParam(defaultValue = "ALL") NationCode nation,
                                             @RequestParam(required = false) SortType sort,
                                             @RequestParam(required = false) String sortBy,
                                             @RequestParam(required = false) String search
    ) {
        if (sort == null && sortBy != null) {
            return ResponseDto.error(ErrorCode.NOT_CORRECT_PARAMETER);
        }
        Pageable pageable = PageRequest.of(page-1, pageSize);

        WordListRequestDto requestDto = new WordListRequestDto()
                .setNationCode(nation)
                .setSearch(search)
                .setSort(sort)
                .setSortBy(sortBy);

        return ResponseDto.of(wordService.getWordListService(pageable, requestDto));
    }

}
