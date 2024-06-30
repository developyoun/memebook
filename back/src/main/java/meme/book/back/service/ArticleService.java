package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.article.*;
import meme.book.back.dto.comment.CommentDto;
import meme.book.back.entity.Article;
import meme.book.back.entity.Comment;
import meme.book.back.entity.Reaction;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.article.ArticleRepository;
import meme.book.back.repository.comment.CommentRepository;
import meme.book.back.repository.member.MemberRepository;
import meme.book.back.repository.reaction.ReactionRepository;
import meme.book.back.utils.ActionType;
import meme.book.back.utils.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ReactionRepository reactionRepository;
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;

    public ArticleListResponseDto getArticleList(Pageable pageable, ArticleListRequestDto requestDto) {
        Page<ArticleListDto> articleDtoList = articleRepository.getArticleList(pageable, requestDto);
        log.info("Get Article List");

        return new ArticleListResponseDto()
                .setArticleList(articleDtoList.getContent())
                .setTotalCount(articleDtoList.getTotalElements())
                .setTotalPage(articleDtoList.getTotalPages());
    }

    public ArticleDetailResponseDto getArticleDetail(Long articleIdx) {
        Article article = articleRepository.findByArticleIdx(articleIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_COMMENT));
        log.info("Get Article Info: {}", article);

        String memberNickname = memberRepository.findByMemberIdx(article.getMemberIdx())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER))
                .getNickname();

        List<CommentDto> commentDtoList = commentRepository.getCommentList(articleIdx);

        List<CommentDto> savedCommentDto = new ArrayList<>();
        Map<Long, CommentDto> commentDtoMap = new HashMap<>();

        commentDtoList.forEach(commentDto -> {
            Long commentIdx = commentDto.getCommentIdx();
            Long upperIdx = commentDto.getUpperIdx();
            commentDtoMap.put(commentIdx, commentDto);

            if (upperIdx == 0) {
                commentDto.setCommentReplyList(new ArrayList<>());
                savedCommentDto.add(commentDto);
            } else {
                commentDtoMap.get(upperIdx).getCommentReplyList().add(commentDto);
            }
        });

        return ArticleDetailResponseDto.toDto(article)
                .setNickname(memberNickname)
                .setCommentCount(commentDtoList.size())
                .setCommentDtoList(savedCommentDto);
    }

    @Transactional
    public ArticleResponseDto createArticle(ArticleRequestDto requestDto) {
        Article article = new Article()
                .setArticleTitle(requestDto.getArticleTitle())
                .setMemberIdx(requestDto.getMemberIdx())
                .setArticleContent(requestDto.getArticleContent())
                .setTag(requestDto.getTag());

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
    public void deleteAllArticle(Long memberIdx) {
        List<Article> articleList = articleRepository.findAllByMemberIdx(memberIdx);

        List<Long> articleIdxList = articleList.stream().map(Article::getArticleIdx).toList();
        List<Comment> commentList = commentRepository.findAllByArticleIdxIn(articleIdxList);

        articleRepository.deleteAll(articleList);
        commentRepository.deleteAll(commentList);

        log.info("All Article Delete, article: {}, comment: {}", articleList.size(), commentList.size());
    }

    @Transactional
    public void deleteArticleList(List<Long> articleIdxList) {
        List<Article> articleList = articleRepository.findAllByArticleIdxIn(articleIdxList);
        articleRepository.deleteAll(articleList);

        List<Comment> commentList = commentRepository.findAllByArticleIdxIn(articleIdxList);
        commentRepository.deleteAll(commentList);

        log.info("Article Deleted, article Idx: {}, comment list: {}", articleIdxList, commentList);
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
