package back.ailion.repository;

import back.ailion.model.entity.Favorite;
import back.ailion.model.entity.Heart;
import back.ailion.model.entity.Post;
import back.ailion.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findOneWithAuthoritiesByUsername(String username);

    Optional<User> findByEmail(String email);

    @Query("SELECT u.posts FROM User u where u.id = :userId")
    List<Post> findPostsById(@Param("userId") Long userId);

    @Query("SELECT u.hearts FROM User u where u.id = :userId")
    List<Heart> findHeartsById(@Param("userId") Long userId);

    @Query("SELECT u.favorites FROM User u where u.id = :userId")
    List<Favorite> findFavoritesById(@Param("userId") Long userId);

}
