import React from "react";
import "./style.css";
import defaultProfileImage from "assets/image/default-profile-image.png";
import { IBoardListItem } from "types/interface";
import { useNavigate } from "react-router-dom";
import { BOARD_DETAIL_PATH, BOARD_PATH } from "constant";

interface IProps {
  top3Item: IBoardListItem;
}

export default function Top3Item({ top3Item }: IProps) {
  const navigate = useNavigate();
  const {
    boardNumber,
    title,
    content,
    image,
    viewCount,
    favoriteCount,
    commentCount,
    writeDatetime,
    writerEmail,
    writerNickname,
    writerProfileImage,
  } = top3Item;

  const onClickHandler = () => {
    navigate(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(boardNumber));
  };

  return (
    <div
      className="top3-item"
      style={{
        backgroundImage: `url(${image})`,
      }}
      onClick={onClickHandler}
    >
      <div className="top3-item-main-box">
        <div className="top3-item-top">
          <div className="top3-item-profile-box">
            <div
              className="top3-item-profile-image"
              style={{
                backgroundImage: `url(${
                  writerProfileImage ? writerProfileImage : defaultProfileImage
                })`,
              }}
            ></div>
          </div>
          <div className="top3-item-write-box">
            <div className="top3-item-nickname">{writerNickname}</div>
            <div className="top3-item-write-date">
              {writeDatetime.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="top3-item-middle">
          <div className="top3-item-title">{title}</div>
          <div className="top3-item-content">{content}</div>
        </div>
        <div className="top3-item-bottom">
          <div className="top3-item-counts">
            {`댓글 ${commentCount} 좋아요 ${favoriteCount} 조회수 ${viewCount}`}
          </div>
        </div>
      </div>
    </div>
  );
}
