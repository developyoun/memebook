package meme.book.back.repository.scrap;

import meme.book.back.dto.ScrapResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ScrapCustomRepository {

    Page<ScrapResponseDto> getScrapListByMemberIdx(Pageable pageable, Long memberIdx);
}
