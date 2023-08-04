package back.ailion.web.dto;

import back.ailion.entity.AiInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class AiInfoViewResponse {
    private Long id;
    private String name;
    private String eng_name;
    private String content;
    private String url;
    private String category;
    //private LocalDateTime createdAt;

    public AiInfoViewResponse(AiInfo aiInfo) {
        this.id = aiInfo.getId();
        this.name = aiInfo.getName();
        this.eng_name = aiInfo.getEng_name();
        this.content = aiInfo.getContent();
        this.url = aiInfo.getUrl();
        this.category = aiInfo.getCategory();
    }
}
