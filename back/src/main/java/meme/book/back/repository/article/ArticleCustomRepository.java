package meme.book.back.repository.article;

import meme.book.back.dto.article.ArticleDto;
import meme.book.back.dto.article.ArticleListRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleCustomRepository {

    Page<ArticleDto> getArticleList(Pageable pageable, ArticleListRequestDto requestDto);

}
