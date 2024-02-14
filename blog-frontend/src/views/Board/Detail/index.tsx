import React, { useEffect, useState } from "react";
import "./style.css";
import FavoriteItem from "components/FavoriteItem";
import { IBoard, ICommentListItem, IFavoriteListItem } from "types/interface";
import { commentListMock, favoriteListMock } from "mocks";
import CommentItem from "components/CommentItem";
import Pagination from "components/Pagination";
import defaultProfileImage from "assets/image/default-profile-image.png";
import { useLoginUserStore } from "stores";
import { useNavigate, useParams } from "react-router-dom";
import { USER_PATH } from "constant";

export default function BoardDetail() {
  const { boardNumber } = useParams();
  const { loginUser } = useLoginUserStore();
  const navigate = useNavigate();

  const BoardDetailTop = () => {
    const [board, setBoard] = useState<IBoard | null>(null);
    const [showMore, setShowMore] = useState<boolean>(false);

    const onMoreButtonClickHandler = () => {
      setShowMore(!showMore);
    };

    const onNicknameClickHandler = () => {
      if (!board) return;

      navigate(USER_PATH(board.writerEmail));
    };

    return (
      <div id="board-detail-top">
        <div className="board-detail-top-header">
          <div className="board-detail-title">제목제목</div>
          <div className="board-detail-top-sub-box">
            <div className="board-detail-write-info-box">
              <div
                className="board-detail-writer-profile-image"
                style={{ backgroundImage: `url(${defaultProfileImage})` }}
              ></div>
              <div className="board-detail-writer-nickname">닉네임닉네임</div>
              <div className="board-detail-info-divider">{`|`}</div>
              <div className="board-detail-write-date">2024. 01. 01</div>
            </div>
            <div className="icon-button" onClick={onMoreButtonClickHandler}>
              <div className="icon more-icon"></div>
            </div>
            {showMore && (
              <div className="board-detail-more-box">
                <div className="board-detail-update-button">수정</div>
                <div className="divider"></div>
                <div className="board-detail-delete-button">삭제</div>
              </div>
            )}
          </div>
        </div>
        <div className="divider"></div>
        <div className="board-detail-top-main">
          <div className="board-detail-main-text">본문본문</div>
          <img
            className="board-detail-main-image"
            src="https://picsum.photos/250/250"
          />
        </div>
      </div>
    );
  };

  const BoardDetailBottom = () => {
    const [favoriteList, setFavoriteList] = useState<IFavoriteListItem[]>([]);
    const [commentList, setCommentList] = useState<ICommentListItem[]>([]);

    useEffect(() => {
      setFavoriteList(favoriteListMock);
      setCommentList(commentListMock);
    }, []);

    return (
      <div id="board-detail-bottom">
        <div className="board-detail-bottom-button-box">
          <div className="board-detail-bottom-button-group">
            <div className="icon-button">
              <div className="icon favorite-icon"></div>
            </div>
            <div className="board-detail-bottom-button-text">{`좋아요 13`}</div>
            <div className="icon-button">
              <div className="icon up-light-icon"></div>
            </div>
          </div>
          <div className="icon-button">
            <div className="icon comment-icon"></div>
          </div>
          <div className="board-detail-bottom-button-text">{`댓글 14`}</div>
          <div className="icon-button">
            <div className="icon up-light-icon"></div>
          </div>
        </div>
        <div className="board-detail-bottom-favorit-box">
          <div className="board-detail-bottom-favorite-container">
            <div className="board-detail-bottom-favorite-title">
              {`좋아요`}
              <span className="emphasis">{12}</span>
            </div>
            <div className="board-detail-bottom-favorite-contents">
              {favoriteList.map((item) => (
                <FavoriteItem favoriteItem={item} />
              ))}
            </div>
          </div>
        </div>
        <div className="board-detail-bottom-comment-box">
          <div className="board-detail-bottom-comment-container">
            <div className="board-detail-bottom-comment-title">
              {`댓글`}
              <span className="emphasis">{15}</span>
            </div>
            <div className="board-detail-bottom-comment-list-container">
              {commentList.map((item) => (
                <CommentItem commentItem={item} />
              ))}
            </div>
          </div>
          <div className="divider"></div>
          <div className="board-detail-bottom-comment-pagination-box">
            <Pagination />
          </div>
          <div className="board-detail-bottom-comment-input-box">
            <div className="board-detail-bottom-comment-input-container">
              <textarea
                className="board-detail-bottom-comment-textarea"
                placeholder="댓글을 작성해주세요"
              />
              <div className="board-detail-bottom-comment-button-box">
                <div className="disable-button">{`댓글 달기`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="board-detail-wrapper">
      <div className="board-detail-container">
        <BoardDetailTop />
        <BoardDetailBottom />
      </div>
    </div>
  );
}