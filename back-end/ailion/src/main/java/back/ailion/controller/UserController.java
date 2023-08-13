package back.ailion.controller;

import back.ailion.config.jwt.GetIdFromToken;
import back.ailion.model.dto.PostDto;
import back.ailion.model.dto.UserDto;
import back.ailion.model.entity.User;
import back.ailion.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ailion")
public class UserController {
    private final UserService userService;

    @PostMapping("/api/signup")
    public ResponseEntity<User> signup(
            @Valid @RequestBody UserDto userDto
    ) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities().get());
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<User> getUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username).get());
    }

    @PostMapping("/signup/validId")
    public ResponseEntity<Boolean> isValidId(@RequestBody String id){
        return ResponseEntity.ok(userService.isValidId(id));
    }

    @GetMapping("/my/posts/{userId}")
    public List<PostDto> myPosts(@PathVariable("userId") Long userId) {

        return userService.myPosts(userId);
    }

    @GetMapping("/my/like/posts/{userId}")
    public List<PostDto> myLikePosts(@PathVariable("userId") Long userId) {

        return userService.myLikePosts(userId);
    }
}