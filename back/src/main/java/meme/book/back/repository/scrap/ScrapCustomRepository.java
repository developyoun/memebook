package meme.book.back.repository.scrap;

import meme.book.back.dto.ScrapResponseDto;

import java.util.List;

public interface ScrapCustomRepository {

    List<ScrapResponseDto> getScrapListByMemberIdx(Long memberIdx);
}
