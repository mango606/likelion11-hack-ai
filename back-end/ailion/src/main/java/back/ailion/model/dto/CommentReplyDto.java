package back.ailion.model.dto;

import back.ailion.model.entity.Comment;
import back.ailion.model.entity.CommentReply;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentReplyDto {

    private Long replyId;

    private String content;
    private String writer;

    private LocalDateTime createdDate;

    public CommentReplyDto(CommentReply commentReply) {
        this.replyId = commentReply.getId();
        this.createdDate = commentReply.getCreatedDate();
        this.content = commentReply.getContent();
        this.writer = commentReply.getWriter();
    }
}