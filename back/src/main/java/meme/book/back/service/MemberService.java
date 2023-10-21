package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.MemberDto;
import meme.book.back.entity.MembersEntity;
import meme.book.back.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // 신규 회원 생성
    public MemberDto createMemberService(MemberDto memberDto) {
        MembersEntity membersEntity = memberRepository.save(new MembersEntity(memberDto));
        log.info("### Create New Member: {}", membersEntity);

        return MemberDto.toDto(membersEntity);
    }

    // 중복 닉네임 체크
    public Boolean isExistNickname(String nickname) {
        Boolean isExist = memberRepository.existsByNickname(nickname);
        log.info("### Check Member nickname: {}, Exist: {}", nickname, isExist);

        return isExist;
    }
}
