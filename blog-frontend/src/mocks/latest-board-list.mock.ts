import { IBoardListItem } from "types/interface";

const latestBoardListMock: IBoardListItem[] = [
  {
    boardNumber: 1,
    title: "오늘 뭐먹지",
    content: "온르 아침 뭐먹을까",
    image: "https://source.unsplash.com/random/200x200/?cooking",
    writerEmail: "",
    writerProfileImage: "https://source.unsplash.com/random/100x100/?user",
    writerNickname: "닉네임",
    writeDatetime: new Date(),
    viewCount: 10,
    favoriteCount: 20,
    commentCount: 30,
  },
  {
    boardNumber: 2,
    title: "오늘 뭐먹지 맛난거 꾸역꾸역",
    content: "온르 점심 뭐먹을까",
    image: "https://source.unsplash.com/random/200x200/?cooking",
    writerEmail: "",
    writerProfileImage: "https://source.unsplash.com/random/100x100/?user",
    writerNickname: "닉네임",
    writeDatetime: new Date(),
    viewCount: 10,
    favoriteCount: 20,
    commentCount: 30,
  },
  {
    boardNumber: 3,
    title: "오늘 뭐먹지 맛난거 꾸역꾸역",
    content: "온르 점심 뭐먹을까 저녁은 뭐먹을까",
    image: "https://source.unsplash.com/random/200x200/?cooking",
    writerEmail: "",
    writerProfileImage: "https://source.unsplash.com/random/100x100/?user",
    writerNickname: "닉네임",
    writeDatetime: new Date(),
    viewCount: 10,
    favoriteCount: 20,
    commentCount: 30,
  },
];

export default latestBoardListMock;
