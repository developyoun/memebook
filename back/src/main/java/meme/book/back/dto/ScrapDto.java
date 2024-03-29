package meme.book.back.dto;

import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.entity.Scrap;

import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
public class ScrapDto {

    private Long scrapIdx;

    private Long wordIdx;

    private Long memberIdx;

    private LocalDateTime scrapRegDtm;

    public static ScrapDto toDto(Scrap scrapEntity) {
        return new ScrapDto()
                .setScrapIdx(scrapEntity.getScrapIdx())
                .setMemberIdx(scrapEntity.getMemberIdx())
                .setWordIdx(scrapEntity.getWordIdx())
                .setScrapRegDtm(scrapEntity.getRegDtm())
                ;

    }
}
