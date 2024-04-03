import { IBoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface IGetTop3BoardListResponseDto extends ResponseDto {
  top3List: IBoardListItem[];
}
