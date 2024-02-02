import { IBoardItem } from "types/interface";

const latestBoardListMock: IBoardItem[] = [
  {
    boardNumber: 1,
    boardTitle: "오늘 뭐먹지",
    boardContent: "온르 아침 뭐먹을까",
    boardImage: "https://picsum.photos/id/4/50",
    boardWriterProfileImage: "https://picsum.photos/id/5/50",
    boardWriterNickname: "닉네임",
    boardWriteDate: new Date(),
    boardViewCount: 10,
    boardFavoriteCount: 20,
    boardCommentCount: 30,
  },
  {
    boardNumber: 2,
    boardTitle: "오늘 뭐먹지 맛난거 꾸역꾸역",
    boardContent: "온르 점심 뭐먹을까",
    boardImage: "https://picsum.photos/id/4/50",
    boardWriterProfileImage: "https://picsum.photos/id/5/50",
    boardWriterNickname: "닉네임",
    boardWriteDate: new Date(),
    boardViewCount: 10,
    boardFavoriteCount: 20,
    boardCommentCount: 30,
  },
  {
    boardNumber: 3,
    boardTitle: "오늘 뭐먹지 맛난거 꾸역꾸역",
    boardContent: "온르 점심 뭐먹을까 저녁은 뭐먹을까",
    boardImage: "https://picsum.photos/id/4/50",
    boardWriterProfileImage: "https://picsum.photos/id/5/50",
    boardWriterNickname: "닉네임",
    boardWriteDate: new Date(),
    boardViewCount: 10,
    boardFavoriteCount: 20,
    boardCommentCount: 30,
  },
];

export default latestBoardListMock;
