package meme.book.back.repository.like;

import meme.book.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Member, Long>, LikeCustomRepository {}
