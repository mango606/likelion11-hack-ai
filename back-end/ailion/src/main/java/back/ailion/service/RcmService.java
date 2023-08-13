package back.ailion.service;

import back.ailion.model.entity.AiInfo;
import back.ailion.model.global.Star;
import back.ailion.model.global.StarDto;
import back.ailion.repository.AiInfoRepository;
import back.ailion.repository.FavoriteRepository;
import back.ailion.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RcmService {
    private final FavoriteRepository favoriteRepository;
    private final AiInfoRepository aiInfoRepository;
    private final UserRepository userRepository;

    public List<AiInfo> top5AI() {
        List<StarDto> stars = favoriteRepository.top5AI()
                .stream()
                .map(star -> new StarDto(star.getId(), star.stars()))
                .toList();



        List<AiInfo> aiInfos = new ArrayList<>();

        for(StarDto star : stars){
            aiInfos.add(aiInfoRepository.findAiInfoById(star.getId()));
        }

        return aiInfos;
    }
}
