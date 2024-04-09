import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import defaultProfileImage from "assets/image/default-profile-image.png";
import { useNavigate, useParams } from "react-router-dom";
import { IBoardListItem, IUser } from "types/interface";
import { latestBoardListMock } from "mocks";
import BoardItem from "components/BoardItem";
import { BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH } from "constant";
import { useLoginUserStore } from "stores";
import {
  fileUploadRequest,
  getUserBoardListRequest,
  getUserRequest,
  patchNicknameRequest,
  patchProfileImageRequest,
} from "apis";
import {
  IGetUserResponseDto,
  IPatchNicknameResponseDto,
  IPatchProfileImageResponseDto,
} from "apis/response/user";
import { IResponseDto } from "apis/response";
import { Cookies, useCookies } from "react-cookie";
import {
  IPatchNicknameRequestDto,
  IPatchProfileImageRequestDto,
} from "apis/request/user";
import { usePagination } from "hooks";
import { IGetUserBoardListResponseDto } from "apis/response/board";
import Pagination from "components/Pagination";

export default function UserPage() {
  // param
  const { userEmail } = useParams();
  // state
  const [isMyPage, setIsMyPage] = useState<Boolean>(false);
  // store
  const { loginUser } = useLoginUserStore();
  // nav
  const navigate = useNavigate();
  // cookie
  const [cookies, setCookies] = useCookies();

  // 상단 컴포넌트
  const UserTop = () => {
    // state
    const [isChangeNickname, setIsChangeNickname] = useState<Boolean>(false);
    const [nickname, setNickname] = useState<string>("");
    const [changeNickname, setChangeNickname] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // event
    const onProfileBoxClickHandler = () => {
      if (!isMyPage) return;
      if (!imageInputRef.current) return;

      imageInputRef.current.click();
    };

    const onNicknameEditButtonClickHandler = () => {
      if (!isChangeNickname) {
        setChangeNickname(nickname);
        setIsChangeNickname(!isChangeNickname);
        return;
      }

      if (!cookies.accessToken) return;

      const requestBody: IPatchNicknameRequestDto = {
        nickname: changeNickname,
      };

      patchNicknameRequest(requestBody, cookies.accessToken).then(
        patchNicknameResponse
      );
    };

    const onProfileImageChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      if (!event.target.files || !event.target.files?.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);

      fileUploadRequest(data).then(fileUploadResponse);
    };

    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setChangeNickname(value);
    };

    // Ref
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    // response
    const getUserResponse = (
      responseBody: IGetUserResponseDto | IResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "NU") alert("존재하지 않는 유저입니다.");
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") {
        navigate(MAIN_PATH());
        return;
      }

      const { email, nickname, profileImage } =
        responseBody as IGetUserResponseDto;
      setNickname(nickname);
      setProfileImage(profileImage);

      const isMyPage = email === loginUser?.email;
      setIsMyPage(isMyPage);
    };

    const fileUploadResponse = (profileImage: string | null) => {
      if (!profileImage) return;

      const requestBody: IPatchProfileImageRequestDto = { profileImage };
      patchProfileImageRequest(requestBody, cookies.accessToken).then(
        patchProfileImageResponse
      );
    };

    const patchProfileImageResponse = (
      responseBody: IPatchProfileImageResponseDto | IResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "AF") alert("인증에 실패했습니다.");
      if (code === "NU") alert("존재하지 않는 유저입니다.");
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      if (!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
    };

    const patchNicknameResponse = (
      responseBody: IPatchNicknameResponseDto | IResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "VF") alert("잘못된 접근입니다.");
      if (code === "AF") alert("인증에 실패했습니다.");
      if (code === "DN") alert("중복되는 닉네임입니다.");
      if (code === "NU") alert("존재하지 않는 유저입니다.");
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      if (!userEmail) return;
      getUserRequest(userEmail).then(getUserResponse);
      setIsChangeNickname(false);
    };

    // effect
    useEffect(() => {
      if (!userEmail) return;

      getUserRequest(userEmail).then(getUserResponse);
    }, [userEmail]);

    return (
      <div id="user-top-wrapper">
        <div className="user-top-contianer">
          {isMyPage ? (
            <div
              className="user-top-my-profile-image-box"
              onClick={onProfileBoxClickHandler}
            >
              {profileImage !== null ? (
                <div
                  className="user-top-profile-image"
                  style={{
                    backgroundImage: `url(${
                      profileImage ? profileImage : defaultProfileImage
                    })`,
                  }}
                ></div>
              ) : (
                <div className="user-top-my-profile-image-nothing-box">
                  <div className="icon-box-large">
                    <div className="icon image-box-white-icon"></div>
                  </div>
                </div>
              )}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onProfileImageChangeHandler}
              />
            </div>
          ) : (
            <div
              className="user-top-profile-image-box"
              style={{
                backgroundImage: `url(${
                  profileImage ? profileImage : defaultProfileImage
                })`,
              }}
            ></div>
          )}
          <div className="user-top-info-box">
            <div className="user-top-info-nickname-box">
              {isMyPage ? (
                <>
                  {isChangeNickname ? (
                    <input
                      className="user-top-info-nickname-input"
                      type="text"
                      size={changeNickname.length * 2}
                      value={changeNickname}
                      onChange={onNicknameChangeHandler}
                    />
                  ) : (
                    <div className="user-top-info-nickname">{nickname}</div>
                  )}

                  <div
                    className="icon-button"
                    onClick={onNicknameEditButtonClickHandler}
                  >
                    <div className="icon edit-icon"></div>
                  </div>
                </>
              ) : (
                <div className="user-top-info-nickname">{nickname}</div>
              )}
            </div>
            <div className="user-top-info-email">{userEmail}</div>
          </div>
        </div>
      </div>
    );
  };

  // 하단 컴포넌트
  const UserBottom = () => {
    // state
    const [count, setCount] = useState<number>(0);
    const [userBoardList, setUserBoardList] = useState<IBoardListItem[]>([]);
    const {
      currentPage,
      setCurrentPage,
      currentSection,
      setCurrentSection,
      viewList,
      viewPageList,
      totalSection,
      setTotalList,
    } = usePagination<IBoardListItem>(5);

    // event
    const onSideCardClickHandler = () => {
      if (isMyPage) navigate(BOARD_PATH() + "/" + BOARD_WRITE_PATH());
      else if (loginUser) navigate(USER_PATH(loginUser.email));
    };

    // response
    const getUserBoardListResponse = (
      responseBody: IGetUserBoardListResponseDto | IResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "NU") {
        alert("존재하지 않는 유저입니다.");
        navigate(MAIN_PATH());
        return;
      }
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { userBoardList } = responseBody as IGetUserBoardListResponseDto;
      setTotalList(userBoardList);
      setCount(userBoardList.length);
    };

    // effect
    useEffect(() => {
      if (!userEmail) return;
      getUserBoardListRequest(userEmail).then(getUserBoardListResponse);
    }, [userEmail]);

    return (
      <div id="user-bottom-wrapper">
        <div className="user-bottom-container">
          <div className="user-bottom-title">
            {isMyPage ? "내 게시물 " : "게시물 "}
            <span className="emphasis">{count}</span>
          </div>
          <div className="user-bottom-content-box">
            {count === 0 ? (
              <div className="user-bottom-content-nothing">
                {"게시물이 없습니다."}
              </div>
            ) : (
              <div className="user-bottom-content">
                {viewList.map((boardListItem, index) => (
                  <BoardItem key={index} boardItem={boardListItem} />
                ))}
              </div>
            )}
            <div className="user-bottom-side-box">
              <div
                className="user-bottom-side-card"
                onClick={onSideCardClickHandler}
              >
                <div className="user-bottom-side-container">
                  {isMyPage ? (
                    <>
                      <div className="icon-box">
                        <div className="icon edit-icon"></div>
                      </div>
                      <div className="user-bottom-side-text">{"글쓰기"}</div>
                    </>
                  ) : (
                    <>
                      <div className="user-bottom-side-text">
                        {"내 게시물로 가기"}
                      </div>
                      <div className="icon-box">
                        <div className="icon expand-right-icon"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="user-bottom-pagination-box">
            {count !== 0 && (
              <Pagination
                currentPage={currentPage}
                currentSection={currentSection}
                setCurrentPage={setCurrentPage}
                setCurrentSection={setCurrentSection}
                viewPageList={viewPageList}
                totalSection={totalSection}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <UserTop />
      <UserBottom />
    </>
  );
}
