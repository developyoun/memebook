package meme.book.back.repository;

import meme.book.back.dto.ScrapResponseDto;
import meme.book.back.entity.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {

    @Query("SELECT new meme.book.back.dto.ScrapResponseDto(" +
            "      scrap.scrapIdx" +
            "    , scrap.memberIdx" +
            "    , scrap.wordIdx" +
            "    , scrap.regDtm" +
            "    , word.wordContent" +
            "    , word.wordTitle" +
            "    , member.nickname" +
            ") " +
            "FROM Scrap scrap " +
            "JOIN Word word ON scrap.wordIdx = word.wordIdx " +
            "JOIN Member member ON scrap.memberIdx = member.memberIdx " +
            "WHERE scrap.memberIdx = :memberIdx"
    )
    List<ScrapResponseDto> getScrapListByMemberIdx(@Param("memberIdx") Long memberIdx);
}
