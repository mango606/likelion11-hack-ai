package back.ailion.controller;

import back.ailion.model.dto.CommentDto;
import back.ailion.model.dto.request.CommentRequestDto;
import back.ailion.model.dto.request.CommentUpdateDto;
import back.ailion.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentApiController {

    private final CommentService commentService;

    @PostMapping
    public CommentDto saveComment(@RequestBody CommentRequestDto commentRequestDto) {

        return commentService.saveComment(commentRequestDto);
    }

    @PatchMapping
    public CommentDto updateComment(@RequestBody CommentUpdateDto commentUpdateDto) {

        return commentService.updateComment(commentUpdateDto);
    }

    @DeleteMapping("/{id}")
    public boolean deleteComment(@PathVariable("id") Long commentId) {

        return commentService.deleteComment(commentId);
    }

}