package com.gy.blogbackend.entity.primaryKey;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoritePk implements Serializable {
    @Column(name = "USER_EMAIL")
    private String userEmail;
    @Column(name = "BOARD_NUMBER")
    private int boardNumber;
}
