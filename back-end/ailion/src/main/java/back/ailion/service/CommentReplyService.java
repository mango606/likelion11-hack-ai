package back.ailion.service;

import back.ailion.model.dto.CommentReplyDto;
import back.ailion.model.dto.request.CommentReplyRequestDto;
import back.ailion.model.dto.request.CommentReplyUpdateDto;
import back.ailion.model.entity.Comment;
import back.ailion.model.entity.CommentReply;
import back.ailion.model.entity.User;
import back.ailion.repository.CommentReplyRepository;
import back.ailion.repository.CommentRepository;
import back.ailion.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentReplyService {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final CommentReplyRepository commentReplyRepository;

    private CommentReplyDto CommentToCommentReplyDto(CommentReply commentReply) {
        return new CommentReplyDto(commentReply);
    }

    @Transactional
    public CommentReplyDto saveReply(CommentReplyRequestDto replyRequestDto) {

        User user = userRepository.findById(replyRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("Could not found user id : " + replyRequestDto.getUserId()));

        Comment comment = commentRepository.findById(replyRequestDto.getCommentId())
                .orElseThrow(() -> new RuntimeException("Could not found reply id : " + replyRequestDto.getCommentId()));

        CommentReply commentReply = CommentReply.builder()
                .content(replyRequestDto.getContent())
                .comment(comment)
                .user(user)
                .writer(user.getNickname())
                .build();

        return CommentToCommentReplyDto(commentReplyRepository.save(commentReply));
    }

    @Transactional
    public CommentReplyDto updateReply(CommentReplyUpdateDto replyUpdateDto) {

        CommentReply commentReply = commentReplyRepository.findById(replyUpdateDto.getCommentReplyId())
                .orElseThrow(() -> new RuntimeException("Could not found CommentReply id : " + replyUpdateDto.getCommentReplyId()));

        commentReply.modifyContent(replyUpdateDto.getContent());

        return CommentToCommentReplyDto(commentReplyRepository.findById(commentReply.getId()).get());
    }

    @Transactional
    public boolean deleteReply(Long replyId) {

        CommentReply commentReply = commentReplyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("Could not found CommentReplyId : " + replyId));

        commentReplyRepository.delete(commentReply);

        return true;
    }
}