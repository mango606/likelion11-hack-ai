package back.ailion.service;


import back.ailion.model.dto.UserDto;
import back.ailion.model.entity.User;

public interface UserService {
    public UserDto getUserDto(String username);

    public User getUserEntity(String username);
    public void saveUserDto(UserDto userDto);

    public void saveUserEntity(User user);

}
