import { IBoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface IGetLatestBoardListResponseDto extends ResponseDto {
  latestList: IBoardListItem[];
}
