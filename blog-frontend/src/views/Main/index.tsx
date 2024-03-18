import React, { useEffect, useState } from "react";
import "./style.css";
import Top3Item from "components/Top3Item";
import { IBoardListItem } from "types/interface";
import BoardItem from "components/BoardItem";
import { useNavigate } from "react-router-dom";
import { SEARCH_PATH } from "constant";
import {
  getLatestBoardListRequest,
  getPopularListRequest,
  getTop3BoardListRequest,
} from "apis";
import { GetTop3BoardListResponseDto } from "apis/response/board";
import { ResponseDto } from "apis/response";
import { usePagination } from "hooks";
import GetLatestBoardListResponseDto from "apis/response/board/get-latest-board-list.response.dto";
import Pagination from "components/Pagination";
import { GetPopularListResponseDto } from "apis/response/search";

export default function Main() {
  // 상태
  const navigate = useNavigate();

  // 메인 상단 컴포넌트
  const MainTop = () => {
    // 상태
    const [top3BoardList, setTop3BoardList] = useState<IBoardListItem[]>([]);

    // 쿼리 응답
    const getTop3BoardListResponse = (
      responseBody: GetTop3BoardListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code == "DBE") alert("데이터베이스 오류입니다.");
      if (code != "SU") return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    };

    // 이펙트
    useEffect(() => {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
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
              {top3BoardList.map((item, index) => (
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
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    // 이벤트
    const onClickPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    };

    // 쿼리 응답
    const getLatestBoardListResponse = (
      responseBody: GetLatestBoardListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { latestList } = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
    };

    const getPopularListResponse = (
      responseBody: GetPopularListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { popularWordList } = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList);
    };

    // 이펙트
    useEffect(() => {
      getLatestBoardListRequest().then(getLatestBoardListResponse);
      getPopularListRequest().then(getPopularListResponse);
    }, []);

    return (
      <div id="main-bottom-wrapper">
        <div className="main-bottom-container">
          <div className="main-bottom-title">{"최신 게시물"}</div>
          <div className="main-bottom-contents-box">
            <div className="main-bottom-current-contents">
              {viewList.map((item, index) => (
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
            <Pagination
              currentPage={currentPage}
              currentSection={currentSection}
              setCurrentPage={setCurrentPage}
              setCurrentSection={setCurrentSection}
              viewPageList={viewPageList}
              totalSection={totalSection}
            />
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
