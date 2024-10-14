package meme.book.back.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.ServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.member.MemberDto;
import meme.book.back.dto.member.MemberDto.*;
import meme.book.back.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static meme.book.back.utils.Constants.MEMBER_EMAIL;

@Tag(name = "회원 API", description = "회원 관련 API")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/member")
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "닉네임 수정 API", description = "닉네임을 생성하기 위한 API")
    @PutMapping("/update/nickname")
    public ResponseEntity<?> updateNickname(ServletRequest request,
                                            @RequestBody MemberNickname member) {
        String memberEmail = String.valueOf(request.getAttribute(MEMBER_EMAIL));
        return ResponseEntity.ok(memberService.saveNickname(member, memberEmail));
    }

    @Operation(summary = "닉네임 중복 체크 API", description = "닉네임 중복 여부를 체크한다.")
    @GetMapping("/exist/nickname")
    public ResponseEntity<?> existNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(memberService.isExistNickname(nickname));
    }

    @Operation(summary = "회원 정보 조회 API", description = "회원 정보를 조회하는 API")
    @GetMapping("/info")
    public ResponseEntity<?> getNationCode(ServletRequest request) {
        String memberEmail = String.valueOf(request.getAttribute(MEMBER_EMAIL));
        return ResponseEntity.ok(memberService.getMemberInfo(memberEmail));
    }

    @Operation(summary = "회원 국가 수정 API", description = "회원의 국가 코드를 수정한다.")
    @PutMapping("/update/nation")
    public ResponseEntity<?> updateMember(ServletRequest request,
                                          @RequestBody MemberNation memberNation) {

        String memberEmail = String.valueOf(request.getAttribute(MEMBER_EMAIL));

        MemberDto memberDto = new MemberDto()
                .setMemberEmail(memberEmail)
                .setOriginNation(memberNation.origin())
                .setTargetNation(memberNation.target());

        return ResponseEntity.ok(memberService.updateNation(memberDto));
    }

    @Operation(summary = "회원 삭제 API", description = "등록된 회원을 삭제")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMember(ServletRequest request) {
        String memberEmail = String.valueOf(request.getAttribute(MEMBER_EMAIL));
        memberService.deleteMember(memberEmail);

        return ResponseEntity.ok().build();
    }
}
