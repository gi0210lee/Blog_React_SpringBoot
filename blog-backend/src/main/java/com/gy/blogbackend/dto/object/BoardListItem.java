package com.gy.blogbackend.dto.object;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class BoardListItem {
    private int boardNumber;
    private String boardTitle;
    private String boardContent;
    private String boardImage;
    private String boardWriterProfileImage;
    private String boardWriterNickname;
    private Date boardWriteDate;
    private int boardViewCount;
    private int boardFavoriteCount;
    private int boardCommentCount;
}
