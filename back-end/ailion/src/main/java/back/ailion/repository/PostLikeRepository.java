package back.ailion.repository;

import back.ailion.model.entity.Heart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<Heart, Long> {
}
