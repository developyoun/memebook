package meme.book.back.repository.article;

import meme.book.back.entity.Article;
import meme.book.back.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleCustomRepository {

    Optional<Article> findByArticleIdx(Long articleIdx);

}
