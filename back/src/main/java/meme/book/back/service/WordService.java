package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import meme.book.back.dto.RequestWordDto;
import meme.book.back.entity.WordEntity;
import meme.book.back.repository.WordRepository;
import meme.book.back.utils.NationCode;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WordService {

    private final WordRepository wordRepository;

    public List<WordEntity> getWordListService(NationCode nationCode, Pageable pages) {
        return wordRepository.findAllWordsByPaging(nationCode, pages);
    }

    public void createWordService(RequestWordDto requestWordDto) {
        wordRepository.save(new WordEntity()
                .setOriginWord(requestWordDto.getOriginWord())
                .setResultWord(requestWordDto.getResultWord())
                .setWordNation(requestWordDto.getWordNation())
                .setWordRegMem(requestWordDto.getWordRegMem())
                .setWordRegDtm(LocalDateTime.now())
        );
    }
}
