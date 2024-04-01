package meme.book.back.repository.word;

import meme.book.back.dto.WordRequestDto;
import meme.book.back.dto.WordResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WordCustomRepository {

    Page<WordResponseDto> getAllWordList(Pageable pageable, WordRequestDto requestDto);
}
