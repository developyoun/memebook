package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.*;
import meme.book.back.dto.WordDto;
import meme.book.back.utils.NationCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "words")
public class WordsEntity {

    // 단어 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "WORD_IDX")
    private Long wordIdx;

    // 기존 단어
    @Column(name = "ORIGIN_WORD")
    private String originWord;

    // 결과 단어
    @Column(name = "RESULT_WORD")
    private String resultWord;

    // 단어 국가
    @Enumerated(value = EnumType.STRING)
    @Column(name = "WORD_NATION")
    private NationCode wordNation;

    // 단어 등록자
    @Column(name = "WORD_REG_MEM")
    private Long wordRegMem;

    // 단어 등록일
    @CreatedDate
    @Column(name = "WORD_REG_DTM")
    private LocalDateTime wordRegDtm;

    @Builder
    public WordsEntity(WordDto wordDto) {
        this.wordIdx = wordDto.getWordIdx();
        this.originWord = wordDto.getOriginWord();
        this.resultWord = wordDto.getResultWord();
        this.wordNation = wordDto.getWordNation();
        this.wordRegMem = wordDto.getWordRegMem();
        this.wordRegDtm = wordDto.getWordRegDtm();
    }
}
