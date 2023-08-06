package back.ailion;

import back.ailion.model.entity.User;
import back.ailion.model.entity.Post;
import back.ailion.model.entity.RoleType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit1();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void dbInit1() {
            User user1 = createMember("이메일1", "서울12", "닉넴", "이름", "010123");
            em.persist(user1);
            User user2 = createMember("이메일2", "서울123", "닉넴2", "이름2", "0101234");
            em.persist(user2);
            User user3 = createMember("이메일3", "서울1234", "닉넴3", "이름3", "010123124");
            em.persist(user3);
            User user4 = createMember("이메일4", "서울12345", "닉넴4", "이름4", "0101212334");
            em.persist(user4);

            int count = 1;
            for (int i = 0; i < 50; i++) {
                String writer = "write" + count;
                String title = "title" + count;
                String content = "content" + count;
                Post post = new Post(writer, title, content, user1, 0, 0, 0, false);
                em.persist(post);
                count += 1;
            }
        }

        private User createMember(String email, String password, String nickname, String name, String phone) {
            User user = new User(email, password, nickname, name, phone, RoleType.USER);
            return user;
        }
    }
}
