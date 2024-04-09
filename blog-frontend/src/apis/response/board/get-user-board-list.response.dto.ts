import { IBoardListItem } from "types/interface";
import IResponseDto from "../response.dto";

export default interface IGetUserBoardListResponseDto extends IResponseDto {
  userBoardList: IBoardListItem[];
}
