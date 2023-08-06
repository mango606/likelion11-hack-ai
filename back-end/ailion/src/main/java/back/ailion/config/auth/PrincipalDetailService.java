package back.ailion.config.auth;

import back.ailion.model.entity.User;
import back.ailion.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PrincipalDetailService implements UserDetailsService {

    private final UserService userService;

    public PrincipalDetailService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userService.getUserEntity(username);

        System.out.println("user: " + userEntity);
        System.out.println(userEntity.getUsername());

        if(userEntity != null)
            return new PrincipalDetails(userEntity);
        return null;
    }
}
