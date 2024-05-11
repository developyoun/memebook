package meme.book.back.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;
import meme.book.back.utils.NationCode;

@Data
@Accessors(chain = true)
public class NationRequestDto {

    /** 회원 IDX */
    @Schema(description = "회원 Idx")
    private Long memberIdx;

    /** 원래 국가 코드 */
    @Schema(description = "기존 국가 코드")
    private NationCode originNation;

    /** 변경 국가 코드 */
    @Schema(description = "대상 국가 코드")
    private NationCode targetNation;
}
