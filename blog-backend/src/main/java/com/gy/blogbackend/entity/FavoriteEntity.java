package com.gy.blogbackend.entity;

import com.gy.blogbackend.entity.primaryKey.FavoritePk;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "`favorite`")
@Table(name = "`favorite`")
public class FavoriteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int favoriteId;

    private int boardNumber;

    private String userEmail;
    private String userProfileImage;
    private String userNickname;

    public FavoriteEntity(String email, Integer boardNumber, String nickName) {
        this.userEmail = email;
        this.boardNumber = boardNumber;
        this.userNickname = nickName;
    }
}
