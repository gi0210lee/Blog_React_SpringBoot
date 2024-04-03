import { IFavoriteListItem } from "types/interface";
import ResponseDto from "../response.dto";

interface IGetFavoriteListResponseDto extends ResponseDto {
  favoriteList: IFavoriteListItem[];
}

export default IGetFavoriteListResponseDto;
