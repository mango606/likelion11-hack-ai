package back.ailion.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequestDto {

    @Positive
    private Long userId;

    @Positive
    private Long aiInfoId;
}
