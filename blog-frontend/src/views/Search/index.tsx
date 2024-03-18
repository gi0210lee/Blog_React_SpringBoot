import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { IBoardListItem } from "types/interface";
import { latestBoardListMock } from "mocks";
import BoardItem from "components/BoardItem";
import { SEARCH_PATH } from "constant";
import { getRelationListRequest, getSearchBoardListRequest } from "apis";
import { GetSearchBoardListResponseDto } from "apis/response/board";
import { ResponseDto } from "apis/response";
import { usePagination } from "hooks";
import Pagination from "components/Pagination";
import { GetRelationListResponseDto } from "apis/response/search";

export default function Search() {
  // 파라미터
  const { searchWord } = useParams();

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
  const [preSearchWord, setPreSearchWord] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const [relativeWordList, setRelativeWordList] = useState<string[]>([]);
  const navigate = useNavigate();

  // 이벤트
  const onRelationWordClickHandler = (word: string) => {
    navigate(SEARCH_PATH(word));
  };

  // 쿼리 응답
  const getSearchBoardListResponse = (
    responseBody: GetSearchBoardListResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류 입니다.");
    if (code !== "SU") return;

    if (!searchWord) return;

    const { searchList } = responseBody as GetSearchBoardListResponseDto;
    setTotalList(searchList);
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  };
  const getRelationListResponse = (
    responseBody: GetRelationListResponseDto | ResponseDto | null
  ) => {
    if (!responseBody) return;

    const { code } = responseBody;
    if (code === "DBE") alert("데이터베이스 오류 입니다.");
    if (code !== "SU") return;

    if (!searchWord) return;

    const { relativeWordList } = responseBody as GetRelationListResponseDto;
    setRelativeWordList(relativeWordList);
  };

  // 이펙트
  useEffect(() => {
    if (!searchWord) return;

    getSearchBoardListRequest(searchWord, preSearchWord).then(
      getSearchBoardListResponse
    );
    getRelationListRequest(searchWord).then(getRelationListResponse);
  }, [searchWord]);

  if (!searchWord) return <></>;

  return (
    <div id="search-wrapper">
      <div className="search-container">
        <div className="search-title-box">
          <div className="search-title">
            <span className="search-title-emphasis">{searchWord}</span>
            {` 에 대한 검색결과`}
          </div>
          <div className="search-count">{count}</div>
        </div>
        <div className="search-contents-box">
          {count === 0 ? (
            <div className="search-contents-nothing">
              {"검색 결과가 없습니다."}
            </div>
          ) : (
            <div className="search-contents">
              {viewList.map((boardListItem, index) => (
                <BoardItem key={index} boardItem={boardListItem} />
              ))}
            </div>
          )}
          <div className="search-relation-box">
            <div className="search-relation-card">
              <div className="search-relation-card-container">
                <div className="search-relation-card-title">{`관련 검색어`}</div>
                {relativeWordList.length === 0 ? (
                  <div className="search-relation-card-contents-nothing">
                    {"검색 결과가 없습니다."}
                  </div>
                ) : (
                  <div className="search-relation-card-contents">
                    {relativeWordList.map((word, index) => (
                      <div
                        key={index}
                        className="word-badge"
                        onClick={() => onRelationWordClickHandler(word)}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="search-pagination-box">
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
}
