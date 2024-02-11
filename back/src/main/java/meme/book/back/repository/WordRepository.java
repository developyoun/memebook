package meme.book.back.repository;

import meme.book.back.entity.WordsEntity;
import meme.book.back.utils.NationCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WordRepository extends JpaRepository<WordsEntity, Long> {

    Page<WordsEntity> findAllByWordNationEquals(NationCode nationCode, Pageable pages);

    // 단어 단일 조회
    Optional<WordsEntity> findByWordIdx(Long wordIdx);
}
