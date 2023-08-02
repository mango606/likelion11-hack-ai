package back.ailion.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentReply extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_reply_id")
    private Long id;

    private String content;

    private String writer;

    @JoinColumn(name = "member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @JoinColumn(name = "comment_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Comment comment;

    @Builder
    public CommentReply(String content, String writer, Member member, Comment comment) {
        this.content = content;
        this.writer = writer;
        this.member = member;
        // this.comment = comment;
        if (comment != null) {
            changeComment(comment);
        }
    }

    public void modifyContent(String content) {
        this.content = content;
    }

    // 연관관계 편의 메소드
    public void changeComment(Comment comment) {

        if(this.comment != null) {

            this.comment.getCommentReplies().remove(this);
        }

        this.comment = comment;
        comment.getCommentReplies().add(this);
    }
}