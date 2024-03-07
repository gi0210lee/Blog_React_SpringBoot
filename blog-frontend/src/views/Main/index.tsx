import React, { useEffect, useState } from "react";
import "./style.css";
import Top3Item from "components/Top3Item";
import { IBoard, IBoardListItem } from "types/interface";
import { currentBoardListMock, top3BoardListMock } from "mocks";
import BoardItem from "components/BoardItem";
import { idText } from "typescript";
import Pagination from "components/Pagination";
import { useNavigate } from "react-router-dom";
import { SEARCH_PATH } from "constant";

export default function Main() {
  // 상태
  const navigate = useNavigate();

  // 메인 상단 컴포넌트
  const MainTop = () => {
    // 상태
    const [top3List, setTop3List] = useState<IBoardListItem[]>([]);

    // 이펙트
    useEffect(() => {
      setTop3List(top3BoardListMock);
    }, []);
    return (
      <div id="main-top-wrapper">
        <div className="main-top-container">
          <div className="main-top-title">
            {"Board Intro 뭐가 있나 찾아보자 1, 2, 3 Start"}
          </div>
          <div className="main-top-contents-box">
            <div className="main-top-contents-title">{"주간 Top 3 게시글"}</div>
            <div className="main-top-contents">
              {top3List.map((item, index) => (
                <Top3Item key={index} top3Item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 메인 하단 컴포넌트
  const MainBottom = () => {
    // 상태
    const [currentBoardList, setCurrentBoardList] = useState<IBoardListItem[]>(
      []
    );
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    // 이벤트
    const onClickPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    };

    // 이펙트
    useEffect(() => {
      setCurrentBoardList(currentBoardListMock);
      setPopularWordList([
        "hi",
        "hello",
        "world",
        "도",
        "레",
        "미",
        "파",
        "솔",
        "라",
        "시",
        "도",
      ]);
    }, []);

    return (
      <div id="main-bottom-wrapper">
        <div className="main-bottom-container">
          <div className="main-bottom-title">{"최신 게시물"}</div>
          <div className="main-bottom-contents-box">
            <div className="main-bottom-current-contents">
              {currentBoardList.map((item, index) => (
                <BoardItem key={index} boardItem={item} />
              ))}
            </div>
            <div className="main-bottom-popular-box">
              <div className="main-bottom-popular-card">
                <div className="main-bottom-popular-card-container">
                  <div className="main-bottom-popular-card-title">
                    {"인기 검색어"}
                  </div>
                  <div className="main-bottom-popular-card-contents">
                    {popularWordList.map((word, index) => (
                      <div
                        key={index}
                        className="word-badge"
                        onClick={() => onClickPopularWordClickHandler(word)}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-bottom-pagination-box">
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <MainTop />
      <MainBottom />
    </>
  );
}
