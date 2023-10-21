package meme.book.back.controller;

import lombok.extern.slf4j.Slf4j;
import meme.book.back.dto.WordDto;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Slf4j
@Controller
public class IndexController {

    @ResponseBody
    @GetMapping("/")
    public String test() {
        return "SUCCESS";
    }

    @GetMapping("home")
    public String home() {
        return "home";
    }
}
