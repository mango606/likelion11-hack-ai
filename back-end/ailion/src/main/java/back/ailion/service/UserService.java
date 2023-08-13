package back.ailion.service;


import back.ailion.config.auth.SecurityUtil;
import back.ailion.exception.BaseException;
import back.ailion.exception.BaseExceptionCode;
import back.ailion.model.dto.UserDto;
import back.ailion.model.entity.Authority;
import back.ailion.model.entity.Recommend;
import back.ailion.model.entity.User;
import back.ailion.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    public User signup(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
            throw new BaseException(BaseExceptionCode.USER_ID_CONFLICT);
        }

        // 가입되어 있지 않은 회원이면,
        // 권한 정보 만들고
        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();


        Map<String, Integer> recommends = userDto.getRecommends();
        List<Recommend> recommendList = new ArrayList<>();

        for(String recommend : recommends.keySet()){
            if(recommends.get(recommend) > 3){
                recommendList.add(Recommend.valueOf(recommend));
            }
        }

        // 유저 정보를 만들어서 save
        User user = User.builder()
                .username(userDto.getUsername())
                .password("{bcrypt}" + passwordEncoder.encode(userDto.getPassword()))
                .nickname(userDto.getNickname())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .name(userDto.getName())
                .phone(userDto.getPhone())
                .recommends(recommendList)
                .build();

        return userRepository.save(user);
    }

    // 유저,권한 정보를 가져오는 메소드
    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(String username) {
        return userRepository.findOneWithAuthoritiesByUsername(username);
    }

    // 현재 securityContext에 저장된 username의 정보만 가져오는 메소드
    @Transactional(readOnly = true)
    public Optional<User> getMyUserWithAuthorities() {
        return SecurityUtil.getCurrentUsername()
                .flatMap(userRepository::findOneWithAuthoritiesByUsername);
    }

    public Boolean isValidId(String id) {
        if (userRepository.findByUsername(id) != null) {
            return true;
        }
        else{
            return false;
        }
    }
}
