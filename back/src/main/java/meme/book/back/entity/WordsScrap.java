package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "words_scrap")
public class WordsScrap {

    // 스크랩 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SCRAP_IDX")
    private Long scrapIdx;

    // 스크랩 등록 단어 (번호)
    @Column(name = "SCRAP_WORD")
    private Long scrapWord;

    // 스크랩 등록 회원
    @Column(name = "SCRAP_REG_MEM")
    private Long scrapRegMem;

    // 스크랩 등록 시간
    @Column(name = "SCRAP_REG_DTM")
    private LocalDateTime scrapRegDtm;

}
