package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.ResponseDto;
import meme.book.back.dto.ScrapDto;
import meme.book.back.dto.ScrapResponseDto;
import meme.book.back.entity.Scrap;
import meme.book.back.repository.scrap.ScrapRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class ScrapService {

    private final ScrapRepository scrapRepository;

    @Transactional(readOnly = true)
    public ResponseDto getScrapList(Long memberIdx) {

        List<ScrapResponseDto> scrapResponseDtoList = scrapRepository.getScrapListByMemberIdx(memberIdx);
        log.info("### Get Scrap List: {}", scrapResponseDtoList);

        return ResponseDto.of(scrapResponseDtoList);
    }

    @Transactional
    public ResponseDto saveScrap(ScrapDto scrapDto) {

        Scrap scrapEntity = new Scrap()
                .setWordIdx(scrapDto.getWordIdx())
                .setMemberIdx(scrapDto.getMemberIdx())
                .setRegDtm(LocalDateTime.now());

        scrapRepository.save(scrapEntity);
        log.info("### Save Scrap: {}, ", scrapEntity);

        return ResponseDto.of(ScrapDto.toDto(scrapEntity));

    }
}
