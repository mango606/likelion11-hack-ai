package back.ailion.repository;

import back.ailion.model.entity.AiInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AiInfoRepository extends JpaRepository<AiInfo, Long> {

    @Modifying
    @Query("UPDATE AiInfo a SET a.favoriteCount = a.favoriteCount + 1 WHERE a = :selectedAiInfo")
    void addFavoriteCount(@Param("selectedAiInfo") AiInfo aiInfo);

    @Modifying
    @Query("UPDATE AiInfo a SET a.favoriteCount = a.favoriteCount - 1 WHERE a = :selectedAiInfo")
    void subFavoriteCount(@Param("selectedAiInfo") AiInfo aiInfo);


    AiInfo findByName(String name);

    List<AiInfo> findByCategory(String category);
    // 페이지는 나중에 구현
    // Page<AiInfo> findByCategory(String category, Pageable pageable);

    AiInfo findAiInfoById(Long id);
}
