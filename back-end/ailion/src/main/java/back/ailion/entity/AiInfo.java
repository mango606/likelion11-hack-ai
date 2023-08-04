package back.ailion.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AiInfo extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ai_info_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "eng_name")
    private String eng_name;

    @Column(name = "content")
    private String content;

    @Column(name = "url")
    private String url;

    @Column(name = "category")
    private String category;

    @LastModifiedDate
    @Column(name="created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Builder
    public AiInfo(String name, String eng_name, String content, String url, String category) {
        this.name = name;
        this.eng_name = eng_name;
        this.content = content;
        this.url = url;
        this.category = category;
    }
}
