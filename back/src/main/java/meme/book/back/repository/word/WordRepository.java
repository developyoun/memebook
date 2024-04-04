package meme.book.back.repository.word;

import meme.book.back.entity.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word, Long>, WordCustomRepository {

    Word findByWordIdx(Long wordIdx);

    Page<Word> findAllByWordIdx(Long wordIdx, Pageable pageable);

    Optional<Word> findByWordName(String wordName);
}
