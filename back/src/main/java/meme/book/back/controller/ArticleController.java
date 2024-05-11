package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.article.ArticleListRequestDto;
import meme.book.back.dto.article.ArticleRequestDto;
import meme.book.back.service.ArticleService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "게시글 API", description = "게시글 관련 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/article")
public class ArticleController {

    private final ArticleService articleService;

    @Operation(summary = "게시글 리스트 API")
    @GetMapping("/list")
    public ResponseEntity<?> getArticleList(@RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10") int pageSize,
                                            @RequestParam(required = false) String search) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        ArticleListRequestDto requestDto = new ArticleListRequestDto().setSearch(search);
        log.info("Article Get List Request, page: {}, pageSize: {}, request: {}", page, page, requestDto);

        return ResponseEntity.ok(articleService.getArticleList(pageable, requestDto));
    }

    @Operation(summary = "게시글 생성 API")
    @PostMapping("/create")
    public ResponseEntity<?> createArticle(@RequestBody ArticleRequestDto requestDto) {
        log.info("Article Create Request: {}", requestDto);
        return ResponseEntity.ok(articleService.createArticle(requestDto));
    }

    @Operation(summary = "게시글 수정 API")
    @PutMapping("/update/{articleIdx}")
    public ResponseEntity<?> updateArticle(@PathVariable Long articleIdx,
                                           @RequestBody ArticleRequestDto requestDto) {
        log.info("Article Update Request: {}", requestDto);
        return ResponseEntity.ok(articleService.updateArticle(articleIdx, requestDto));
    }

    @Operation(summary = "게시글 삭제 API")
    @DeleteMapping("/delete/{articleIdx}")
    public ResponseEntity<?> deleteArticle(@PathVariable Long articleIdx) {
        log.info("Article Delete Request: {}", articleIdx);
        articleService.deleteArticle(articleIdx);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "게시글 좋아요 업데이트 API")
    @PostMapping("/count/{articleIdx}")
    public ResponseEntity<?> countUpdateArticle(@PathVariable Long articleIdx,
                                                @RequestBody ArticleRequestDto requestDto) {
        log.info("Article Count Update: {}, Request: {}", articleIdx, requestDto);
        return ResponseEntity.ok(articleService.countArticleUpdate(articleIdx, requestDto));
    }



}
