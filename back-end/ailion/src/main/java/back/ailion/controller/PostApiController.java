package back.ailion.controller;

import back.ailion.model.dto.PostDto;
import back.ailion.model.dto.Result;
import back.ailion.model.dto.request.PostRequestDto;
import back.ailion.model.dto.request.PostUpdateRequestDto;
import back.ailion.model.entity.Post;
import back.ailion.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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
    public PostDto updatePost(@RequestBody PostUpdateRequestDto updateRequestDto) {

        return postService.updatePost(updateRequestDto);
    }

    @DeleteMapping("/{id}")
    public boolean deletePost(@PathVariable("id") Long postId) {

        return postService.deletePost(postId);
    }

    @GetMapping("/list")
    public Page<PostDto> getPosts(@RequestParam(value="page", defaultValue="0") int page) {

        Page<Post> paging = postService.getPosts(page);
        return paging.map(PostDto::new);
    }
}