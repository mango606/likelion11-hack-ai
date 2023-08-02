package back.ailion.controller;

import back.ailion.model.dto.CommentReplyDto;
import back.ailion.model.dto.request.CommentReplyRequestDto;
import back.ailion.model.dto.request.CommentReplyUpdateDto;
import back.ailion.service.CommentReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reply")
@RequiredArgsConstructor
public class CommentReplyApiController {

    private final CommentReplyService commentReplyService;

    @PostMapping
    public CommentReplyDto saveReply(@RequestBody CommentReplyRequestDto replyRequestDto) {

        return commentReplyService.saveReply(replyRequestDto);
    }

    @PatchMapping
    public CommentReplyDto updateReply(@RequestBody CommentReplyUpdateDto replyUpdateDto) {

        return commentReplyService.updateReply(replyUpdateDto);
    }

    @DeleteMapping("/{id}")
    public boolean deleteReply(@PathVariable("id") Long commentReplyId) {

        return commentReplyService.deleteReply(commentReplyId);
    }

}