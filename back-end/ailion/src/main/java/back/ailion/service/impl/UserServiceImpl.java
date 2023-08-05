package back.ailion.service.impl;

import back.ailion.dto.UserDto;
import back.ailion.entity.User;
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
                    .email(userEntity.getEmail())
                    .role(userEntity.getRole())
                    .provider(userEntity.getProvider())
                    .providerId(userEntity.getProviderId())
                    .name(userEntity.getName())
                    .phone(userEntity.getPhone())
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
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .provider(userDto.getProvider())
                .providerId(userDto.getProviderId())
                .role(userDto.getRole())
                .name(userDto.getName())
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
