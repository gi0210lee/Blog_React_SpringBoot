import React from "react";
import "./style.css";
import { ICommentItem } from "types/interface";

interface Props {
  commentItem: ICommentItem;
}

export default function CommentItem({ commentItem }: Props) {
  const {
    commentUserProfileImage,
    commentUserNickname,
    commentWriteDate,
    commentContent,
  } = commentItem;

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
          <div className="comment-item-write-datetime">{`${commentWriteDate.toLocaleString()}`}</div>
        </div>
        <div className="comment-item-main">
          <div className="comment-item-item-content">{`${commentContent}`}</div>
        </div>
      </div>
    </>
  );
}
