package com.gy.blogbackend.service.implement;

import com.gy.blogbackend.dto.response.ResponseDto;
import com.gy.blogbackend.dto.response.user.GetSignInUserResponseDto;
import com.gy.blogbackend.entity.UserEntity;
import com.gy.blogbackend.repository.UserRepository;
import com.gy.blogbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {

        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) {
                return GetSignInUserResponseDto.notExistUser();
            }

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInUserResponseDto.success(userEntity);
    }
}
