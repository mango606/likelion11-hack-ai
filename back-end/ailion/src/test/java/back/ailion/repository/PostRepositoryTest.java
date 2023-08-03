package back.ailion.repository;

import back.ailion.model.entity.User;
import back.ailion.model.entity.Post;
import back.ailion.model.entity.RoleType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@Rollback(false)
class PostRepositoryTest {

    @Autowired
    PostRepository postRepository;
    @Autowired
    MemberRepository memberRepository;


    @Test
    public void crudTest() {

        User user = User.builder()
                .email("email")
                .name("an")
                .nickname("ph")
                .password("123")
                .phone("010123")
                .role(RoleType.USER)
                .build();

        User savedUser = memberRepository.save(user);

        Post post = Post.builder()
                .member(savedUser)
                .content("test")
                .title("hi")
                .writer(savedUser.getNickname())
                .build();

        Post savedPost = postRepository.save(post);

        assertThat(savedUser.getNickname()).isEqualTo(savedPost.getUser().getNickname());
    }

}