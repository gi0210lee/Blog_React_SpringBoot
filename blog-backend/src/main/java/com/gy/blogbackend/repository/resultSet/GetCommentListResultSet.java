package com.gy.blogbackend.repository.resultSet;

import java.util.Date;

public interface GetCommentListResultSet {
    String getNickname();

    String getProfileImage();

    Date getWriteDatetime();

    String getContent();
}
