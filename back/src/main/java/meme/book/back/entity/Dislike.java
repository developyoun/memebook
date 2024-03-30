package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Accessors(chain = true)
@Setter
@Getter
@ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "LIKE")
public class Dislike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIKE_IDX")
    private long likeIdx;

    @Column(name = "WORD_IDX")
    private long wordIdx;

    @Column(name = "MEMBER_IDX")
    private long memberIdx;

    @Column(name = "REG_DTM")
    private LocalDateTime regDtm;

}
