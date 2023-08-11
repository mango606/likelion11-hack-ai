package back.ailion.repository;

import back.ailion.entity.AiInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AiInfoRepository extends JpaRepository<AiInfo, Long> {

    AiInfo findByName(String name);

    List<AiInfo> findByCategory(String category);
    // 페이지는 나중에 구현
    // Page<AiInfo> findByCategory(String category, Pageable pageable);
}
