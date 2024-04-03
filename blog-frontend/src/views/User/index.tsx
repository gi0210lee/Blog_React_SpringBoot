import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import defaultProfileImage from "assets/image/default-profile-image.png";
import { useNavigate, useParams } from "react-router-dom";
import { IBoardListItem, IUser } from "types/interface";
import { latestBoardListMock } from "mocks";
import BoardItem from "components/BoardItem";
import { BOARD_PATH, BOARD_WRITE_PATH, USER_PATH } from "constant";
import { useLoginUserStore } from "stores";

export default function UserPage() {
  const { userEmail } = useParams();
  // state
  const [isMyPage, setIsMyPage] = useState<Boolean>(false);

  // store
  const { loginUser } = useLoginUserStore();
  // nav
  const navigate = useNavigate();

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
      setChangeNickname(nickname);
      setIsChangeNickname(!isChangeNickname);
    };

    const onProfileImageChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      if (!event.target.files || !event.target.files?.length) return;

      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
    };

    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setChangeNickname(value);
    };

    // Ref
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    // effect
    useEffect(() => {
      if (!userEmail) return;

      setNickname("닉네임이야");
      setProfileImage(
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYL_f9yTxF25vF2VDvCT-giuxBej3FGFMXHsQpcUWmo58xSMM5Y6wiMliGE3yE3YE7bmCAj0JLpVdR4y2xGh3iyTEnBkcSE9gb9-d_1085Yd30zBsac6hSoji8nwbk4DE7m0E0b3Bhm_sa/s400/company_character1_baby.png"
      );
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

    // event
    const onSideCardClickHandler = () => {
      if (isMyPage) navigate(BOARD_PATH() + "/" + BOARD_WRITE_PATH());
      else if (loginUser) navigate(USER_PATH(loginUser.email));
    };

    // effect
    useEffect(() => {
      setCount(latestBoardListMock.length);
      setUserBoardList(latestBoardListMock);
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
                {userBoardList.map((boardListItem, index) => (
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
          <div className="user-bottom-pagination-box"></div>
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
