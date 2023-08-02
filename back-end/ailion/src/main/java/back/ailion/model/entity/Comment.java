package back.ailion.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    private String content;

    private String writer;

    private boolean delCheck;

    @JoinColumn(name = "member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @JoinColumn(name = "post_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;

    @Builder
    public Comment(String content, String writer, Member member, Post post, boolean delCheck) {
        this.content = content;
        this.writer = writer;
        this.member = member;
        this.post = post;
        this.delCheck = delCheck;
    }

    public void modifyContent(String content) {
        this.content = content;
    }

    public void delete() {
        this.delCheck = true;
    }
}