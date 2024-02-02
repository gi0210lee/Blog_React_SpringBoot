package com.gy.blogbackend.controller;

import com.gy.blogbackend.dto.request.auth.SignInRequestDto;
import com.gy.blogbackend.dto.request.auth.SignUpRequestDto;
//import com.gy.blogbackend.dto.SignUpResponseDto;
import com.gy.blogbackend.dto.response.auth.SignInResponseDto;
import com.gy.blogbackend.dto.response.auth.SignUpResponseDto;
import com.gy.blogbackend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<? super SignUpResponseDto> signUp(
            @RequestBody @Valid SignUpRequestDto requestBody
    ) {
        ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
        return response;
    }

    @PostMapping("/sign-in")
    public ResponseEntity<? super SignInResponseDto> signIn(@RequestBody @Valid SignInRequestDto requestBody) {
        ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
        return response;
    }
}
