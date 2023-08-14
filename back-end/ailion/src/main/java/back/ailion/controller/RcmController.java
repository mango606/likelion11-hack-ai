package back.ailion.controller;

import back.ailion.config.jwt.GetIdFromToken;
import back.ailion.model.entity.AiInfo;
import back.ailion.service.RcmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ailion")
public class RcmController {
    private final RcmService rcmService;

    @GetMapping("/api/top5")
    public List<AiInfo> top5AI(){
        return rcmService.top5AI();
    }


    @GetMapping("/userRecommend")
    public Map<String, List<AiInfo>> userRecommend(@GetIdFromToken String username){
        return rcmService.recommendAi(username);
    }

    @GetMapping("/api/userRecommend")
    public Map<String, List<AiInfo>> userRecommend(){
        return rcmService.recommendAi();
    }
}
