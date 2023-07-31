package back.ailion.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String password;

    private String userName;

    private String name;

    private String phone;

    private String provider;

    private String providerId;

    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Builder
    public Member(String email, String password, String nickname, String name, String phone, RoleType role) {
        this.email = email;
        this.password = password;
        this.userName = userName;
        this.name = name;
        this.phone = phone;
        this.role = role;
    }
}