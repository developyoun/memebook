package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.article.*;
import meme.book.back.entity.Article;
import meme.book.back.entity.Reaction;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.article.ArticleRepository;
import meme.book.back.repository.reaction.ReactionRepository;
import meme.book.back.utils.ActionType;
import meme.book.back.utils.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ReactionRepository reactionRepository;

    public ArticleListResponseDto getArticleList(Pageable pageable, ArticleListRequestDto requestDto) {
        Page<ArticleListDto> articleDtoList = articleRepository.getArticleList(pageable, requestDto);
        log.info("Get Article List");

        return new ArticleListResponseDto()
                .setArticleList(articleDtoList.getContent())
                .setTotalCount(articleDtoList.getTotalElements())
                .setTotalPage(articleDtoList.getTotalPages());
    }

    @Transactional
    public ArticleResponseDto createArticle(ArticleRequestDto requestDto) {
        Article article = new Article()
                .setArticleTitle(requestDto.getArticleTitle())
                .setMemberIdx(requestDto.getMemberIdx())
                .setArticleContent(requestDto.getArticleContent());

        articleRepository.save(article);

        log.info("Create new Article: {}", article);
        return ArticleResponseDto.toDto(article);
    }

    @Transactional
    public ArticleResponseDto updateArticle(Long articleIdx, ArticleRequestDto requestDto) {
        Article article = articleRepository.findByArticleIdx(articleIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_ARTICLE));

        article.setArticleTitle(requestDto.getArticleTitle())
                .setArticleContent(requestDto.getArticleContent());

        articleRepository.save(article);

        log.info("Update Article: {}", article);
        return ArticleResponseDto.toDto(article);
    }

    @Transactional
    public void deleteArticle(Long articleIdx, Long reqMemIdx) {
        Article article = articleRepository.findByArticleIdx(articleIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_ARTICLE));

        if (!article.getMemberIdx().equals(reqMemIdx)) {
            throw new CustomException(ErrorCode.NOT_MATCH_MEMBER);
        }

        log.info("Article Deleted, article Idx: {}", articleIdx);
        articleRepository.delete(article);
    }

    @Transactional
    public ArticleResponseDto countArticleUpdate(Long articleIdx, ArticleRequestDto requestDto) {
        Article article = articleRepository.findByArticleIdx(articleIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_ARTICLE));

        Optional<Reaction> optionalReaction =
                reactionRepository.findByReactionTypeAndTargetIdx(ActionType.ARTICLE_LIKE, articleIdx);

        if (optionalReaction.isPresent()) {
            Reaction reaction = optionalReaction.get();
            article.setArticleLikeCnt(article.getArticleLikeCnt() - 1);

            reactionRepository.delete(reaction);
            log.info("Count Down Article Count: {}", article);
        } else {
            Reaction reaction = new Reaction().setReactionType(ActionType.ARTICLE_LIKE)
                    .setMemberIdx(requestDto.getMemberIdx())
                    .setTargetIdx(articleIdx);

            article.setArticleLikeCnt(article.getArticleLikeCnt() + 1);

            reactionRepository.save(reaction);
            log.info("Count Up Article Count: {}", article);
        }

        articleRepository.save(article);
        return ArticleResponseDto.toDto(article);
    }
}
