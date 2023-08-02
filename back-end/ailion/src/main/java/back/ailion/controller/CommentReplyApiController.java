package back.ailion.controller;

import back.ailion.model.dto.CommentReplyDto;
import back.ailion.model.dto.request.CommentReplyRequestDto;
import back.ailion.service.CommentReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reply")
@RequiredArgsConstructor
public class CommentReplyApiController {

    private final CommentReplyService commentReplyService;

    @PostMapping
    public CommentReplyDto saveReply(@RequestBody CommentReplyRequestDto replyRequestDto) {

        return commentReplyService.saveReply(replyRequestDto);
    }

}