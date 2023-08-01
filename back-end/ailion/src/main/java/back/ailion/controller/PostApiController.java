package back.ailion.controller;

import back.ailion.model.dto.PostDto;
import back.ailion.model.dto.Result;
import back.ailion.model.dto.request.PostRequestDto;
import back.ailion.model.dto.request.PostUpdateRequestDto;
import back.ailion.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostApiController {

    // 2023-08-01 01:01:56.920707

    private final PostService postService;

    @GetMapping
    public Result getPosts() {

        return postService.getPosts();
    }

    @PostMapping
    public PostDto savePost(@RequestBody PostRequestDto postRequestDto) {

        return postService.savePost(postRequestDto);
    }


    @PatchMapping
    public PostDto updatePost(@RequestBody PostUpdateRequestDto updateRequestDto) {

        return postService.updatePost(updateRequestDto);
    }

}