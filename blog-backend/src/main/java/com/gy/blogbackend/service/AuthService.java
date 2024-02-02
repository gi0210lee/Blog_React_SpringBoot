package com.gy.blogbackend.service;

import com.gy.blogbackend.dto.request.auth.SignInRequestDto;
import com.gy.blogbackend.dto.request.auth.SignUpRequestDto;
import com.gy.blogbackend.dto.response.auth.SignInResponseDto;
import com.gy.blogbackend.dto.response.auth.SignUpResponseDto;
//import com.gy.blogbackend.security.TokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
