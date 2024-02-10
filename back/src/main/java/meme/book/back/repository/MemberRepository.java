package meme.book.back.repository;

import meme.book.back.entity.MembersEntity;
import meme.book.back.utils.NationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<MembersEntity, Long> {

    // 중복 닉네임 체크
    Boolean existsByNickname(String nickname);

    // 국가 코드 조회
    MembersEntity findByMemberIdx(Long memberIdx);
}
