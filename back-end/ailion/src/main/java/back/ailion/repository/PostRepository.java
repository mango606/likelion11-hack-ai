package back.ailion.repository;

import back.ailion.model.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAll(Pageable pageable);

    @Modifying
    @Query("DELETE FROM Comment c WHERE c.post.id = :postId")
    void deleteCommentsByPostId(@Param("postId") Long postId);
}