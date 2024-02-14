interface IBoardListItem {
  boardNumber: number;
  boardTitle: string;
  boardContent: string;
  boardImage: string | null;
  boardWriterProfileImage: string | null;
  boardWriterNickname: string;
  boardWriteDate: Date;
  boardViewCount: number;
  boardFavoriteCount: number;
  boardCommentCount: number;
}

export default IBoardListItem;
