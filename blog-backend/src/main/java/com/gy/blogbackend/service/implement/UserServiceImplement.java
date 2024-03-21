package com.gy.blogbackend.service.implement;

import com.gy.blogbackend.dto.request.user.PatchNicknameRequestDto;
import com.gy.blogbackend.dto.request.user.PatchProfileImageRequestDto;
import com.gy.blogbackend.dto.response.ResponseDto;
import com.gy.blogbackend.dto.response.user.GetSignInUserResponseDto;
import com.gy.blogbackend.dto.response.user.GetUserResponseDto;
import com.gy.blogbackend.dto.response.user.PatchNicknameResponseDto;
import com.gy.blogbackend.dto.response.user.PatchProfileImageResponseDto;
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
    public ResponseEntity<? super GetUserResponseDto> getUser(String email) {
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null)
                return GetUserResponseDto.notExistUser();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetUserResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {

        UserEntity userEntity = null;

        try {
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null)
                return GetSignInUserResponseDto.notExistUser();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInUserResponseDto.success(userEntity);
    }

    @Override
    public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return PatchNicknameResponseDto.notExistUser();

            String nickname = dto.getNickname();
            boolean existedNickname = userRepository.existsByNickname(nickname);
            if (existedNickname) return PatchNicknameResponseDto.duplicateNickname();

            userEntity.setNickname(nickname);
            userRepository.save(userEntity);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchNicknameResponseDto.success();
    }

    @Override
    public ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return PatchProfileImageResponseDto.notExistUser();

            String profileImage = dto.getProfileImage();
            userEntity.setProfileImage(profileImage);
            userRepository.save(userEntity);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PatchProfileImageResponseDto.success();
    }
}
