import { signInRequest } from "apis";
import { SignInRequestDto } from "apis/request/auth";
import { ResponseDto } from "apis/response";
import { SignInResponseDto } from "apis/response/auth";
import InputBox from "components/InputBox";
import { AUTH_PATH, AUTH_SIGN_UP_PATH, MAIN_PATH } from "constant";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SignInCard = () => {
  // 쿠키 상태
  const [cookies, setCookies] = useCookies();
  // 네비게이트
  const navigate = useNavigate();

  // 이메일, 패스워드 요소 참조상태
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  // 이메일, 패스워드, 패스워드 타입, 패스워드 버튼상태. 에러상태,  상태
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [passowrdButtonIcon, setPasswordButtonIcon] = useState<
    "visibility-off-icon" | "visibility-icon" | "logo-light-icon"
  >("visibility-off-icon");
  const [error, setError] = useState<boolean>(false);

  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    const { value } = event.target;
    setEmail(value);
  };

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    const { value } = event.target;
    setPassword(value);
  };

  // signInRequest 결과
  const signInResponse = (
    responseBody: SignInResponseDto | ResponseDto | null
  ) => {
    if (responseBody === null) {
      alert("네트워크 이상입니다.");
      return;
    }

    const { code } = responseBody;
    if (code === "DBE") alert("데이터 베이스 오류입니다.");
    if (code === "LF" || code === "VF") setError(true);
    if (code !== "SU") return;

    const { token, expirationTime } = responseBody as SignInResponseDto;
    const now = new Date().getTime();
    const expires = new Date(now + expirationTime * 1000);

    setCookies("accessToken", token, { expires, path: MAIN_PATH() });
    navigate(MAIN_PATH());
  };

  // 로그인 버튼 이벤트
  const onSignInButtonClickHandler = () => {
    const requestBody: SignInRequestDto = { email, password };
    signInRequest(requestBody).then((response) => signInResponse(response));
  };

  const onSignUpButtonClickHandler = () => {
    navigate(AUTH_PATH() + "/" + AUTH_SIGN_UP_PATH());
  };

  // 패스워드 버튼 클릭 이벤트 처리 함수
  const onPasswordButtonClickHandler = () => {
    if (passwordType === "text") {
      setPasswordType("password");
      setPasswordButtonIcon("visibility-off-icon");
    } else {
      setPasswordType("text");
      setPasswordButtonIcon("visibility-icon");
    }
  };

  // 이메일 인풋 이벤트
  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (!passwordRef.current) return;

    passwordRef.current.focus();
  };

  const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    onSignInButtonClickHandler();
  };

  return (
    <div className="auth-sign-in-card">
      <div className="auth-sign-in-card-box">
        <div className="auth-sign-in-card-top">
          <div className="auth-sign-in-card-title-box">
            <div className="auth-sign-in-card-title">{`로그인`}</div>
          </div>
          <InputBox
            ref={emailRef}
            label="이메일 주소"
            type="text"
            placeholder="이메일 주소를 입력해주세요"
            error={error}
            value={email}
            onChange={onEmailChangeHandler}
            onKeyDown={onEmailKeyDownHandler}
          />
          <InputBox
            ref={passwordRef}
            label="비밀번호"
            type={passwordType}
            placeholder="비밀번호를 입력해주세요"
            error={error}
            value={password}
            onChange={onPasswordChangeHandler}
            icon={passowrdButtonIcon}
            onButtonClick={onPasswordButtonClickHandler}
            onKeyDown={onPasswordKeyDownHandler}
          />
        </div>
        <div className="auth-sign-in-card-bottom">
          {error && (
            <div className="auth-sign-in-error-box">
              <div className="auth-sign-in-error-message">
                {`이메일 주소 또는 비밀번호를 잘 못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.`}
              </div>
            </div>
          )}
          <div
            className="black-large-full-button"
            onClick={onSignInButtonClickHandler}
          >{`로그인`}</div>
          <div className="auth-sign-in-description-box">
            <div className="auth-sign-in-description">
              {`신규 사용자이신가요? `}
              <span
                className="auth-sign-in-description-link"
                onClick={onSignUpButtonClickHandler}
              >{` 회원가입`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInCard;
