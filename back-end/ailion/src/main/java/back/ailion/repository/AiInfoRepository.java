package back.ailion.repository;

import back.ailion.model.entity.AiInfo;
import back.ailion.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AiInfoRepository extends JpaRepository<AiInfo, Long> {

    @Modifying
    @Query("UPDATE AiInfo a SET a.favoriteCount = a.favoriteCount + 1 WHERE a = :selectedAiInfo")
    void addFavoriteCount(@Param("selectedAiInfo") AiInfo aiInfo);

    @Modifying
    @Query("UPDATE AiInfo a SET a.favoriteCount = a.favoriteCount - 1 WHERE a = :selectedAiInfo")
    void subFavoriteCount(@Param("selectedAiInfo") AiInfo aiInfo);
}
