package meme.book.back.repository;

import meme.book.back.entity.Reaction;
import meme.book.back.utils.ActionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    Optional<Reaction> findReactionByMemIdxAndWordIdx(Long memIdx, Long wordIdx);

    long countByWordIdxAndReactionType(Long memIdx, ActionType wordIdx);
}
