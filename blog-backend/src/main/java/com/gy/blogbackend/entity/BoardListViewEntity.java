package com.gy.blogbackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "BOARD_LIST_VIEW")
@Table(name = "BOARD_LIST_VIEW")
public class BoardListViewEntity {

    @Id
    private int boardNumber;
    private String title;
    private String content;
    private String image;
    private int viewCount;
    private int favoriteCount;
    private int commentCount;
    private Date writeDatetime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImage;
}
