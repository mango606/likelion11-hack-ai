package back.ailion.service;

import back.ailion.model.entity.AiInfo;
import back.ailion.model.global.Star;
import back.ailion.repository.AiInfoRepository;
import back.ailion.repository.FavoriteRepository;
import back.ailion.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RcmService {
    private final FavoriteRepository favoriteRepository;
    private final AiInfoRepository aiInfoRepository;
    private final UserRepository userRepository;

    public List<AiInfo> top5AI() {
        List<Star> stars = favoriteRepository.top5AI();

        List<AiInfo> aiInfos = new ArrayList<>();

        for(Star star : stars){
            aiInfos.add(aiInfoRepository.findAiInfoById(star.getAi_info_id()));
        }

        return aiInfos;
    }
}
