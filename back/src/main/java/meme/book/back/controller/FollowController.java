package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.follow.FollowRequestDto;
import meme.book.back.service.FollowService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "팔로우 API", description = "팔로우 관련 API")
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/follow")
public class FollowController {

    private final FollowService followService;

    @Operation(summary = "팔로우 생성/삭제 API", description = "팔로우 등록 및 삭제한다.")
    @PostMapping("/update")
    public ResponseEntity<?> saveFollow(@RequestBody FollowRequestDto requestDto) {
        return ResponseEntity.ok(followService.saveFollow(requestDto));
    }

    @Operation(summary = "팔로우 리스트 조회 API", description = "팔로우 리스트를 조회한다.")
    @GetMapping("/list")
    public ResponseEntity<?> getFollowList(@RequestParam Long memberIdx,
                                           @RequestParam(defaultValue = "1") int page,
                                           @RequestParam(defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        
        return ResponseEntity.ok(followService.getFollowList(pageable, memberIdx));
    }

}
