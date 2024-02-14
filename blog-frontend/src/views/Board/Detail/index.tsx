import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.css";
import FavoriteItem from "components/FavoriteItem";
import { IBoard, ICommentListItem, IFavoriteListItem } from "types/interface";
import { commentListMock, favoriteListMock } from "mocks";
import CommentItem from "components/CommentItem";
import Pagination from "components/Pagination";
import defaultProfileImage from "assets/image/default-profile-image.png";
import { useLoginUserStore } from "stores";
import { useNavigate, useParams } from "react-router-dom";
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from "constant";
import boardMock from "mocks/board.bock";

export default function BoardDetail() {
  const { boardNumber } = useParams();
  const { loginUser } = useLoginUserStore();
  const navigate = useNavigate();

  // 게시물 상단
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

    const onUpdateButtonClickHandler = () => {
      if (!board || !loginUser) return;
      if (loginUser.email !== board.writerEmail) return;

      navigate(BOARD_PATH() + "/" + BOARD_UPDATE_PATH(board.boardNumber));
    };

    const onDeleteButtonClickHandler = () => {
      if (!board || !loginUser) return;
      if (loginUser.email !== board.writerEmail) return;

      navigate(MAIN_PATH());
    };

    useEffect(() => {
      setBoard(boardMock);
    }, [boardNumber]);

    if (!board) return <></>;

    return (
      <div id="board-detail-top">
        <div className="board-detail-top-header">
          <div className="board-detail-title">{board.title}</div>
          <div className="board-detail-top-sub-box">
            <div className="board-detail-write-info-box">
              <div
                className="board-detail-writer-profile-image"
                style={{
                  backgroundImage: `url(${
                    board.writerProfileImage
                      ? board.writerProfileImage
                      : defaultProfileImage
                  })`,
                }}
              ></div>
              <div
                className="board-detail-writer-nickname"
                onClick={onNicknameClickHandler}
              >
                {board.writerNickname}
              </div>
              <div className="board-detail-info-divider">{`|`}</div>
              <div className="board-detail-write-date">
                {board.writeDatetime}
              </div>
            </div>
            <div className="icon-button" onClick={onMoreButtonClickHandler}>
              <div className="icon more-icon"></div>
            </div>
            {showMore && (
              <div className="board-detail-more-box">
                <div
                  className="board-detail-update-button"
                  onClick={onUpdateButtonClickHandler}
                >
                  수정
                </div>
                <div className="divider"></div>
                <div
                  className="board-detail-delete-button"
                  onClick={onDeleteButtonClickHandler}
                >
                  삭제
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="divider"></div>
        <div className="board-detail-top-main">
          <div className="board-detail-main-text">{board.content}</div>
          {board.boardImageList.map((image) => (
            <img className="board-detail-main-image" src={image} />
          ))}
        </div>
      </div>
    );
  };

  // 게시물 하단
  const BoardDetailBottom = () => {
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const [favoriteList, setFavoriteList] = useState<IFavoriteListItem[]>([]);
    const [commentList, setCommentList] = useState<ICommentListItem[]>([]);
    const [isFavorite, setFavorite] = useState<boolean>(false);
    const [showFavorite, setShowFavorite] = useState<boolean>(false);
    const [showComment, setShowComment] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");

    const onFavoriteClickHandler = () => {
      setFavorite(!isFavorite);
    };

    const onShowFavoriteClickHandler = () => {
      setShowFavorite(!showFavorite);
    };

    const onShowCommentClickHandler = () => {
      setShowComment(!showComment);
    };

    const onCommentChangeHandler = (
      event: ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { value } = event.target;
      setComment(value);

      if (!commentRef.current) return;
      commentRef.current.style.height = `auto`;
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    };

    const onCommentSubmitButtonClickHandler = () => {
      if (!comment) return;
      alert("!");
    };

    useEffect(() => {
      setFavoriteList(favoriteListMock);
      setCommentList(commentListMock);
    }, [boardNumber]);

    return (
      <div id="board-detail-bottom">
        <div className="board-detail-bottom-button-box">
          <div className="board-detail-bottom-button-group">
            <div className="icon-button" onClick={onFavoriteClickHandler}>
              {isFavorite ? (
                <div className="icon favorite-fill-icon"></div>
              ) : (
                <div className="icon favorite-light-icon"></div>
              )}
            </div>
            <div className="board-detail-bottom-button-text">{`좋아요 ${favoriteList.length}`}</div>
            <div className="icon-button" onClick={onShowFavoriteClickHandler}>
              {showFavorite ? (
                <div className="icon up-light-icon"></div>
              ) : (
                <div className="icon down-light-icon"></div>
              )}
            </div>
          </div>
          <div className="icon-button">
            <div className="icon comment-icon"></div>
          </div>
          <div className="board-detail-bottom-button-text">{`댓글 ${commentList.length}`}</div>
          <div className="icon-button" onClick={onShowCommentClickHandler}>
            {showComment ? (
              <div className="icon up-light-icon"></div>
            ) : (
              <div className="icon down-light-icon"></div>
            )}
          </div>
        </div>
        {showFavorite && (
          <div className="board-detail-bottom-favorit-box">
            <div className="board-detail-bottom-favorite-container">
              <div className="board-detail-bottom-favorite-title">
                {`좋아요 `}
                <span className="emphasis">{favoriteList.length}</span>
              </div>
              <div className="board-detail-bottom-favorite-contents">
                {favoriteList.map((item) => (
                  <FavoriteItem favoriteItem={item} />
                ))}
              </div>
            </div>
          </div>
        )}
        {showComment && (
          <div className="board-detail-bottom-comment-box">
            <div className="board-detail-bottom-comment-container">
              <div className="board-detail-bottom-comment-title">
                {`댓글 `}
                <span className="emphasis">{commentList.length}</span>
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
                  ref={commentRef}
                  className="board-detail-bottom-comment-textarea"
                  placeholder="댓글을 작성해주세요"
                  onChange={onCommentChangeHandler}
                  value={comment}
                />
                <div className="board-detail-bottom-comment-button-box">
                  <div
                    className={
                      comment === "" ? "disable-button" : "black-button"
                    }
                    onClick={onCommentSubmitButtonClickHandler}
                  >{`댓글 달기`}</div>
                </div>
              </div>
            </div>
          </div>
        )}
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
