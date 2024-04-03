import { IBoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface IGetSearchBoardListResponseDto extends ResponseDto {
  searchList: IBoardListItem[];
}
