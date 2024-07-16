package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.MemberRequestDto;
import meme.book.back.dto.member.NationRequestDto;
import meme.book.back.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "회원 API", description = "회원 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/member")
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "닉네임 생성 API", description = "닉네임을 생성하기 위한 API")
    @PostMapping("/create/nickname")
    public ResponseEntity<?> createNicknameController(@RequestParam String nickname) {

        return ResponseEntity.ok(memberService.saveNickname(nickname));
    }

    @Operation(summary = "닉네임 중복 API", description = "닉네임 중복 여부를 체크한다.")
    @GetMapping("/exist/nickname")
    public ResponseEntity<?> existNicknameController(@RequestParam String nickname) {

        return ResponseEntity.ok(memberService.isExistNickname(nickname));
    }

    @Operation(summary = "국가 조회 API", description = "해당 회원의 국가를 조회한다.")
    @GetMapping("/nation")
    public ResponseEntity<?> getNationCodeController(@RequestParam String memberIdx) {

        return ResponseEntity.ok(memberService.getNationCodeByMemberIdx(memberIdx));
    }

    @Operation(summary = "회원 국가 수정 API", description = "회원의 국가 코드를 수정한다.")
    @PutMapping("/update/nation")
    public ResponseEntity<?> updateMember(@RequestBody NationRequestDto requestDto) {
        return ResponseEntity.ok(memberService.updateNationByMemberIdx(requestDto));
    }
}
