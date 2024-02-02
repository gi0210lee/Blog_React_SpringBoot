import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import "./style.css";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

interface Props {
  signIn: boolean;
}

export default function Authentication(props: Props) {
  // signIn : true
  const { signIn } = props;

  return (
    <div id="auth-wrapper">
      <div className="auth-container">
        <div className="auth-jumbotron-box">
          <div className="auth-jumbotron-contents">
            <div className="auth-logo-icon"></div>
            <div className="auth-jumbotron-text-box">
              <div className="auth-jumbotron-text">{`환영합니다.`}</div>
              <div className="auth-jumbotron-text">{`Hello World!`}</div>
            </div>
          </div>
        </div>
        {signIn ? <SignInCard /> : <SignUpCard />}
      </div>
    </div>
  );
}
