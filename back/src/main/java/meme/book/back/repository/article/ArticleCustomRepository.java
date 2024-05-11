package meme.book.back.repository.article;

import meme.book.back.dto.article.ArticleListDto;
import meme.book.back.dto.article.ArticleListRequestDto;
import meme.book.back.dto.article.ArticleListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArticleCustomRepository {

    Page<ArticleListDto> getArticleList(Pageable pageable, ArticleListRequestDto requestDto);
}
