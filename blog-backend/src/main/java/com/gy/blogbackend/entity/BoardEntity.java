package com.gy.blogbackend.entity;


import com.gy.blogbackend.dto.request.board.PatchBoardRequestDto;
import com.gy.blogbackend.dto.request.board.PostBoardRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "`board`")
@Table(name = "`board`")
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;
    private String title;
    private String content;
    private String image;
    private String video;
    private String attachedFile;
    private String writerEmail;
    private String writerProfileImage;
    private String writerNickname;
    private Date writeDatetime;
    private int viewCount;
    private int favoriteCount;
    private int commentCount;

    public BoardEntity(PostBoardRequestDto dto, String email, String nickname) {

        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDatetime = simpleDateFormat.format(now);

        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writerEmail = email;
        this.writerNickname = nickname;
        this.writeDatetime = now;

    }

    public void increaseViewCount() {
        this.viewCount++;
    }

    public void increaseFavoriteCount() {
        this.favoriteCount++;
    }

    public void decreaseFavoriteCount() {
        this.favoriteCount--;
    }

    public void increaseCommentCount() {
        this.commentCount++;
    }


    public void patchBoard(PatchBoardRequestDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
    }
}
