package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.repository.ScrapRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class ScrapService {

    private final ScrapRepository scrapRepository;

    public void saveWordScrap() {

    }
}
