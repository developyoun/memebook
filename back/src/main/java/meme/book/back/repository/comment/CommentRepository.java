package meme.book.back.repository.comment;

import meme.book.back.entity.Comment;
import meme.book.back.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>, CommentCustomRepository {

    long countByArticleIdx(Long articleIdx);

    Optional<Comment> findByCommentIdx(Long commentIdx);

    Optional<Comment> findByCommentIdxAndArticleIdx(Long commentIdx, Long articleIdx);
}
