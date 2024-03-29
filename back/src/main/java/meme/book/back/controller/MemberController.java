package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.MemberDto;
import meme.book.back.dto.ResponseDto;
import meme.book.back.service.MemberService;
import meme.book.back.utils.NationCode;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/create/nickname")
    public ResponseDto createNicknameController(@RequestParam String nickname) {
        return memberService.saveNickname(nickname);
    }

    // 신규 회원 생성 (회원가입)
    @PostMapping("/create")
    public ResponseDto createMemberController(@RequestBody MemberDto memberDto) {
        return ResponseDto.of(memberService.createMemberService(memberDto));
    }

    // 닉네임 존재 유무 조회
    @GetMapping("/exist/nickname")
    public ResponseDto existNicknameController(@RequestParam String nickname) {
        return ResponseDto.of(memberService.isExistNickname(nickname));
    }

    // 국가 조회
    @GetMapping("/nation")
    public ResponseDto getNationCodeController(@RequestParam String memberIdx) {
        return ResponseDto.of(memberService.getNationCodeByMemberIdx(memberIdx));
    }

    // 회원 국가 변경
    @PutMapping("/update/nation")
    public ResponseDto updateMember(@RequestParam Long memberIdx,
                                    @RequestParam NationCode originNation,
                                    @RequestParam NationCode targetNation) {
        return memberService.updateNationByMemberIdx(memberIdx, originNation, targetNation);
    }
}
