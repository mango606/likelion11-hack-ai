//package back.ailion.entity;
//
//import lombok.*;
//import org.springframework.security.core.userdetails.User;
//
//import javax.persistence.*;
//
//@Entity @Getter @Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class Member extends User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "member_id")
//    private Long id;
//
//    private String email;
//
//    private String password;
//
//    private String username;
//
//    private String name;
//
//    private String phone;
//
//    private String provider;
//
//    private String providerId;
//
//    @Enumerated(EnumType.STRING)
//    private RoleType role;
//
//    @Builder
//    public Member(String email, String password, String username, String name, String phone, RoleType role) {
//        this.email = email;
//        this.password = password;
//        this.username = username;
//        this.name = name;
//        this.phone = phone;
//        this.role = role;
//    }
//
//    public Member() {
//        super();
//    }
//}