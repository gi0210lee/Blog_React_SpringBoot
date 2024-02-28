import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AUTH_PATH,
  AUTH_SIGN_IN_PATH,
  BOARD_DETAIL_PATH,
  BOARD_PATH,
  BOARD_UPDATE_PATH,
  BOARD_WRITE_PATH,
  MAIN_PATH,
  SEARCH_PATH,
  USER_PATH,
} from "constant";
import { useCookies } from "react-cookie";
import { useBoardStore, useLoginUserStore } from "stores";
import { fileUploadRequest, patchBoardRequest, postBoardRequest } from "apis";
import { PatchBoardRequestDto, PostBoardRequestDto } from "apis/request/board";
import {
  PatchBoardResponseDto,
  PostBoardResponseDto,
} from "apis/response/board";
import { ResponseDto } from "apis/response";

export default function Header() {
  // 로그인 유저 상태
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
  // path 상태
  const { pathname } = useLocation();
  const { boardNumber } = useParams();
  // 쿠키 상태
  const [cookies, setCookies] = useCookies();
  // 로그인 상태
  const [isLogin, setIsLogin] = useState<Boolean>(false);

  const isAuthPage = pathname.startsWith(AUTH_PATH());
  const isMainPage = pathname.startsWith(MAIN_PATH());
  const isSearchPage = pathname.startsWith(SEARCH_PATH(""));
  const isBoardDetailPage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_DETAIL_PATH("")
  );
  const isBoardWritePage = pathname.startsWith(
    BOARD_PATH() + "/" + BOARD_WRITE_PATH()
  );
  const isBoardUpdatePage =
    pathname.includes(BOARD_PATH()) && pathname.includes(BOARD_UPDATE_PATH(""));
  const isUserPage = pathname.startsWith(USER_PATH(""));

  // 네이게이트
  const navigate = useNavigate();

  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  };

  const SearchButton = () => {
    const [status, setStatus] = useState<Boolean>(false);
    const [word, setWord] = useState<string>("");
    const searchButtonRef = useRef<HTMLInputElement | null>(null);
    const { searchWord } = useParams<string>();

    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    }, [searchWord]);

    const onSearchButtonClickHandler = () => {
      if (!status) {
        setStatus(!status);
        return;
      } else {
        navigate(SEARCH_PATH(word));
      }
    };

    const onSearchWordKeyDownHandler = (event: React.KeyboardEvent) => {
      if (event.key !== "Enter") return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };

    const onSearchWordChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value;
      setWord(value);
    };

    if (!status) {
      return (
        <div className="icon-button" onClick={onSearchButtonClickHandler}>
          <div className="icon search-icon"></div>
        </div>
      );
    } else {
      return (
        <div className="header-search-input-box">
          <input
            className="header-search-input"
            type="text"
            placeholder="검색어를 입력해주세요"
            value={word}
            onChange={onSearchWordChangeHandler}
            onKeyDown={onSearchWordKeyDownHandler}
          />
          <div
            ref={searchButtonRef}
            className="icon-button"
            onClick={onSearchButtonClickHandler}
          >
            <div className="icon search-icon"></div>
          </div>
        </div>
      );
    }
  };

  // 마이페이지 버튼 컴포넌트
  const MyPageButton = () => {
    const { userEmail } = useParams();

    const onMyPageButtonClickHandler = () => {
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    };
    const onSignOutButtonClickHandler = () => {
      resetLoginUser();
      setCookies("accessToken", "", { path: MAIN_PATH(), expires: new Date() });
      navigate(MAIN_PATH());
    };
    const onSignInButtonClickHandler = () => {
      navigate(AUTH_PATH() + "/" + AUTH_SIGN_IN_PATH());
    };

    if (isLogin && userEmail === loginUser?.email) {
      return (
        <div
          className="white-button"
          onClick={onSignOutButtonClickHandler}
        >{`로그아웃`}</div>
      );
    }
    if (isLogin) {
      return (
        <div
          className="white-button"
          onClick={onMyPageButtonClickHandler}
        >{`마이페이지`}</div>
      );
    } else {
      return (
        <div
          className="black-button"
          onClick={onSignInButtonClickHandler}
        >{`로그인`}</div>
      );
    }
  };

  // 업로드 버튼 컴포넌트
  const UploadButton = () => {
    // 상태
    const { boardNumber } = useParams();
    const { title, content, boardImageFileList, resetBoard } = useBoardStore();

    // 쿼리 응답
    const postBoardResponse = (
      responseBody: PostBoardResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;

      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code === "AF" || code === "NU") navigate(AUTH_PATH());
      if (code === "VF") alert("제목과 내용은 필수입니다.");
      if (code !== "SU") return;

      resetBoard();
      if (!loginUser) return;

      const { email } = loginUser;
      navigate(USER_PATH(email));
    };

    const patchBoardResponse = (
      responseBody: PatchBoardResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;

      const { code } = responseBody;
      if (code === "DBE") alert("데PatchBoardRequestDto이터베이스 오류입니다.");
      if (code === "AF" || code === "NU" || code === "NB" || code === "NP")
        navigate(AUTH_PATH());
      if (code === "VF") alert("제목과 내용은 필수입니다.");
      if (code !== "SU") return;

      if (!boardNumber) return;
      navigate(BOARD_PATH() + "/" + BOARD_DETAIL_PATH(boardNumber));
    };

    // 이벤트
    const onUploadButtonClickHandler = async () => {
      const accessToken = cookies.accessToken;
      if (!accessToken) return;

      const boardImageList: string[] = [];
      for (const file of boardImageFileList) {
        const data = new FormData();
        data.append("file", file);

        const url = await fileUploadRequest(data, accessToken);
        if (url) boardImageList.push(url);
      }

      const isWriterPage = pathname === BOARD_PATH() + "/" + BOARD_WRITE_PATH();
      if (isWriterPage) {
        const requestBody: PostBoardRequestDto = {
          title,
          content,
          boardImageList,
        };
        postBoardRequest(requestBody, accessToken)
          .then((response) => {
            postBoardResponse(response);
          })
          .catch((error) => {});

        // navigate(AUTH_PATH());
      } else {
        if (!boardNumber) return;

        const requestBody: PatchBoardRequestDto = {
          title,
          content,
          boardImageList,
        };
        patchBoardRequest(boardNumber, requestBody, accessToken).then(
          patchBoardResponse
        );
      }
    };

    if (title && content) {
      return (
        // 업로드 버튼
        <div
          className="black-button"
          onClick={onUploadButtonClickHandler}
        >{`업로드`}</div>
      );
    } else {
      return (
        // 업로드 불가 버튼
        <div
          className="disable-button"
          onClick={onUploadButtonClickHandler}
        >{`업로드`}</div>
      );
    }
  };

  // 이펙트
  useEffect(() => {
    setIsLogin(loginUser !== null);
  }, [loginUser]);

  return (
    <div id="header">
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClickHandler}>
          <div className="icon-box">
            <div className="icon logo-dark-icon"></div>
          </div>
          <div className="header-logo">{`Board`}</div>
        </div>
        <div className="header-right-box">
          {(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && (
            <SearchButton />
          )}
          {(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && (
            <MyPageButton />
          )}
          {(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
        </div>
      </div>
    </div>
  );
}
