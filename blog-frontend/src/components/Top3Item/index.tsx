import React from "react";
import "./style.css";
import defaultProfileImage from "assets/image/default-profile-image.png";
import { IBoardItem } from "types/interface";
import { useNavigate } from "react-router-dom";

interface Props {
  top3Item: IBoardItem;
}

export default function Top3Item({ top3Item }: Props) {
  //   const navigate = useNavigate();
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
  } = top3Item;

  const onClickHandler = () => {
    // navigator(boardNumber)
  };

  return (
    <div
      className="top3-item"
      style={{
        backgroundImage: `url(${boardImage})`,
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
                  boardWriterProfileImage
                    ? boardWriterProfileImage
                    : defaultProfileImage
                })`,
              }}
            ></div>
          </div>
          <div className="top3-item-write-box">
            <div className="top3-item-nickname">{boardWriterNickname}</div>
            <div className="top3-item-write-date">
              {boardWriteDate.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="top3-item-middle">
          <div className="top3-item-title">{boardTitle}</div>
          <div className="top3-item-content">{boardContent}</div>
        </div>
        <div className="top3-item-bottom">
          <div className="top3-item-counts">
            {`댓글 ${boardCommentCount} 좋아요 ${boardFavoriteCount} 조회수 ${boardViewCount}`}
          </div>
        </div>
      </div>
    </div>
  );
}
