package meme.book.back.repository.member;

import meme.book.back.entity.Member;
import meme.book.back.repository.member.MemberCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberCustomRepository {

    // 중복 닉네임 체크
    Boolean existsByNickname(String nickname);

//    Member findByMemberIdx(Long memberIdx);

    Optional<Member> findByMemberIdx(Long memberIdx);
}
