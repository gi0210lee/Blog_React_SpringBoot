package com.gy.blogbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {
    private String email;
    private String password;
    private String passwordCheck;
    private String nickname;
    private String telNumber;
    private String address;
    private String addressDetail;
}
