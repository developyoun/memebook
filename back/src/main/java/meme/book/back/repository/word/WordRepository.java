package meme.book.back.repository.word;

import meme.book.back.entity.Word;
import meme.book.back.utils.NationCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word, Long>, WordCustomRepository {

    Page<Word> findAllByWordNationEquals(NationCode nationCode, Pageable pages);

    // 단어 단일 조회
    Word findByWordIdx(Long wordIdx);
}
