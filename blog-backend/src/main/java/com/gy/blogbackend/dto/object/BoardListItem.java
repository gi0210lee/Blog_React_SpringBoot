package com.gy.blogbackend.dto.object;

import com.gy.blogbackend.entity.BoardListViewEntity;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@RequiredArgsConstructor
public class BoardListItem {
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


    public BoardListItem(BoardListViewEntity boardListViewEntity) {
        this.boardNumber = boardListViewEntity.getBoardNumber();
        this.title = boardListViewEntity.getTitle();
        this.content = boardListViewEntity.getContent();
        this.image = boardListViewEntity.getImage();
        this.viewCount = boardListViewEntity.getViewCount();
        this.favoriteCount = boardListViewEntity.getFavoriteCount();
        this.commentCount = boardListViewEntity.getCommentCount();
        this.writeDatetime = boardListViewEntity.getWriteDatetime();
        this.writerEmail = boardListViewEntity.getWriterEmail();
        this.writerNickname = boardListViewEntity.getWriterNickname();
        this.writerProfileImage = boardListViewEntity.getWriterProfileImage();

    }

    public static List<BoardListItem> getList(List<BoardListViewEntity> boardListViewEntities) {
        List<BoardListItem> list = new ArrayList<>();
        for (BoardListViewEntity boardListViewEntity : boardListViewEntities) {
            BoardListItem boardListItem = new BoardListItem(boardListViewEntity);
            list.add(boardListItem);
        }
        return list;
    }
}
