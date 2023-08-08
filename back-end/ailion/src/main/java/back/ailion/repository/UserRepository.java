package back.ailion.repository;

import back.ailion.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUsername(String username);

    Optional<User> findOneWithAuthoritiesByUsername(String username);
}
