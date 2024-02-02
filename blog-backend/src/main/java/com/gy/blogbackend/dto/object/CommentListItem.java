package com.gy.blogbackend.dto.object;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@RequiredArgsConstructor
public class CommentListItem {
    private String commentUserProfileImage;
    private String commentUserNickname;
    private Date commentWriteDate;
    private String commentContent;
}
