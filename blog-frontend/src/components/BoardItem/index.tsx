import React from "react";
import "./style.css";
import DefaultProfileImage from "assets/image/default-profile-image.png";

import { IBoardItem } from "types/interface";
import { useNavigate } from "react-router-dom";
interface Props {
  boardItem: IBoardItem;
}

export default function BoardItem({ boardItem }: Props) {
  const {
    boardNumber,
    boardTitle,
    boardContent,
    boardImage,
    boardWriterProfileImage,
    boardWriterNickname,
    boardWriteDate,
    boardViewCount,
    boardFavoriteCount,
    boardCommentCount,
  } = boardItem;

  // const navigate = useNavigate();

  const onClickHanlder = () => {
    // navigate(boardNumber);
  };

  return (
    <div className="board-item" onClick={onClickHanlder}>
      <div className="board-item-main-box">
        <div className="board-item-top">
          <div className="board-item-profile-box">
            <div
              className="board-item-profile-image"
              style={{
                background: `url(${
                  boardWriterProfileImage
                    ? boardWriterProfileImage
                    : DefaultProfileImage
                }})`,
              }}
            ></div>
          </div>
          <div className="board-item-write-box">
            <div className="board-item-nickname">{boardWriterNickname}</div>
            <div className="board-item-write-date">
              {boardWriteDate.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="board-item-middle">
          <div className="board-item-title">{boardTitle}</div>
          <div className="board-item-content">{boardContent}</div>
        </div>
        <div className="board-item-bottom">
          <div className="board-item-counts">
            {`댓글: ${boardCommentCount}  좋아요: ${boardFavoriteCount}  조회수: ${boardViewCount}`}
          </div>
        </div>
      </div>
      {boardImage !== null && (
        <div className="board-item-image-box">
          <div
            className="board-item-image"
            style={{
              backgroundImage: `url(${boardImage})`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
