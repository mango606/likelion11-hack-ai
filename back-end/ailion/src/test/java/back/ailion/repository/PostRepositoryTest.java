package back.ailion.repository;

import back.ailion.entity.Member;
import back.ailion.entity.Post;
import back.ailion.entity.RoleType;
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

        Member member = Member.builder()
                .email("email")
                .name("an")
                .nickname("ph")
                .password("123")
                .phone("010123")
                .role(RoleType.USER)
                .build();

        Member savedMember = memberRepository.save(member);

        Post post = Post.builder()
                .member(savedMember)
                .content("test")
                .title("hi")
                .writer(savedMember.getNickname())
                .build();

        Post savedPost = postRepository.save(post);

        assertThat(savedMember.getNickname()).isEqualTo(savedPost.getMember().getNickname());
    }

}