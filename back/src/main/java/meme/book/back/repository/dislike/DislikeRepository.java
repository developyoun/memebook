package meme.book.back.repository.dislike;

import meme.book.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DislikeRepository extends JpaRepository<Member, Long>, DislikeCustomRepository {

}
