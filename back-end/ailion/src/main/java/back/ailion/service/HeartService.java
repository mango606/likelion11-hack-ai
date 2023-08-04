package back.ailion.service;

import back.ailion.model.dto.HeartDto;
import back.ailion.model.dto.request.HeartRequestDto;
import back.ailion.model.entity.Heart;
import back.ailion.model.entity.Post;
import back.ailion.model.entity.User;
import back.ailion.repository.HeartRepository;
import back.ailion.repository.PostRepository;
import back.ailion.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HeartService {

    private final HeartRepository heartRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    private HeartDto HeartToHeartDto(Heart heart) {
        return new HeartDto(heart);
    }

    @Transactional
    public HeartDto insert(HeartRequestDto heartRequestDto) {

        User user = userRepository.findById(heartRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("Could not found user id : " + heartRequestDto.getUserId()));

        Post post = postRepository.findById(heartRequestDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Could not found post id : " + heartRequestDto.getPostId()));

        // 이미 좋아요 되어있으면 오류 반환
        if (heartRepository.findByUserAndPost(user, post).isPresent()){

            throw new RuntimeException("좋아요가 이미 존재");
        }

        Heart heart = Heart.builder()
                .user(user)
                .post(post)
                .build();

        postRepository.addLikeCount(post);
        return HeartToHeartDto(heartRepository.save(heart));
    }

    @Transactional
    public boolean delete(HeartRequestDto heartRequestDto) {

        User user = userRepository.findById(heartRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("Could not found user id : " + heartRequestDto.getUserId()));

        Post post = postRepository.findById(heartRequestDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Could not found post id : " + heartRequestDto.getPostId()));

        Heart heart = heartRepository.findByUserAndPost(user, post)
                .orElseThrow(() -> new RuntimeException("Could not found heart id"));

        heartRepository.delete(heart);
        postRepository.subLikeCount(post);

        return true;
    }


}
