package meme.book.back.repository;

import meme.book.back.entity.MembersEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MembersEntity, Long> {

    Boolean existsByNickname(String nickname);
}
