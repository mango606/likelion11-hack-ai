package back.ailion.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UserDto {
    private String username;

    private String password;

    private String email;

    private String role;

    private String provider;

    private String providerId;

    private String name;

    private String phone;
}
