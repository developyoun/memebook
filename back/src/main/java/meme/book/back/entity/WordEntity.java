package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import meme.book.back.utils.NationCode;

import java.time.LocalDateTime;

@Entity
@Getter @Setter @Accessors(chain = true)
@Table(name = "words")
public class WordEntity {

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
    @Column(name = "WORD_REG_DTM")
    private LocalDateTime wordRegDtm;
}
