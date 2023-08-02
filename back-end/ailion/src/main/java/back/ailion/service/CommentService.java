package back.ailion.service;

import back.ailion.model.dto.CommentDto;
import back.ailion.model.dto.request.CommentRequestDto;
import back.ailion.model.dto.request.CommentUpdateDto;
import back.ailion.model.entity.Comment;
import back.ailion.model.entity.Member;
import back.ailion.model.entity.Post;
import back.ailion.repository.CommentRepository;
import back.ailion.repository.MemberRepository;
import back.ailion.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    private CommentDto CommentToCommentDto(Comment comment) {
        return new CommentDto(comment);
    }

    @Transactional
    public CommentDto saveComment(CommentRequestDto commentRequestDto) {

        Member member = memberRepository.findById(commentRequestDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("Could not found member id : " + commentRequestDto.getMemberId()));

        Post post = postRepository.findById(commentRequestDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Could not found post id : " + commentRequestDto.getPostId()));

        Comment comment = Comment.builder()
                .content(commentRequestDto.getContent())
                .writer(member.getNickname())
                .member(member)
                .post(post)
                .delCheck(false)
                .build();

        return CommentToCommentDto(commentRepository.save(comment));
    }

    @Transactional
    public CommentDto updateComment(CommentUpdateDto commentUpdateDto) {

        Comment comment = commentRepository.findById(commentUpdateDto.getCommentId())
                .orElseThrow(() -> new RuntimeException("Could not found comment id : " + commentUpdateDto.getCommentId()));

        comment.modifyContent(commentUpdateDto.getContent());

        return CommentToCommentDto(commentRepository.findById(comment.getId()).get());
    }

    @Transactional
    public boolean deleteComment(Long commentId) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Could not found comment id : " + commentId));

        if (commentRepository.countRepliesByCommentId(commentId) > 0) {

            comment.delete();
            return true;
        }

        commentRepository.delete(comment);
        return true;
    }

}