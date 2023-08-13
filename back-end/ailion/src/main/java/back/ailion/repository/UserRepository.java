package back.ailion.repository;

import back.ailion.model.entity.Heart;
import back.ailion.model.entity.Post;
import back.ailion.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);

    Optional<User> findOneWithAuthoritiesByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query("SELECT u.posts FROM User u where u.id = ?1")
    List<Post> findPostsById(Long id);

    @Query("SELECT u.hearts FROM User u where u.id = ?1")
    List<Heart> findHeartsById(Long id);
}
