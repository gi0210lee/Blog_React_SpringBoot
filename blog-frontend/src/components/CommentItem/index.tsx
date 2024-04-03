import React from "react";
import "./style.css";
import { ICommentListItem } from "types/interface";
import dayjs from "dayjs";
import defualtProfileImage from "../../assets/image/default-profile-image.png";

interface IProps {
  commentItem: ICommentListItem;
}

export default function CommentItem({ commentItem }: IProps) {
  const { profileImage, nickname, writeDatetime, content } = commentItem;

  const getElapsedTime = () => {
    // const now = dayjs().add(9, "hour");
    const now = dayjs();
    const writeTime = dayjs(writeDatetime);

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
              style={{
                backgroundImage: `url(${
                  profileImage ? profileImage : defualtProfileImage
                })`,
              }}
            ></div>
          </div>
          <div className="comment-item-nickname">{`${nickname}`}</div>
          <div className="comment-item-divider">{`\|`}</div>
          <div className="comment-item-write-datetime">{getElapsedTime()}</div>
        </div>
        <div className="comment-item-main">
          <div className="comment-item-item-content">{`${content}`}</div>
        </div>
      </div>
    </>
  );
}
