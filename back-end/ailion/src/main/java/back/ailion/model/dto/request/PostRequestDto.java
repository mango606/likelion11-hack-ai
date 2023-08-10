package back.ailion.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDto {

    private Long userId;

    private String title;
    private String content;
    private String category;
}