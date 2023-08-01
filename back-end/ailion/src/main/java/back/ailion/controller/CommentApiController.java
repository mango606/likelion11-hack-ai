package back.ailion.controller;

import back.ailion.model.dto.CommentDto;
import back.ailion.model.dto.request.CommentRequestDto;
import back.ailion.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentApiController {

    private final CommentService commentService;

    @PostMapping
    public CommentDto saveComment(@RequestBody CommentRequestDto commentRequestDto) {

        return commentService.saveComment(commentRequestDto);
    }

}