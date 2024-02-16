import { ICommentListItem } from "types/interface";
import ResponseDto from "../response.dto";

interface GetCommentListResponseDto extends ResponseDto {
  commentList: ICommentListItem[];
}

export default GetCommentListResponseDto;
