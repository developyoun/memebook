package meme.book.back.repository.word;

import meme.book.back.dto.WordListRequestDto;
import meme.book.back.dto.WordListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WordCustomRepository {

    Page<WordListResponseDto> getAllWordList(Pageable pageable, WordListRequestDto requestDto);
}
