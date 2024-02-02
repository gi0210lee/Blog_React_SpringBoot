import {
  latestBoardListMock,
  top3BoardListMock,
  commentListMock,
  favoriteListMock,
} from "mocks";
import { IBoardItem, ICommentItem, IFavoriteItem } from "types/interface";
import BoardItem from "components/BoardItem";
import Top3Item from "components/Top3Item";
import CommentItem from "components/CommentItem";
import FavortItem from "components/FavoriteItem";
import InputBox from "components/InputBox";
import { useState } from "react";

export default function BoardMain() {
  const [value, setValue] = useState<string>("");
  return (
    <>
      {/* <div>
        <InputBox
          label="이메일"
          type="text"
          placeholder="이메일 주소를 입력해주세요"
          value={value}
          error={false}
          setValue={setValue}
          message="1234"
        />
      </div> */}
      <div
        style={{
          display: "inline-flex",
          flexFlow: "row wrap",
          columnGap: "30px",
          rowGap: "20px",
        }}
      >
        {favoriteListMock.map((favoriteItem: IFavoriteItem) => (
          <FavortItem favoriteItem={favoriteItem} />
        ))}
      </div>
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {commentListMock.map((commentItem: ICommentItem) => (
          <CommentItem commentItem={commentItem} />
        ))}
      </div>

      <div
        className=""
        style={{ display: "flex", justifyContent: "center", gap: "24px" }}
      >
        {top3BoardListMock?.map((boardItem: IBoardItem) => (
          <Top3Item top3Item={boardItem} />
        ))}
      </div>
      {latestBoardListMock?.map((boardItem: IBoardItem) => (
        <BoardItem boardItem={boardItem} />
      ))}
    </>
  );
}
