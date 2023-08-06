package back.ailion.service.impl;

import back.ailion.model.dto.UserDto;
import back.ailion.model.entity.User;
import back.ailion.repository.UserRepository;
import back.ailion.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDto getUserDto(String username) {
        User userEntity = userRepository.findByUsername(username);

        if(userEntity != null){
            UserDto userDto = UserDto.builder()
                    .username(userEntity.getUsername())
                    .password(userEntity.getPassword())
                    .role(userEntity.getRole())
                    .provider(userEntity.getProvider())
                    .providerId(userEntity.getProviderId())
                    .name(userEntity.getName())
                    .phone(userEntity.getPhone())
                    .nickName(userEntity.getNickname())
                    .build();
            return userDto;
        }
        else{
            return null;
        }
    }

    @Override
    public User getUserEntity(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void saveUserDto(UserDto userDto) {
        User user = User.builder()
                .username(userDto.getUsername())
                .password(userDto.getPassword())
                .provider(userDto.getProvider())
                .providerId(userDto.getProviderId())
                .role(userDto.getRole())
                .name(userDto.getName())
                .nickname(userDto.getNickName())
                .phone(userDto.getPhone())
                .build();

        String rawPassword = userDto.getPassword();
        String encPasswrod = bCryptPasswordEncoder.encode(rawPassword);

        user.setPassword(encPasswrod);
        user.setRole("ROLE_USER");

        userRepository.save(user);
    }

    @Override
    public void saveUserEntity(User user) {
        userRepository.save(user);
    }
}
