package meme.book.back.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "reports")
public class Reports {

    // 신고 고유 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REPORT_IDX")
    private Long reportIdx;

    // 신고 회원 번호
    @Column(name = "REPORT_MEM")
    private Long reportMem;

    // 신고 시간
    @Column(name = "REPORT_REG_DTM")
    private LocalDateTime reportRegDtm;

    // 신고 당한 회원
    @Column(name = "REPORT_TARGET")
    private Long reportTarget;
}
