package meme.book.back.repository;

import meme.book.back.entity.ReactionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ReactionRepository extends JpaRepository<ReactionsEntity, Long> {
}
