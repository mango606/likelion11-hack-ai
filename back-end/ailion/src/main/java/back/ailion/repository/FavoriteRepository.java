package back.ailion.repository;

import back.ailion.model.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserAndAiInfo(User user, AiInfo aiInfo);
}
