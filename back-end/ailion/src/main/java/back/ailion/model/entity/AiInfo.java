package back.ailion.model.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AiInfo extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ai_info_id")
    private Long id;

    private String name;

    private String eng_name;

    private String content;

    private String url;

    private String category;

    @Builder
    public AiInfo(String name, String eng_name, String content, String url, String category) {
        this.name = name;
        this.eng_name = eng_name;
        this.content = content;
        this.url = url;
        this.category = category;
    }
}
