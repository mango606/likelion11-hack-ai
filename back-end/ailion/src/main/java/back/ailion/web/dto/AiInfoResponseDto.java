package back.ailion.web.dto;

import back.ailion.entity.AiInfo;

public class AiInfoResponseDto {
    private Long id;
    private String name;
    private String eng_name;
    private String content;
    private String url;
    private String category;
    //private LocalDateTime createdAt;

    public AiInfoResponseDto(AiInfo aiInfo) {
        this.id = aiInfo.getId();
        this.name = aiInfo.getName();
        this.eng_name = aiInfo.getEng_name();
        this.content = aiInfo.getContent();
        this.url = aiInfo.getUrl();
        this.category = aiInfo.getCategory();
    }
}
