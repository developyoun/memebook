package meme.book.back.repository.wordContent;

import meme.book.back.entity.Word;
import meme.book.back.entity.WordContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface WordContentRepository extends JpaRepository<WordContent, Long>, WordContentCustomRepository {

    Optional<WordContent> findByWordIdxAndMemberIdx(Long wordIdx, Long memberIdx);

}
