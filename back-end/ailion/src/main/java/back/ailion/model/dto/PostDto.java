package back.ailion.model.dto;

import back.ailion.model.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {

    private Long memberId;

    private String title;
    private String content;
    private String writer;

    private Integer likeCount;
    private Integer viewCount;
    private Integer commentCount;

    private LocalDateTime createdDate;

    public PostDto(Post post) {
        this.createdDate = post.getCreatedDate();
        this.memberId = post.getMember().getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.writer = post.getWriter();
        this.likeCount = post.getLikeCount();
        this.viewCount = post.getViewCount();
        this.commentCount = post.getCommentCount();
    }
}