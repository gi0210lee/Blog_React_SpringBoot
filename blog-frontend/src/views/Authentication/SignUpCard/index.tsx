import InputBox from "components/InputBox";
import "./style.css";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { error } from "console";
import { useNavigate } from "react-router-dom";
import { AUTH_PATH, AUTH_SIGN_IN_PATH, MAIN_PATH } from "constant";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";
import { SignInRequestDto, SignUpRequestDto } from "apis/request/auth";
import { signUpRequest } from "apis";
import { ResponseDto } from "apis/response";
import { SignUpResponseDto } from "apis/response/auth";

const SignUpCard = () => {
  // 네비게이트
  const navigate = useNavigate();

  // 다음 주소검색 팝업
  const open = useDaumPostcodePopup();

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setAddressError(false);
    setAddressErrorMessage("");
    if (!addressDetailRef.current) return;
    addressDetailRef.current.focus();
  };

  // sign up response 처리 함수
  const signUpResonse = (
    responseBody: SignUpResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) {
      alert("네트워크 이상입니다.");
      return;
    }
    const { code } = responseBody;
    console.log(code);
    if (code === "DE") {
      setEmailError(true);
      setEmailErrorMessage("중복되는 이메일 주소입니다.");
    }
    if (code === "DN") {
      setNicknameError(true);
      setNicknameErrorMessage("중복되는 닉네임입니다.");
    }
    if (code === "DT") {
      setTelNumberError(true);
      setTelNumberErrorMessage("중복되는 핸드폰 번호입니다.");
    }
    if (code === "VF") alert("모든 값을 입력하세요");
    if (code === "DBE") alert("데이터베이스 오류 입니다.");

    if (code !== "SU") return;

    navigate(MAIN_PATH());
  };

  // 요소 참조 상태
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordCheckRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const telNumberRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const addressDetailRef = useRef<HTMLInputElement | null>(null);

  // 상태
  const [page, setPage] = useState<1 | 2>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
  const [nicknameError, setNicknameError] = useState<boolean>(false);
  const [telNumberError, setTelNumberError] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<boolean>(false);
  const [addressDetailError, setAddressDetailError] = useState<boolean>(false);
  const [agreedPersonalError, setAgreedPersonalError] =
    useState<boolean>(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
    useState<string>("");

  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>("");
  const [telNumberErrorMessage, setTelNumberErrorMessage] =
    useState<string>("");
  const [addressErrorMessage, setAddressErrorMessage] = useState<string>("");
  const [addressDetailErrorMessage, setAddressDetailErrorMessage] =
    useState<string>("");
  const [agreedPersonalErrorMessage, setAgreedPersonalErrorMessage] =
    useState<string>("");

  const [nickname, setNickname] = useState<string>("");
  const [telNumber, setTelNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");
  const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);

  // 타입
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );
  const [passwordCheckType, setPasswordCheckType] = useState<
    "text" | "password"
  >("password");

  // 아이콘
  const [passowrdButtonIcon, setPassowrdButtonIcon] = useState<
    "visibility-off-icon" | "visibility-icon"
  >("visibility-off-icon");

  const [passowrdCheckButtonIcon, setPassowrdCheckButtonIcon] = useState<
    "visibility-off-icon" | "visibility-icon"
  >("visibility-off-icon");

  const addressButtonIcon = "search-icon";

  // 이벤트 핸들러
  const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(false);
    setEmailErrorMessage("");
  };
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordError(false);
    setPasswordErrorMessage("");
  };
  const onPasswordCheckChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setPasswordCheck(value);
    setPasswordCheckError(false);
    setPasswordCheckErrorMessage("");
  };

  const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickname(value);
    setNicknameError(false);
    setNicknameErrorMessage("");
  };
  const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTelNumber(value);
    setTelNumberError(false);
    setTelNumberErrorMessage("");
  };
  const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAddress(value);
    setAddressError(false);
    setAddressDetailErrorMessage("");
  };
  const onAddressDetailChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setAddressDetail(value);
    setAddressDetailError(false);
    setAddressDetailErrorMessage("");
  };

  const onPasswordButtonClickHandler = () => {
    if (passwordType === "text") {
      setPasswordType("password");
      setPassowrdButtonIcon("visibility-off-icon");
    } else {
      setPasswordType("text");
      setPassowrdButtonIcon("visibility-icon");
    }
  };
  const onPasswordCheckButtonClickHandler = () => {
    if (passwordCheckType === "text") {
      setPasswordCheckType("password");
      setPassowrdCheckButtonIcon("visibility-off-icon");
    } else {
      setPasswordCheckType("text");
      setPassowrdCheckButtonIcon("visibility-icon");
    }
  };

  const onAddressButtonClickHandler = () => {
    open({ onComplete: handleComplete });
  };

  const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (!passwordRef.current) return;

    passwordRef.current.focus();
  };
  const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (!passwordCheckRef.current) return;

    passwordCheckRef.current.focus();
  };

  const onPasswordCheckKeyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return;
    if (!passwordCheckRef.current) return;

    onNextButtonClickHandler();
  };

  const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (!telNumberRef.current) return;

    telNumberRef.current.focus();
  };

  const onTelNumberKeyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return;

    onAddressButtonClickHandler();
  };

  const onAddressKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (!addressDetailRef.current) return;

    addressDetailRef.current.focus();
  };
  const onAddressDetailKeyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return;

    onSignUpButtonClickHandler();
  };

  const onNextButtonClickHandler = () => {
    const emailPattern = /^[a-zA-z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const isEmailPattern = emailPattern.test(email);
    if (!email) {
      setEmailError(true);
      setEmailErrorMessage("이메일 주소 포맷이 맞지 않습니다.");
    }
    // const passwordPattern = /^$/;
    // const isPasswordPattern = passwordPattern.test(password);
    const isCheckedPassword = password.trim().length >= 8;
    if (!isCheckedPassword) {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호는 8자 이상 입력해주세요.");
    }

    const isEqualPassword = password === passwordCheck;
    if (!isEqualPassword) {
      setPasswordCheckError(true);
      setPasswordCheckErrorMessage("비밀번호를 다시 확인하세요.");
    }

    if (!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;

    setPage(2);
  };

  const onSignInButtonClickHandler = () => {
    navigate(AUTH_PATH() + "/" + AUTH_SIGN_IN_PATH());
  };

  const onSignUpButtonClickHandler = () => {
    const emailPattern = /^[a-zA-z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const isEmailPattern = emailPattern.test(email);
    if (!email) {
      setEmailError(true);
      setEmailErrorMessage("이메일 주소 포맷이 맞지 않습니다.");
    }
    // const passwordPattern = /^$/;
    // const isPasswordPattern = passwordPattern.test(password);
    const isCheckedPassword = password.trim().length >= 8;
    if (!isCheckedPassword) {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호는 8자 이상 입력해주세요.");
    }

    const isEqualPassword = password === passwordCheck;
    if (!isEqualPassword) {
      setPasswordCheckError(true);
      setPasswordCheckErrorMessage("비밀번호를 다시 확인하세요.");
    }

    if (!isEmailPattern || !isCheckedPassword || !isEqualPassword) {
      setPage(1);
      return;
    }

    const hasNickname = nickname.trim().length !== 0;
    if (!hasNickname) {
      setNicknameError(true);
      setNicknameErrorMessage("닉네임을 입력해주세요");
    }

    const telNumberPattern = /^[0-9]{11,13}$/;
    const isTelNumberPattern = telNumberPattern.test(telNumber);
    if (!isTelNumberPattern) {
      setTelNumberError(true);
      setTelNumberErrorMessage("숫자만 입력해주세요");
    }

    const hasAddress = address.trim().length > 0;
    if (!hasAddress) {
      setAddressError(true);
      setAddressErrorMessage("주소를 입력해주세요");
    }

    if (!agreedPersonal) {
      setAgreedPersonalError(true);
      setAgreedPersonalErrorMessage("개인정보에 동의해주세요");
    }

    if (!hasNickname || !isTelNumberPattern || !agreedPersonal) return;

    const requestBody: SignUpRequestDto = {
      email,
      password,
      nickname,
      telNumber,
      address,
      addressDetail,
      agreedPersonal,
    };

    signUpRequest(requestBody)
      .then(signUpResonse)
      .catch((error) => {});
  };

  const onAgreedPersonalClickHandler = () => {
    setAgreedPersonal(!agreedPersonal);
    setAgreedPersonalError(false);
  };

  useEffect(() => {
    if (page === 2) {
      if (!nicknameRef.current) return;

      nicknameRef.current.focus();
    }
  }, [page]);

  return (
    <div className="auth-sign-up-card">
      <div className="auth-sign-up-card-box">
        <div className="auth-sign-up-card-top">
          <div className="auth-sign-up-card-title-box">
            <div className="auth-sign-up-card-title">{`회원가입`}</div>
            <div className="auth-sign-up-card-page-1">{`${page}/2`}</div>
          </div>
          {page === 1 && (
            <>
              <InputBox
                ref={emailRef}
                label="이메일 주소*"
                type="text"
                placeholder="이메일 주소를 입력해주세요"
                error={emailError}
                message={emailErrorMessage}
                value={email}
                onChange={onEmailChangeHandler}
                onKeyDown={onEmailKeyDownHandler}
              />
              <InputBox
                ref={passwordRef}
                label="비밀번호*"
                type={passwordType}
                placeholder="비밀번호를 입력해주세요"
                error={passwordError}
                message={passwordErrorMessage}
                value={password}
                onChange={onPasswordChangeHandler}
                icon={passowrdButtonIcon}
                onButtonClick={onPasswordButtonClickHandler}
                onKeyDown={onPasswordKeyDownHandler}
              />
              <InputBox
                ref={passwordCheckRef}
                label="비밀번호 확인*"
                type={passwordCheckType}
                placeholder="비밀번호를 다시 입력해주세요"
                error={passwordCheckError}
                message={passwordCheckErrorMessage}
                value={passwordCheck}
                onChange={onPasswordCheckChangeHandler}
                icon={passowrdCheckButtonIcon}
                onButtonClick={onPasswordCheckButtonClickHandler}
                onKeyDown={onPasswordCheckKeyDownHandler}
              />
            </>
          )}
          {page === 2 && (
            <>
              <InputBox
                ref={nicknameRef}
                label="닉네임*"
                type={"text"}
                placeholder="닉네임을 입력해주세요"
                error={nicknameError}
                message={nicknameErrorMessage}
                value={nickname}
                onChange={onNicknameChangeHandler}
                onKeyDown={onNicknameKeyDownHandler}
              />
              <InputBox
                ref={telNumberRef}
                label="핸드폰번호*"
                type={"text"}
                placeholder="핸드폰번호를 입력해주세요"
                error={telNumberError}
                message={telNumberErrorMessage}
                value={telNumber}
                onChange={onTelNumberChangeHandler}
                onKeyDown={onTelNumberKeyDownHandler}
              />
              <InputBox
                ref={addressRef}
                label="주소"
                type={"text"}
                placeholder="주소를 입력해주세요"
                error={addressError}
                message={addressErrorMessage}
                value={address}
                onChange={onAddressChangeHandler}
                icon={addressButtonIcon}
                onButtonClick={onAddressButtonClickHandler}
                onKeyDown={onAddressKeyDownHandler}
              />
              <InputBox
                ref={addressDetailRef}
                label="상세 주소"
                type={"text"}
                placeholder="상세주소를 입력해주세요"
                error={addressDetailError}
                message={addressDetailErrorMessage}
                value={addressDetail}
                onChange={onAddressDetailChangeHandler}
                onKeyDown={onAddressDetailKeyDownHandler}
              />
            </>
          )}
        </div>
        <div className="auth-sign-up-card-bottom">
          {page === 1 && (
            <>
              <div
                className="black-large-full-button"
                onClick={onNextButtonClickHandler}
              >{`다음 단계`}</div>
            </>
          )}
          {page === 2 && (
            <>
              <div className="auth-sign-up-content-box">
                <div
                  className="auth-sign-up-check-box"
                  onClick={onAgreedPersonalClickHandler}
                >
                  <div
                    className={`icon
                      ${agreedPersonal ? "check-circle-icon" : "circle-icon"}
                    `}
                  ></div>
                </div>
                <div
                  className={
                    agreedPersonalError
                      ? "auth-sign-up-content-error"
                      : "auth-sign-up-content-title"
                  }
                >{`개인정보동의`}</div>
                <div className="auth-sign-up-content-link">{`더보기 >`}</div>
              </div>
              <div
                className="black-large-full-button"
                onClick={onSignUpButtonClickHandler}
              >{`회원가입`}</div>
            </>
          )}
          <div className="auth-sign-up-description-box">
            <div className="auth-sign-up-description">
              {`이미 계정이신가요? `}
              <span
                className="auth-sign-up-description-link"
                onClick={onSignInButtonClickHandler}
              >{` 로그인`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
