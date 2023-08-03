package back.ailion.controller;

import back.ailion.model.dto.ReplyDto;
import back.ailion.model.dto.request.ReplyRequestDto;
import back.ailion.model.dto.request.ReplyUpdateDto;
import back.ailion.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reply")
@RequiredArgsConstructor
public class ReplyApiController {

    private final ReplyService replyService;

    @PostMapping
    public ReplyDto saveReply(@RequestBody ReplyRequestDto replyRequestDto) {

        return replyService.saveReply(replyRequestDto);
    }

    @PatchMapping
    public ReplyDto updateReply(@RequestBody ReplyUpdateDto replyUpdateDto) {

        return replyService.updateReply(replyUpdateDto);
    }

    @DeleteMapping("/{id}")
    public boolean deleteReply(@PathVariable("id") Long replyId) {

        return replyService.deleteReply(replyId);
    }

}