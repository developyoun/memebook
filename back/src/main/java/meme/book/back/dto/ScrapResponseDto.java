package meme.book.back.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@AllArgsConstructor
public class ScrapResponseDto {

    private Long scrapIdx;

    private Long memberIdx;

    private Long wordIdx;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime regDtm;

    private String wordContent;

    private String wordTitle;

    private String nickname;

}
