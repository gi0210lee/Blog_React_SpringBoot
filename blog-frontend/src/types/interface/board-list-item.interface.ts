interface IBoardListItem {
  boardNumber: number;
  title: string;
  content: string;
  image: string | null;
  viewCount: number;
  favoriteCount: number;
  commentCount: number;
  writeDatetime: Date;
  writerEmail: string;
  writerNickname: string;
  writerProfileImage: string | null;
}

export default IBoardListItem;
