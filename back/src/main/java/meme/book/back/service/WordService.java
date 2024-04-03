package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.*;
import meme.book.back.entity.Word;
import meme.book.back.entity.WordContent;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.word.WordRepository;
import meme.book.back.repository.wordContent.WordContentRepository;
import meme.book.back.utils.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;
    private final WordContentRepository wordContentRepository;

    @Transactional(readOnly = true)
    public ResponseDto getWordService(Long wordIdx) {
        Word word = wordRepository.findByWordIdx(wordIdx);
        log.info("### Get Word: {}", word);

        return ResponseDto.of();
    }

    @Transactional(readOnly = true)
    public Page<WordListResponseDto> getWordListService(Pageable pageable, WordListRequestDto requestDto) {
        return wordRepository.getAllWordList(pageable, requestDto);
    }

    // 단어 생성
    @Transactional
    public WordUpsertResponseDto createWord(WordUpsertRequestDto requestDto) {
        WordUpsertResponseDto responseDto = new WordUpsertResponseDto();
        Long wordIdx;

        // 1. 기존 단어 존재 여부 확인
        Optional<Word> optionalWord = wordRepository.findByWordName(requestDto.getWordName());

        optionalWord.ifPresentOrElse(
                // 2-1. 기존 단어 존재 (단어 컨텐츠만 추가)
                word -> {
                    WordContent wordContent = new WordContent()
                            .setWordIdx(word.getWordIdx())
                            .setMemberIdx(requestDto.getMemberIdx())
                            .setContent(requestDto.getWordContent());
                    wordContentRepository.save(wordContent);

                    responseDto.setWordIdx(word.getWordIdx());
                    log.info("### Exist Word: {}, New Word Content: {}", word, wordContent);
                },

                // 2-2. 기존 단어 없음 (단어 및 컨텐츠 추가)
                () -> {
                    Word word = new Word()
                            .setWordName(requestDto.getWordName())
                            .setWordNation(requestDto.getWordNation());
                    wordRepository.save(word);

                    WordContent wordContent = new WordContent()
                            .setWordIdx(word.getWordIdx())
                            .setMemberIdx(requestDto.getMemberIdx())
                            .setContent(requestDto.getWordContent());
                    wordContentRepository.save(wordContent);

                    responseDto.setWordIdx(word.getWordIdx());
                    log.info("### New Word: {}, New Word Content: {}", word, wordContent);
                }
        );
        return responseDto.setWordName(requestDto.getWordName())
                .setMemberIdx(requestDto.getMemberIdx());
    }

    // 단어 수정
    @Transactional
    public WordUpsertResponseDto updateWord(WordUpsertRequestDto requestDto) {

        Long wordIdx = requestDto.getWordIdx();
        Long memberIdx = requestDto.getMemberIdx();

        WordContent wordContent = wordContentRepository.findByWordIdxAndMemberIdx(wordIdx, memberIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_CONTENT_USER));

        wordContent.setContent(requestDto.getWordContent());
        wordContentRepository.save(wordContent);

        log.info("### update Word Content: {}", wordContent);
        return new WordUpsertResponseDto().setWordIdx(requestDto.getWordIdx())
                .setWordContent(requestDto.getWordContent())
                .setMemberIdx(requestDto.getMemberIdx());
    }

}
