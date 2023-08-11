package back.ailion.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
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

    @Column(name = "content")
    private String content;

    @Column(name = "url")
    private String url;

    @Column(name = "category")
    private String category;

    @ColumnDefault("0")
    private String click;

    @Builder
    public AiInfo(String name, String content, String url, String category) {
        this.name = name;
        this.content = content;
        this.url = url;
        this.category = category;
    }

    public void update(String name, String content, String url, String category) {
        this.name = name;
        this.content = content;
        this.url = url;
        this.category = category;
    }
}
