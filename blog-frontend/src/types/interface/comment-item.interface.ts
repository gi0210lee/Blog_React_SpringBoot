interface ICommentItem {
  commentUserProfileImage: string | null;
  commentUserNickname: string;
  commentWriteDate: Date;
  commentContent: string;
}

export default ICommentItem;
