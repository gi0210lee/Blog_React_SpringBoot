import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import { useBoardStore, useLoginUserStore } from "stores";
import { useNavigate, useParams } from "react-router-dom";
import { MAIN_PATH } from "constant";
import { useCookies } from "react-cookie";
import { getBoardRequest } from "apis";
import { IGetBoardResponseDto } from "apis/response/board";
import { IResponseDto } from "apis/response";
import { convertUrlsToFiles } from "utils";

// 게시물 수정
export default function BoardUpdate() {
  // 상태
  const { boardNumber } = useParams();
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { title, setTitle } = useBoardStore();
  const { content, setContent } = useBoardStore();
  const { resetBoard, boardImageFileList, setBoardImageFileList } =
    useBoardStore();

  const [cookies, setCookies] = useCookies();
  const { loginUser } = useLoginUserStore();

  const navigate = useNavigate();

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // 이벤트
  const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTitle(value);

    if (!titleRef.current) return;

    titleRef.current.style.height = `auto`;
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  };

  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);

    if (!contentRef.current) return;

    contentRef.current.style.height = `auto`;
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };

  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = imageUrls.map((item) => item);
    newImageUrls.push(imageUrl);
    setImageUrls(newImageUrls);

    const newBoardImageFileList = boardImageFileList.map((item) => item);
    newBoardImageFileList.push(file);
    setBoardImageFileList(newBoardImageFileList);

    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";
  };

  const onImageUploadButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  };

  const onImageCloseButtonClickHandler = (deleteIndex: number) => {
    if (!imageInputRef.current) return;
    imageInputRef.current.value = "";

    const newImageUrls = imageUrls.filter(
      (url, index) => index !== deleteIndex
    );
    setImageUrls(newImageUrls);

    const newBoardImageFileList = boardImageFileList.filter(
      (file, index) => index !== deleteIndex
    );
    setBoardImageFileList(newBoardImageFileList);
  };

  // 쿼리 응답
  const getBoardResponse = (
    responseBody: IGetBoardResponseDto | IResponseDto | null
  ) => {
    if (!responseBody) return;

    const { code } = responseBody;
    if (code === "NB") alert("존재하지 않는 게시물입니다.");
    if (code === "DBE") alert("데이터베이스 오류 입니다.");
    if (code !== "SU") {
      navigate(MAIN_PATH());
      return;
    }

    // const board: IBoard = { ...(responseBody as IGetBoardResponseDto) };
    // const board: IBoard = responseBody as IGetBoardResponseDto;
    const { title, content, boardImageList, writerEmail } =
      responseBody as IGetBoardResponseDto;
    // console.log(board.title);
    setTitle(title);
    setContent(content);
    setImageUrls(boardImageList);
    convertUrlsToFiles(boardImageList).then((boardImageFileList) =>
      setBoardImageFileList(boardImageFileList)
    );

    if (!loginUser || loginUser?.email !== writerEmail) {
      navigate(MAIN_PATH());
      return;
    }

    if (!contentRef.current) return;

    contentRef.current.style.height = `auto`;
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };

  // 이펙트
  useEffect(() => {
    const acceessToken = cookies.accessToken;
    if (!acceessToken) {
      navigate(MAIN_PATH());
      return;
    }

    if (!boardNumber) {
      navigate(MAIN_PATH());
      return;
    }

    getBoardRequest(boardNumber).then(getBoardResponse);
  }, [boardNumber]);

  return (
    <div id="board-update-wrapper">
      <div className="board-update-container">
        <div className="board-update-box">
          <div className="board-update-title-box">
            <textarea
              ref={titleRef}
              className="board-update-title-textarea"
              rows={1}
              placeholder="제목을 작성해주세요"
              value={title}
              onChange={onTitleChangeHandler}
            />
          </div>
          <div className="divider"></div>
          <div className="board-update-content-box">
            <textarea
              ref={contentRef}
              className="board-update-content-textarea"
              placeholder="본문을 작성해주세요"
              value={content}
              onChange={onContentChangeHandler}
            />
            <div
              className="icon-button"
              onClick={onImageUploadButtonClickHandler}
            >
              <div className="icon image-box-light-icon"></div>
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onImageChangeHandler}
            />
          </div>
          <div className="board-update-images-box">
            {imageUrls.map((imageUrl, index) => (
              <div key={index} className="board-update-image-box">
                <img
                  alt="board-update"
                  className="board-update-image"
                  src={imageUrl}
                />
                <div
                  className="icon-button image-cancel"
                  onClick={() => onImageCloseButtonClickHandler(index)}
                >
                  <div className="icon cancel-icon"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
