package back.ailion.service;

import back.ailion.model.dto.ReplyDto;
import back.ailion.model.dto.request.ReplyRequestDto;
import back.ailion.model.dto.request.ReplyUpdateDto;
import back.ailion.model.entity.Comment;
import back.ailion.model.entity.Reply;
import back.ailion.model.entity.User;
import back.ailion.repository.ReplyRepository;
import back.ailion.repository.CommentRepository;
import back.ailion.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReplyService {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

    private ReplyDto CommentToCommentReplyDto(Reply reply) {
        return new ReplyDto(reply);
    }

    @Transactional
    public ReplyDto saveReply(ReplyRequestDto replyRequestDto) {

        User user = userRepository.findById(replyRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("Could not found user id : " + replyRequestDto.getUserId()));

        Comment comment = commentRepository.findById(replyRequestDto.getCommentId())
                .orElseThrow(() -> new RuntimeException("Could not found comment id : " + replyRequestDto.getCommentId()));

        Reply reply = Reply.builder()
                .content(replyRequestDto.getContent())
                .comment(comment)
                .user(user)
                .writer(user.getNickname())
                .build();

        return CommentToCommentReplyDto(replyRepository.save(reply));
    }

    @Transactional
    public ReplyDto updateReply(ReplyUpdateDto replyUpdateDto) {

        Reply reply = replyRepository.findById(replyUpdateDto.getReplyId())
                .orElseThrow(() -> new RuntimeException("Could not found reply id : " + replyUpdateDto.getReplyId()));

        reply.modifyContent(replyUpdateDto.getContent());

        return CommentToCommentReplyDto(replyRepository.findById(reply.getId()).get());
    }

    @Transactional
    public boolean deleteReply(Long replyId) {

        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("Could not found replyId : " + replyId));

        replyRepository.delete(reply);

        return true;
    }
}