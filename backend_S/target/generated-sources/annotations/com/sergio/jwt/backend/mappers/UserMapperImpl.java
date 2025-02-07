package com.sergio.jwt.backend.mappers;

import com.sergio.jwt.backend.dtos.SignUpDto;
import com.sergio.jwt.backend.dtos.UserDto;
import com.sergio.jwt.backend.entites.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-02-06T16:54:06+0530",
    comments = "version: 1.5.3.Final, compiler: Eclipse JDT (IDE) 3.41.0.z20250115-2156, environment: Java 21.0.5 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.email( user.getEmail() );
        userDto.id( user.getId() );
        userDto.login( user.getLogin() );
        userDto.mobileNumber( user.getMobileNumber() );
        userDto.name( user.getName() );
        if ( user.getRole() != null ) {
            userDto.role( user.getRole().name() );
        }

        return userDto.build();
    }

    @Override
    public User signUpToUser(SignUpDto signUpDto) {
        if ( signUpDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.email( signUpDto.getEmail() );
        user.login( signUpDto.getLogin() );
        user.mobileNumber( signUpDto.getMobileNumber() );
        user.name( signUpDto.getName() );
        if ( signUpDto.getRole() != null ) {
            user.role( Enum.valueOf( User.Role.class, signUpDto.getRole() ) );
        }

        return user.build();
    }
}
