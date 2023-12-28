package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ReactionDto;
import meme.book.back.service.ReactionService;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/v1/reaction")
public class ReactionController {

    private final ReactionService reactionService;

    @PostMapping()
    public void upsertReaction(@RequestBody ReactionDto reactionDto) {
        log.info("Reaction Request: {}", reactionDto);


    }
}
