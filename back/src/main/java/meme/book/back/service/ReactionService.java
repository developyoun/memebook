package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ReactionDto;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.reaction.ReactionCountDto;
import meme.book.back.entity.Reaction;
import meme.book.back.repository.ReactionRepository;
import meme.book.back.utils.ActionType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;

    @Transactional
    public ResponseDto upsertReactionService(ReactionDto reactionDto) {
        Reaction reaction;

        Optional<Reaction> optionalReaction = reactionRepository
                .findReactionByMemIdxAndWordIdx(reactionDto.getMemIdx(), reactionDto.getWordIdx());

        if (optionalReaction.isPresent()) {
            reaction = optionalReaction.get();
            if (!reaction.getReactionType().equals(reactionDto.getReactionType())) {
                reactionRepository.delete(reaction);
            } else {
                reaction.setReactionType(reactionDto.getReactionType());
                reactionRepository.save(reaction);
            }
        } else {
            reaction = new Reaction()
                    .setReactionType(reactionDto.getReactionType())
                    .setWordIdx(reactionDto.getWordIdx())
                    .setMemIdx(reactionDto.getMemIdx());

            reactionRepository.save(reaction);
        }
        return ResponseDto.of(ReactionDto.toDto(reaction));
    }

    @Transactional(readOnly = true)
    public ResponseDto countReactionService(Long wordIdx) {
        long likeCount = reactionRepository.countByWordIdxAndReactionType(wordIdx, ActionType.LIKE);
        long dislikeCount = reactionRepository.countByWordIdxAndReactionType(wordIdx, ActionType.DISLIKE);

        log.info("Reaction Count By wordIdx: {}, Like Count: {}, Dislike Count: {}", wordIdx, likeCount, dislikeCount);
        return ResponseDto.of(new ReactionCountDto()
                .setLikeCount(likeCount)
                .setDislikeCount(dislikeCount)
        );
    }
}
