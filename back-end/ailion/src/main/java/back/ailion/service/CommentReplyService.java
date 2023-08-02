package back.ailion.service;

import back.ailion.model.dto.CommentReplyDto;
import back.ailion.model.dto.request.CommentReplyRequestDto;
import back.ailion.model.dto.request.CommentReplyUpdateDto;
import back.ailion.model.entity.Comment;
import back.ailion.model.entity.CommentReply;
import back.ailion.model.entity.Member;
import back.ailion.repository.CommentReplyRepository;
import back.ailion.repository.CommentRepository;
import back.ailion.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentReplyService {

    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;
    private final CommentReplyRepository commentReplyRepository;

    private CommentReplyDto CommentToCommentReplyDto(CommentReply commentReply) {
        return new CommentReplyDto(commentReply);
    }

    @Transactional
    public CommentReplyDto saveReply(CommentReplyRequestDto replyRequestDto) {

        Member member = memberRepository.findById(replyRequestDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Could not found member id : " + replyRequestDto.getMemberId()));

        Comment comment = commentRepository.findById(replyRequestDto.getCommentId())
                .orElseThrow(() -> new RuntimeException("Could not found reply id : " + replyRequestDto.getCommentId()));

        CommentReply commentReply = CommentReply.builder()
                .content(replyRequestDto.getContent())
                .comment(comment)
                .member(member)
                .writer(member.getNickname())
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

}