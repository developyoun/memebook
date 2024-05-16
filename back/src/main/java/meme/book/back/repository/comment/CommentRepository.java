package meme.book.back.repository.comment;

import meme.book.back.entity.Comment;
import meme.book.back.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>, CommentCustomRepository {

    Optional<Comment> findByCommentIdx(Long commentIdx);

    Optional<Comment> findByCommentIdxAndArticleIdx(Long commentIdx, Long articleIdx);

    List<Comment> findAllByArticleIdx(Long articleIdx);
}
