package back.ailion.repository;

import back.ailion.model.entity.*;
import back.ailion.model.global.Star;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserAndAiInfo(User user, AiInfo aiInfo);

    @Query("select f.aiInfo.id, count(f.aiInfo.id) as star from Favorite f group by f.aiInfo.id order by star desc limit 5")
    public List<Star> top5AI();
}
