package meme.book.back.repository;

import meme.book.back.entity.WordEntity;
import meme.book.back.utils.NationCode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WordRepository extends JpaRepository<WordEntity, Long> {

    @Query("SELECT we FROM WordEntity AS we WHERE we.wordNation=:nationCode")
    List<WordEntity> findAllWordsByPaging(@Param("nationCode") NationCode nationCode, @Param("pages") Pageable pages);

}
