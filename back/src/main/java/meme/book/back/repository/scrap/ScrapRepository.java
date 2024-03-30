package meme.book.back.repository.scrap;

import meme.book.back.dto.ScrapResponseDto;
import meme.book.back.entity.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long>, ScrapCustomRepository {

}
