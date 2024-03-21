package com.gy.blogbackend.service;

import com.gy.blogbackend.dto.request.user.PatchNicknameRequestDto;
import com.gy.blogbackend.dto.request.user.PatchProfileImageRequestDto;
import com.gy.blogbackend.dto.response.user.GetSignInUserResponseDto;
import com.gy.blogbackend.dto.response.user.GetUserResponseDto;
import com.gy.blogbackend.dto.response.user.PatchNicknameResponseDto;
import com.gy.blogbackend.dto.response.user.PatchProfileImageResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<? super GetUserResponseDto> getUser(String email);

    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);

    ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email);

    ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email);
}
