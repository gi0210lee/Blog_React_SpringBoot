import React from "react";
import "./style.css";
import { ICommentListItem } from "types/interface";
import dayjs from "dayjs";
import { write } from "fs";

interface Props {
  commentItem: ICommentListItem;
}

export default function CommentItem({ commentItem }: Props) {
  const {
    commentUserProfileImage,
    commentUserNickname,
    commentWriteDate,
    commentContent,
  } = commentItem;

  const getElapsedTime = () => {
    const now = dayjs().add(9, "hour");
    const writeTime = dayjs(commentItem.commentWriteDate);

    const gap = now.diff(writeTime, "s");
    if (gap < 60) return `${gap}초 전`;
    if (gap < 3600) return `${Math.floor(gap / 60)}분 전`;
    if (gap < 86400) return `${Math.floor(gap / 3600)}시간 전`;
    return `${Math.floor(gap / 864000)}일 전`;
  };

  return (
    <>
      <div className="comment-item">
        <div className="comment-item-top">
          <div className="comment-item-profile-box">
            <div
              className="comment-item-profile-image"
              style={{ backgroundImage: `url(${commentUserProfileImage})` }}
            ></div>
          </div>
          <div className="comment-item-nickname">{`${commentUserNickname}`}</div>
          <div className="comment-item-divider">{`\|`}</div>
          <div className="comment-item-write-datetime">{getElapsedTime()}</div>
        </div>
        <div className="comment-item-main">
          <div className="comment-item-item-content">{`${commentContent}`}</div>
        </div>
      </div>
    </>
  );
}
