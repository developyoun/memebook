package meme.book.back.repository.scrap;

import meme.book.back.dto.ScrapResponseDto;
import meme.book.back.dto.WordListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ScrapCustomRepository {

    Page<ScrapResponseDto> getScrapListByMemberIdx(Pageable pageable, Long memberIdx);
}
