package back.ailion.web;

import back.ailion.service.AiInfoService;
import back.ailion.web.dto.AiInfoResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class AiInfoApiController {

    private final AiInfoService aiInfoService;

    @GetMapping("/api/aiInfoes")
    public ResponseEntity<List<AiInfoResponseDto>> findAllAiInfoes() {
        List<AiInfoResponseDto>  aiInfoes = aiInfoService.findAll()
                .stream()
                .map(AiInfoResponseDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(aiInfoes);

    }

    @GetMapping("/api/aiInfoes/{id}")
    public ResponseEntity<AiInfoResponseDto> findArticle(@PathVariable Long id){
        return ResponseEntity.ok().body(new AiInfoResponseDto(aiInfoService.findById(id)));
    }
}
