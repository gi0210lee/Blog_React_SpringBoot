interface ICommentListItem {
  commentUserProfileImage: string | null;
  commentUserNickname: string;
  commentWriteDate: Date;
  commentContent: string;
}

export default ICommentListItem;
