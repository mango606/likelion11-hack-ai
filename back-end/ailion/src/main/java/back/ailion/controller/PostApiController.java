package back.ailion.controller;

import back.ailion.model.dto.PostDto;
import back.ailion.model.dto.request.PostRequestDto;
import back.ailion.model.dto.request.PostUpdateDto;
import back.ailion.model.entity.Post;
import back.ailion.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostApiController {

    private final PostService postService;

    @PostMapping
    public PostDto savePost(@RequestBody PostRequestDto postRequestDto) {

        return postService.savePost(postRequestDto);
    }

    @PatchMapping
    public PostDto updatePost(@RequestBody PostUpdateDto postUpdateDto) {

        return postService.updatePost(postUpdateDto);
    }

    @DeleteMapping("/{id}")
    public boolean deletePost(@PathVariable("id") Long postId) {

        return postService.deletePost(postId);
    }

    @GetMapping("/{id}")
    public PostDto getPost(@PathVariable("id") Long postId, HttpServletRequest req, HttpServletResponse res) {

        viewCountUp(postId, req, res);
        return postService.getPost(postId);
    }

    @GetMapping("/list")
    public Page<PostDto> getPosts(@RequestParam(value="page", defaultValue="0") int page) {

        Page<Post> paging = postService.getPosts(page);
        return paging.map(PostDto::new);
    }

    private void viewCountUp(Long id, HttpServletRequest req, HttpServletResponse res) {

        Cookie oldCookie = null;

        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("postView")) {
                    oldCookie = cookie;
                }
            }
        }

        if (oldCookie != null) {
            // 요청에 Cookie가 있고 글을 조회한 기록이 있다면 pass 없다면 Cookie에 [게시글ID] 붙이기
            if (!oldCookie.getValue().contains("[" + id.toString() + "]")) {
                postService.viewCountUp(id);
                oldCookie.setValue(oldCookie.getValue() + "_[" + id + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                res.addCookie(oldCookie);
            }
        } else {
            // 요청에 Cookie가 없고 글을 조회한다면 [게시글ID]의 값을 추가하여 Cookie생성 (기간은 하루로 설정)
            postService.viewCountUp(id);
            Cookie newCookie = new Cookie("postView","[" + id + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            res.addCookie(newCookie);
        }

        log.info(oldCookie.getValue());
    }

}