package back.ailion.service;

import back.ailion.entity.AiInfo;
import back.ailion.repository.AiInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AiInfoService {

    private final AiInfoRepository aiInfoRepository;
    //단건 조회
    public AiInfo findById(long id){
        return aiInfoRepository.findById(id).orElseThrow(()->new IllegalArgumentException("AiInfo not exist ! : "+id));
    }

    //전체 조회
    public List<AiInfo> findAll() {
        return aiInfoRepository.findAll();
    }

    //카테고리별 조회
    public List<AiInfo> findByCategory(){
        return null;
    }
}
