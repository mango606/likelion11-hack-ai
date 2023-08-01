package back.ailion.model.dto;

import back.ailion.model.entity.Comment;
import back.ailion.model.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

    private String content;
    private String writer;

    private LocalDateTime createdDate;

    public CommentDto(Comment comment) {
        this.createdDate = comment.getCreatedDate();
        this.content = comment.getContent();
        this.writer = comment.getWriter();
    }
}