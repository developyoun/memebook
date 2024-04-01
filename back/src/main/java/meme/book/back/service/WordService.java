package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.WordDto;
import meme.book.back.dto.WordRequestDto;
import meme.book.back.dto.WordResponseDto;
import meme.book.back.entity.Word;
import meme.book.back.repository.word.WordRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;

    @Transactional(readOnly = true)
    public ResponseDto getWordService(Long wordIdx) {
        Word word = wordRepository.findByWordIdx(wordIdx);
        log.info("### Get Word: {}", word);

        return ResponseDto.of(WordDto.toDto(word));
    }


    @Transactional(readOnly = true)
    public Page<WordResponseDto> getWordListService(Pageable pageable, WordRequestDto requestDto) {

        return wordRepository.getAllWordList(pageable, requestDto);
    }

    // 단어 생성
    @Transactional
    public ResponseDto createWordService(WordDto requestWordDto) {
        Word wordsEntity = wordRepository.save(new Word(requestWordDto));
        log.info("### Create New Word: {}", wordsEntity);

        return ResponseDto.of(WordDto.toDto(wordsEntity));
    }

    // 단어 수정
    @Transactional
    public ResponseDto updateWordService(WordDto wordDto) {
        Word word = wordRepository.findByWordIdx(wordDto.getWordIdx());

        word.setWordTitle(wordDto.getWordTitle())
                .setWordContent(wordDto.getWordContent());
        wordRepository.save(word);

        log.info("### update Word: {}", word);
        return ResponseDto.of(WordDto.toDto(word));
    }
}
