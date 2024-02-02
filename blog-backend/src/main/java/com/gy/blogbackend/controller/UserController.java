package com.gy.blogbackend.controller;

import com.gy.blogbackend.dto.PatchUserDto;
import com.gy.blogbackend.dto.PatchUserResponseDto;
import com.gy.blogbackend.dto.response.ResponseDto;
import com.gy.blogbackend.dto.response.user.GetSignInUserResponseDto;
import com.gy.blogbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(@AuthenticationPrincipal String email) {
        ResponseEntity<? super GetSignInUserResponseDto> response = userService.getSignInUser(email);
        return response;
    }

    ;

//    @PatchMapping("/")
//    public ResponseDto<PatchUserResponseDto> patchUser(@RequestBody PatchUserDto requstBody, @AuthenticationPrincipal String userEmail) {
//        return null;
//    }
}
