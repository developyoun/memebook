package meme.book.back.repository;

import meme.book.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // 중복 닉네임 체크
    Boolean existsByNickname(String nickname);

    // 국가 코드 조회
    Member findByMemberIdx(Long memberIdx);
}
