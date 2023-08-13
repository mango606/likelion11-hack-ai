package back.ailion.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Positive;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteDeleteDto {

    @Positive
    private Long favoriteId;

    @Positive
    private Long aiInfoId;
}