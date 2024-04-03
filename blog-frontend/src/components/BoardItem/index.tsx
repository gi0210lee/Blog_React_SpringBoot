import React from "react";
import "./style.css";
import defaultProfileImage from "assets/image/default-profile-image.png";

import { IBoardListItem } from "types/interface";
import { useNavigate } from "react-router-dom";
import { BOARD_DETAIL_PATH, BOARD_PATH } from "constant";
interface Props {
  boardItem: IBoardListItem;
}

export default function BoardItem({ boardItem }: Props) {
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
  } = boardItem;

  const navigate = useNavigate();

  const onClickHanlder = () => {
    navigate(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(boardNumber));
  };

  return (
    <div className="board-item" onClick={onClickHanlder}>
      <div className="board-item-main-box">
        <div className="board-item-top">
          <div className="board-item-profile-box">
            <div
              className="board-item-profile-image"
              style={{
                backgroundImage: `url(${
                  writerProfileImage ? writerProfileImage : defaultProfileImage
                }})`,
              }}
            ></div>
          </div>
          <div className="board-item-write-box">
            <div className="board-item-nickname">{writerNickname}</div>
            <div className="board-item-write-date">
              {writeDatetime.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="board-item-middle">
          <div className="board-item-title">{title}</div>
          <div className="board-item-content">{content}</div>
        </div>
        <div className="board-item-bottom">
          <div className="board-item-counts">
            {`댓글: ${commentCount}  좋아요: ${favoriteCount}  조회수: ${viewCount}`}
          </div>
        </div>
      </div>
      {image !== null && (
        <div className="board-item-image-box">
          <div
            className="board-item-image"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
