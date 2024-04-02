package meme.book.back.repository.word;

import meme.book.back.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word, Long>, WordCustomRepository {

    // 단어 단일 조회
    Word findByWordIdx(Long wordIdx);

    Optional<Word> findByWordName(String wordName);
}
