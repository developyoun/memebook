package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.comment.CommentRequestDto;
import meme.book.back.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "댓글 API", description = "댓글 관련 API")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @Operation(description = "댓글 생성 API")
    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody CommentRequestDto requestDto) {
        log.info("Create new Comment Request: {}", requestDto);
        return ResponseEntity.ok(commentService.createComment(requestDto));
    }

    @Operation(description = "댓글 수정 API")
    @PutMapping("/update/{commentIdx}")
    public ResponseEntity<?> updateComment(@PathVariable Long commentIdx,
                                           @RequestBody CommentRequestDto requestDto) {
        log.info("Update Comment Request, idx: {}, request: {}", commentIdx, requestDto);
        return ResponseEntity.ok(commentService.updateComment(commentIdx, requestDto));
    }

    @Operation(description = "댓글 좋아요 수정 API")
    @PostMapping("/like/{commentIdx}")
    public ResponseEntity<?> likeUpdateComment(@PathVariable Long commentIdx,
                                               @RequestBody CommentRequestDto requestDto) {
        log.info("Comment Like Update Request, idx: {}, request: {}", commentIdx, requestDto);
        return ResponseEntity.ok(commentService.updateCommentLike(commentIdx, requestDto));
    }

    @Operation(description = "댓글 삭제 API")
    @DeleteMapping("/delete/{commentIdx}")
    public ResponseEntity<?> deleteComment(
            @Parameter(description = "댓글 번호") @PathVariable Long commentIdx,
            @Parameter(description = "요청 회원 번호") @RequestParam Long reqMemIdx) {
        log.info("Comment Delete Request, idx: {}, mem: {}", commentIdx, reqMemIdx);
        commentService.deleteComment(commentIdx, reqMemIdx);
        return ResponseEntity.ok().build();
    }

}
