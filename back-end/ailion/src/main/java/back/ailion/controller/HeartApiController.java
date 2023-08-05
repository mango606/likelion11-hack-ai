package back.ailion.controller;

import back.ailion.model.dto.HeartDto;
import back.ailion.model.dto.request.HeartRequestDto;
import back.ailion.service.HeartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hearts")
@RequiredArgsConstructor
public class HeartApiController {

    private final HeartService heartService;

    @PostMapping
    public HeartDto like(@RequestBody HeartRequestDto heartRequestDto) {
        return heartService.like(heartRequestDto);
    }

    @DeleteMapping
    public boolean cancelLike(@RequestBody HeartRequestDto heartRequestDto) {
        return heartService.cancelLike(heartRequestDto);
    }

}