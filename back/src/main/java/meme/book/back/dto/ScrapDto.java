package meme.book.back.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class ScrapDto {

    private Long scrapIdx;

    private Long wordIdx;

    private Long memberIdx;

    private LocalDateTime scrapRegDtm;
}
