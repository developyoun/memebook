package meme.book.back.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.MemberDto;
import meme.book.back.dto.ResponseDto;
import meme.book.back.service.MemberService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/member")
public class MemberController {

    private final MemberService memberService;

    // 신규 회원 생성 (회원가입)
    @PostMapping("/create")
    public ResponseDto createMember(@RequestBody MemberDto memberDto) {
        log.info("### Create New Member: {}", memberDto);

        return ResponseDto.of(memberService.createMemberService(memberDto));
    }

    @GetMapping("/exist")
    public ResponseDto existMemberNickname(@RequestParam String nickname) {
        log.info("### Check Exist Nickname: {}", nickname);

        return ResponseDto.of(memberService.isExistNickname(nickname));
    }

}
