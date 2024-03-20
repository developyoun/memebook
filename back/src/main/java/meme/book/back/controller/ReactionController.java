package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ReactionDto;
import meme.book.back.dto.ResponseDto;
import meme.book.back.service.ReactionService;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/reaction")
public class ReactionController {

    private final ReactionService reactionService;

    @PostMapping("/update")
    public ResponseDto upsertReaction(@RequestBody ReactionDto reactionDto) {
        log.info("Reaction Request: {}", reactionDto);

        return ResponseDto.of(reactionService.upsertReactionService(reactionDto));
    }

    @GetMapping("/count")
    public ResponseDto countReactionByWordIdx(@RequestParam Long wordIdx) {
        log.info("Reaction Count By WordIdx: {}", wordIdx);

        return ResponseDto.of(reactionService.countReactionService(wordIdx));
    }
}
