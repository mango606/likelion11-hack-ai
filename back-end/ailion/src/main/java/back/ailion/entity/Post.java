//package back.ailion.entity;
//
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
//public class Post extends BaseEntity{
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "post_id")
//    private Long id;
//
//    private String title;
//
//    private String content;
//
//    private String writer;
//
//    @JoinColumn(name = "user_id")
//    @ManyToOne(fetch = FetchType.LAZY)
//    private User user;
//
//    @Builder
//    public Post(String title, String content, String writer, User member) {
//        this.title = title;
//        this.content = content;
//        this.writer = writer;
//        this.user = user;
//    }
//}