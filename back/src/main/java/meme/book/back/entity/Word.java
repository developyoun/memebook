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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
@Getter
@ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "words")
public class Word {

    // 단어 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "WORD_IDX")
    private Long wordIdx;

    // 단어명
    @Column(name = "WORD_TITLE")
    private String wordTitle;

    // 단어 설명
    @Column(name = "WORD_CONTENT")
    private String wordContent;

    // 단어 국가
    @Enumerated(value = EnumType.STRING)
    @Column(name = "WORD_NATION")
    private NationCode wordNation;

    // 단어 등록자
    @Column(name = "REG_MEM")
    private Long regMem;

    // 단어 등록일
    @CreatedDate
    @Column(name = "REG_DTM")
    private LocalDateTime regDtm;

    // 단어 수정자
    @Column(name = "MOD_MEM")
    private Long modMem;

    // 단어 수정일
    @LastModifiedDate
    @Column(name = "MOD_DTM")
    private LocalDateTime modDtm;

    public Word(WordDto wordDto) {
        this.wordIdx = wordDto.getWordIdx();
        this.wordTitle = wordDto.getWordTitle();
        this.wordContent = wordDto.getWordContent();
        this.wordNation = wordDto.getWordNation();
        this.regMem = wordDto.getRegMem();
        this.regDtm = wordDto.getRegDtm();
        this.modMem = wordDto.getModMem();
        this.modDtm = wordDto.getModDtm();
    }
}
