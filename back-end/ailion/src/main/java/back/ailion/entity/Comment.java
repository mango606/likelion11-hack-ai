//package back.ailion.entity;
//
//import back.ailion.model.entity.BaseEntity;
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class Comment extends BaseEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "comment_id")
//    private Long id;
//
//    private String content;
//
//    private String writer;
//
//    @JoinColumn(name = "user_id")
//    @ManyToOne(fetch = FetchType.LAZY)
//    private User user;
//
//    @JoinColumn(name = "post_id")
//    @ManyToOne(fetch = FetchType.LAZY)
//    private Post post;
//
//    @Builder
//    public Comment(String content, String writer, User user, Post post) {
//        this.content = content;
//        this.writer = writer;
//        this.user = user;
//        this.post = post;
//    }
//}