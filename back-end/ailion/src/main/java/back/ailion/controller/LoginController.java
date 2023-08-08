//package back.ailion.controller;
//
//import back.ailion.model.dto.UserDto;
//import back.ailion.service.UserService;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//@Controller
//@RequiredArgsConstructor
//@RequestMapping("")
//public class LoginController {
//
//    @Autowired
//    private UserService userService;
//
//    @GetMapping("/home")
//    public String home(){
//        return "redirect:";
//    }
//
//    @GetMapping("/loginForm")
//    public String loginForm(){
//        return "loginForm";
//    }
//
//    @GetMapping("/user/test")
//    public @ResponseBody String test(){
//        return "success";
//    }
//
//    @PostMapping("/join")
//    public @ResponseBody String join(UserDto userDto){
//        System.out.println(userDto);
//
//        if(userService.getUserDto(userDto.getUsername()) == null) {
//            userService.saveUserDto(userDto);
//            System.out.println("success");
//        }
//
//        return "true";
//    }
//}
