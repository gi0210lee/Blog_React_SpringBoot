import React from "react";
import "./style.css";

export default function Footer() {
  const onInstaIconButtonClickHandler = () => {
    window.open("https://www.instagram.com");
  };

  const onNaverBlogIconButtonClickHandler = () => {
    window.open("https://blog.naver.com");
  };

  return (
    <div id="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-box">
            <div className="icon-box">
              <div className="icon logo-light-icon"></div>
            </div>
            <div className="footer-logo-text">{`Board`}</div>
          </div>
          <div className="footer-link-box">
            <div className="footer-email-link">{`test@test.com`}</div>
            <div className="icon-button">
              <div
                className="icon insta-icon"
                onClick={onInstaIconButtonClickHandler}
              ></div>
            </div>
            <div className="icon-button">
              <div
                className="icon naver-blog-icon"
                onClick={onNaverBlogIconButtonClickHandler}
              ></div>
            </div>
          </div>
        </div>
        <div className="fotter-bottom">
          <div className="fotter-copyright">{`copyright@ 카피라이트 카피라이트`}</div>
        </div>
      </div>
    </div>
  );
}
