package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.comment.CommentRequestDto;
import meme.book.back.dto.comment.CommentResponseDto;
import meme.book.back.entity.Comment;
import meme.book.back.entity.Reaction;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.comment.CommentRepository;
import meme.book.back.repository.reaction.ReactionRepository;
import meme.book.back.utils.ActionType;
import meme.book.back.utils.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ReactionRepository reactionRepository;

    @Transactional
    public CommentResponseDto createComment(CommentRequestDto requestDto) {
        Comment comment = new Comment()
                .setCommentContent(requestDto.getCommentContent())
                .setMemberIdx(requestDto.getMemberIdx())
                .setUpperIdx(requestDto.getUpperIdx());
        commentRepository.save(comment);

        log.info("Create new Comment: {}", comment);

        return CommentResponseDto.toDto(comment);
    }

    @Transactional
    public CommentResponseDto updateComment(Long commentIdx, CommentRequestDto requestDto) {
        Comment comment = commentRepository.findByCommentIdxAndArticleIdx(commentIdx, requestDto.getArticleIdx())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_COMMENT));

        if (comment.getMemberIdx().equals(requestDto.getMemberIdx())) {
            throw new CustomException(ErrorCode.NOT_MATCH_MEMBER);
        }

        comment.setCommentContent(requestDto.getCommentContent());

        log.info("Update Comment, Idx: {}, Comment: {}", commentIdx, requestDto.getCommentContent());
        return CommentResponseDto.toDto(comment);
    }

    @Transactional
    public CommentResponseDto updateCommentLike(Long commentIdx, CommentRequestDto requestDto) {
        Comment comment = commentRepository.findByCommentIdx(commentIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_COMMENT));

        Optional<Reaction> optionalReaction = reactionRepository
                .findByReactionTypeAndTargetIdx(ActionType.COMMENT_LIKE, commentIdx);

        if (optionalReaction.isPresent()) {
            Reaction reaction = optionalReaction.get();
            reactionRepository.delete(reaction);
            comment.setCommentLikeCnt(comment.getCommentLikeCnt() - 1);

            log.info("Comment Like Count Down: idx: {}, count: {}", commentIdx, comment.getCommentLikeCnt());

        } else {
            Reaction reaction = new Reaction().setReactionType(ActionType.COMMENT_LIKE)
                    .setMemberIdx(requestDto.getMemberIdx())
                    .setTargetIdx(commentIdx);
            reactionRepository.save(reaction);
            comment.setCommentLikeCnt(comment.getCommentLikeCnt() + 1);

            log.info("Comment Like Count Up: idx: {}, Count: {}", commentIdx, comment.getCommentLikeCnt());
        }
        commentRepository.save(comment);

        return CommentResponseDto.toDto(comment);
    }

    @Transactional
    public void deleteComment(Long commentIdx, Long reqMemIdx) {
        Comment comment = commentRepository.findByCommentIdx(commentIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_COMMENT));

        if (!comment.getMemberIdx().equals(reqMemIdx)) {
            throw new CustomException(ErrorCode.NOT_MATCH_MEMBER);
        }

        commentRepository.delete(comment);
        log.info("Deleted Comment, idx: {}", commentIdx);
    }
}
