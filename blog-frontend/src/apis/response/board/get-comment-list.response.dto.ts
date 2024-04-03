import { ICommentListItem } from "types/interface";
import ResponseDto from "../response.dto";

interface IGetCommentListResponseDto extends ResponseDto {
  commentList: ICommentListItem[];
}

export default IGetCommentListResponseDto;
