package com.sergio.jwt.backend.mappers;

import com.sergio.jwt.backend.dtos.SignUpDto;
import com.sergio.jwt.backend.dtos.UserDto;
import com.sergio.jwt.backend.entites.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-06T09:35:59+0530",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.UserDtoBuilder userDto = UserDto.builder();

        userDto.id( user.getId() );
        userDto.name( user.getName() );
        userDto.email( user.getEmail() );
        userDto.mobileNumber( user.getMobileNumber() );
        userDto.login( user.getLogin() );
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

        user.name( signUpDto.getName() );
        user.mobileNumber( signUpDto.getMobileNumber() );
        user.email( signUpDto.getEmail() );
        user.login( signUpDto.getLogin() );
        if ( signUpDto.getRole() != null ) {
            user.role( Enum.valueOf( User.Role.class, signUpDto.getRole() ) );
        }

        return user.build();
    }
}
