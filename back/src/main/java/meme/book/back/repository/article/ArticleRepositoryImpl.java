package meme.book.back.repository.article;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import meme.book.back.dto.article.ArticleDto;
import meme.book.back.dto.article.ArticleListRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import java.util.List;

import static meme.book.back.entity.QArticle.article;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<ArticleDto> getArticleList(Pageable pageable, ArticleListRequestDto requestDto) {

        List<ArticleDto> fetch = queryFactory.select(Projections.fields(ArticleDto.class,
                        article.articleIdx.as("articleIdx"),
                        article.articleTitle.as("articleTitle"),
                        article.memberIdx.as("memberIdx"),
                        article.regDtm.as("regDtm"),
                        article.articleLikeCnt.as("likeCount"))
                )
                .from(article)
                .where(eqSearch(requestDto.getSearch()))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        JPAQuery<Long> count = queryFactory.select(article.count())
                .from(article)
                .where(eqSearch(requestDto.getSearch()))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset());

        return PageableExecutionUtils.getPage(fetch, pageable, count::fetchOne);
    }

    private BooleanExpression eqSearch(String search) {
        return search == null ? null : article.articleTitle.contains(search);
    }
}
