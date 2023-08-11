package back.ailion.model.entity;

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

@Entity @Getter @Setter @Builder @AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User extends BaseEntity {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @JsonIgnore
    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "username",length = 50, unique = true)
    private String username;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @JsonIgnore
    @Column(name = "activated")
    private boolean activated;

    private String name;

    private String phone;

    private String provider;

    private String providerId;

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;

    public User(String subject, String password, Collection<? extends GrantedAuthority> authorities) {
        super();
    }


    //    @Enumerated(EnumType.STRING)
//    private RoleType role;
    @Builder
    public User(String password, String username, String nickname, boolean activated,
                String name, String phone, String provider, String providerId, Set<Authority> authorities) {
        this.password = password;
        this.username = username;
        this.nickname = nickname;
        this.activated = activated;
        this.name = name;
        this.phone = phone;
        this.provider = provider;
        this.providerId = providerId;
        this.authorities = authorities;
    }
}
