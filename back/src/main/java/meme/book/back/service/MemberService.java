package meme.book.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.MemberRequestDto;
import meme.book.back.dto.member.MemberDto;
import meme.book.back.dto.member.MemberLoginDto;
import meme.book.back.dto.member.NationRequestDto;
import meme.book.back.entity.Member;
import meme.book.back.exception.CustomException;
import meme.book.back.repository.member.MemberRepository;
import meme.book.back.utils.ErrorCode;
import meme.book.back.utils.NationCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

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
    public MemberRequestDto getNationCodeByMemberIdx(String memberIdx) {
        Member member = memberRepository.findByMemberIdx(Long.parseLong(memberIdx))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER));

        log.info("### member: {}", member);

        return new MemberRequestDto()
                .setMemberIdx(member.getMemberIdx())
                .setOriginNation(member.getOriginNation())
                .setTargetNation(member.getTargetNation());
    }

    // 회원 국가 변경
    @Transactional
    public MemberRequestDto updateNationByMemberIdx(NationRequestDto requestDto) {
        Long memberIdx = requestDto.getMemberIdx();
        NationCode originNation = requestDto.getOriginNation();
        NationCode targetNation = requestDto.getTargetNation();

        Member member = memberRepository.findByMemberIdx(memberIdx)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_EXIST_MEMBER));

        member.setOriginNation(originNation)
                .setTargetNation(targetNation);
        memberRepository.save(member);
        log.info("### Complete update Nation: memberIdx: {}, host nation: {}, target nation: {}", memberIdx, originNation, targetNation);

        return new MemberRequestDto()
                .setMemberIdx(member.getMemberIdx())
                .setOriginNation(member.getOriginNation())
                .setTargetNation(member.getTargetNation());

    }

    // 회원 조회 or 생성
    @Transactional
    public MemberDto findOrCreateMember(MemberLoginDto memberLoginDto) {
        Optional<Member> optionalMember = memberRepository.findByMemberEmail(memberLoginDto.getEmail());

        MemberDto memberDto;
        if (optionalMember.isPresent()) {
            memberDto = MemberDto.toDto(optionalMember.get());
            log.debug("Exist Member: {}", memberDto);

        } else {
            Member member = new Member()
                    .setMemberEmail(memberLoginDto.getEmail())
                    .setProfileImg(memberLoginDto.getProfileImage())
                    .setProvider(memberLoginDto.getProvider());

            memberRepository.save(member);

            memberDto = MemberDto.toDto(member);
            log.debug("Create new Member: {}", memberDto);
        }

        return memberDto;
    }

}
