import React, { useEffect, useState } from "react";
import "./App.css";
import Authentication from "./views/Authentication";
import { Route, Router, Routes } from "react-router-dom";
import Main from "./views/Main";
import Search from "views/Search";
import User from "views/User";
import BoardDetail from "views/Board/Detail";
import BoardWrite from "views/Board/Write";
import BoardUpdate from "views/Board/Update";
import Container from "layouts/Container";
import { AUTH_SIGN_IN_PATH, AUTH_SIGN_UP_PATH, MAIN_PATH } from "constant";
import { AUTH_PATH } from "constant";
import { SEARCH_PATH } from "constant";
import { USER_PATH } from "constant";
import { BOARD_PATH } from "constant";
import { BOARD_DETAIL_PATH } from "constant";
import { BOARD_WRITE_PATH } from "constant";
import { BOARD_UPDATE_PATH } from "constant";
import { useCookies } from "react-cookie";
import { useLoginUserStore } from "stores";
import { GetSignInUserRequest } from "apis";
import { GetSignInUserResponseDto } from "apis/response/user";
import { ResponseDto } from "apis/response";
import { IUser } from "types/interface";

function App() {
  const { setLoginUser, resetLoginUser } = useLoginUserStore();
  const [cookie, setCookie] = useCookies();

  const GetSignInUserResponse = (
    responseBody: GetSignInUserResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;

    const { code } = responseBody;
    if (code === "AF" || code === "NU" || code === "DBE") {
      resetLoginUser();
      return;
    }

    const loginUser: IUser = { ...(responseBody as GetSignInUserResponseDto) };
    setLoginUser(loginUser);
  };

  // effect: accessToken cookie 값이 변경될 때 마다 실행할 함수
  useEffect(() => {
    if (!cookie.accessToken) {
      resetLoginUser();
      return;
    }

    GetSignInUserRequest(cookie.accessToken).then((response) =>
      GetSignInUserResponse(response)
    );
  }, [cookie.accessToken]);

  /**
   * 메인 /main
   * 로그인 회원가입 /auth
   * 검색화면 /search/:searchWord
   * 유저 페이지 /user/:userEmail
   * 게시물 상세보기 /board/:boardNumber
   * 게시물 작성하기 /board/write
   * 게시물 수정하기 /board/:boardNumber/update
   */
  return (
    <div className="App">
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route
            path={AUTH_PATH() + "/" + AUTH_SIGN_IN_PATH()}
            element={<Authentication signIn={true} />}
          />
          <Route
            path={AUTH_PATH() + "/" + AUTH_SIGN_UP_PATH()}
            element={<Authentication signIn={false} />}
          />
          <Route path={SEARCH_PATH(":searchWord")} element={<Search />} />
          <Route path={USER_PATH(":userEmail")} element={<User />} />
          <Route path={BOARD_PATH()}>
            {/* <Route index element={<Board />} /> */}
            <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
            <Route
              path={BOARD_DETAIL_PATH(":boardNumber")}
              element={<BoardDetail />}
            />
            <Route
              path={BOARD_UPDATE_PATH(":boardNumber")}
              element={<BoardUpdate />}
            />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
