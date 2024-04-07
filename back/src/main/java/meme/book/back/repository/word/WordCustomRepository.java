package meme.book.back.repository.word;

import meme.book.back.dto.word.WordRequestDto;
import meme.book.back.dto.word.WordDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WordCustomRepository {

    Page<WordDto> getAllWordList(Pageable pageable, WordRequestDto requestDto);
}
