package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.MemberDto;
import meme.book.back.dto.member.NationRequestDto;
import meme.book.back.entity.Member;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.member.MemberRepository;
import meme.book.back.utils.ErrorCode;
import meme.book.back.utils.NationCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // 신규 회원 생성
    @Transactional
    public MemberDto createMemberService(MemberDto memberDto) {
        LocalDateTime now = LocalDateTime.now();

        Member member = new Member()
                .setMemberId(memberDto.getMemberId())
                .setMemberPw(memberDto.getMemberPw())
                .setNickname(memberDto.getNickname())
                .setMemberRegDtm(now);

        Member membersEntity = memberRepository.save(member);
        log.info("### Create New Member: {}", membersEntity);

        return MemberDto.toDto(membersEntity);
    }

    // 중복 닉네임 체크
    @Transactional(readOnly = true)
    public boolean isExistNickname(String nickname) {
        boolean isExist = memberRepository.existsByNickname(nickname);
        log.info("### Check Member nickname: {}, Exist: {}", nickname, isExist);

        return memberRepository.existsByNickname(nickname);
    }

    // 신규 닉네임 생성
    @Transactional
    public String saveNickname(String nickname) {
        // 기존 닉네임 존재시 에러 반환
        if (isExistNickname(nickname)) {
            log.info("### 이미 존재하는 닉네임입니다. Nickname: {}", nickname);
            throw new CustomException(ErrorCode.ALREADY_EXIST_NICKNAME);
        }

        Member member = new Member().setNickname(nickname);
        memberRepository.save(member);

        log.info("### Complete Save Nickname: {}", nickname);
        return member.getNickname();
    }

    // 저장된 국가 코드 조회
    @Transactional(readOnly = true)
    public MemberDto getNationCodeByMemberIdx(String memberIdx) {
        Member member = memberRepository.findByMemberIdx(Long.parseLong(memberIdx))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER));

        log.info("### member: {}", member);

        return new MemberDto()
                .setMemberIdx(member.getMemberIdx())
                .setOriginNation(member.getOriginNation())
                .setTargetNation(member.getTargetNation());
    }

    // 회원 국가 변경
    @Transactional
    public MemberDto updateNationByMemberIdx(NationRequestDto requestDto) {
        Long memberIdx = requestDto.getMemberIdx();
        NationCode originNation = requestDto.getOriginNation();
        NationCode targetNation = requestDto.getTargetNation();

        Member member = memberRepository.findByMemberIdx(memberIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER));

        member.setOriginNation(originNation)
                .setTargetNation(targetNation);
        memberRepository.save(member);
        log.info("### Complete update Nation: memberIdx: {}, host nation: {}, target nation: {}", memberIdx, originNation, targetNation);

        return new MemberDto()
                .setMemberIdx(member.getMemberIdx())
                .setOriginNation(member.getOriginNation())
                .setTargetNation(member.getTargetNation());

    }

}
