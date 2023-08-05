package back.ailion.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class LoginController {

    @GetMapping("/home")
    public String home(){
        return "redirect:";
    }

    @GetMapping("/loginForm")
    public String loginForm(){
        return "loginForm";
    }
}
