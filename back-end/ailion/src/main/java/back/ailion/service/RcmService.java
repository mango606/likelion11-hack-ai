package back.ailion.service;

import back.ailion.config.jwt.GetIdFromToken;
import back.ailion.model.entity.AiInfo;
import back.ailion.model.entity.Recommend;
import back.ailion.model.entity.User;
import back.ailion.model.global.Star;
import back.ailion.model.global.StarDto;
import back.ailion.repository.AiInfoRepository;
import back.ailion.repository.FavoriteRepository;
import back.ailion.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RcmService {
    private final FavoriteRepository favoriteRepository;
    private final AiInfoRepository aiInfoRepository;
    private final UserRepository userRepository;

    public List<AiInfo> top5AI() {
        List<Long> aiInfoIds = aiInfoRepository.top5AI();

        List<AiInfo> aiInfos = new ArrayList<>();

        for(Long id : aiInfoIds){
            aiInfos.add(aiInfoRepository.findAiInfoById(id));
        }

        return aiInfos;
    }

    public Map<String, List<AiInfo>> recommendAi(String uid){
        Optional<User> optionalUser = userRepository.findByUsername(uid);

        User user = optionalUser.get();

        List<Recommend> recommendList = user.getRecommends();

        if(recommendList.size() == 0){
            return recommendAi();
        }
        else {
            Map<String, List<AiInfo>> recommendMap = new HashMap<>();
            List<AiInfo> aiInfoList;

            for (Recommend recommend : recommendList) {
                aiInfoList = new ArrayList<>();
                List<Long> idList = aiInfoRepository.findRecommendList(recommend.toString());

                for (Long id : idList) {
                    aiInfoList.add(aiInfoRepository.findAiInfoById(id));
                }

                recommendMap.put(recommend.toString(), aiInfoList);
            }

            return recommendMap;
        }
    }

    public Map<String, List<AiInfo>> recommendAi(){
        List<Recommend> recommendList = new ArrayList<>();

        recommendList.add(Recommend.IMAGE);
        recommendList.add(Recommend.WRITE);
        recommendList.add(Recommend.MUSIC);
        recommendList.add(Recommend.SEARCH);
        recommendList.add(Recommend.VIDEO);

        Map<String, List<AiInfo>> recommendMap = new HashMap<>();

        List<AiInfo> aiInfoList;

        for(Recommend recommend : recommendList){
            aiInfoList = new ArrayList<>();
            List<Long> idList = aiInfoRepository.findRecommendList(recommend.toString());

            for(Long id : idList){
                aiInfoList.add(aiInfoRepository.findAiInfoById(id));
            }

            recommendMap.put(recommend.toString(), aiInfoList);
        }

        return recommendMap;
    }
}
