package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ReactionDto;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.reaction.ReactionCountDto;
import meme.book.back.entity.Reaction;
import meme.book.back.entity.Word;
import meme.book.back.repository.reaction.ReactionRepository;
import meme.book.back.repository.word.WordRepository;
import meme.book.back.utils.ActionType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;
    private final WordRepository wordRepository;

    @Transactional
    public ResponseDto upsertReactionService(ReactionDto reactionDto) {
        Reaction reaction;

        Word word = wordRepository.findByWordIdx(reactionDto.getWordIdx());

        Optional<Reaction> optionalReaction = reactionRepository
                .findReactionByMemIdxAndWordIdx(reactionDto.getMemIdx(), reactionDto.getWordIdx());

        if (optionalReaction.isPresent()) {
            // 기존 단어 존재
            reaction = optionalReaction.get();
            if (reaction.getReactionType().equals(reactionDto.getReactionType())) {
                // 요청과 기존값 동일시 처리 (기존 저장값 delete)
                reactionRepository.delete(reaction);
                if (reactionDto.getReactionType().equals(ActionType.LIKE)) {
                    word.setWordLike(word.getWordLike() - 1);
                } else {
                    word.setWordDislike(word.getWordDislike() - 1);
                }
            } else {
                // 요청과 기존값 다를시 처리 (기존 저장값 update)
                reaction.setReactionType(reactionDto.getReactionType());
                if (reactionDto.getReactionType().equals(ActionType.LIKE)) {
                    word.setWordLike(word.getWordLike() + 1);
                    word.setWordDislike(word.getWordDislike() - 1);
                } else {
                    word.setWordDislike(word.getWordDislike() + 1);
                    word.setWordLike(word.getWordLike() - 1);
                }
            }

        } else {
            // 신규 단어 등록
            reaction = new Reaction()
                    .setReactionType(reactionDto.getReactionType())
                    .setWordIdx(reactionDto.getWordIdx())
                    .setMemIdx(reactionDto.getMemIdx());

            if (reactionDto.getReactionType().equals(ActionType.LIKE)) {
                word.setWordLike(word.getWordLike() + 1);
            } else {
                word.setWordDislike(word.getWordDislike() + 1);
            }
        }

        reactionRepository.save(reaction);
        wordRepository.save(word);

        return ResponseDto.of(ReactionDto.toDto(reaction));
    }

    @Transactional(readOnly = true)
    public ResponseDto countReactionService(Long wordIdx) {
        Word word = wordRepository.findByWordIdx(wordIdx);

        long likeCount = word.getWordLike();
        long dislikeCount = word.getWordDislike();

        log.info("Reaction Count By wordIdx: {}, Like Count: {}, Dislike Count: {}", wordIdx, likeCount, dislikeCount);

        return ResponseDto.of(new ReactionCountDto()
                .setLikeCount(likeCount)
                .setDislikeCount(dislikeCount)
        );
    }
}
