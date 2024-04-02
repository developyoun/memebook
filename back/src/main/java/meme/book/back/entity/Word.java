package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.Accessors;
import meme.book.back.dto.WordDto;
import meme.book.back.utils.NationCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Accessors(chain = true)
@Setter @Getter @ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "WORD")
public class Word {

    // 단어 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "WORD_IDX")
    private Long wordIdx;

    // 단어명
    @Column(name = "WORD_NAME")
    private String wordName;

    // 단어 국가
    @Enumerated(value = EnumType.STRING)
    @Column(name = "WORD_NATION")
    private NationCode wordNation;

    // 단어 좋아요 수
    @Column(name = "WORD_LIKE")
    private Long wordLike;

    // 단어 싫어요 수
    @Column(name = "WORD_DISLIKE")
    private Long wordDislike;

}
