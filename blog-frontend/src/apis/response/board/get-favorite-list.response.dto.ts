import { IFavoriteListItem } from "types/interface";
import ResponseDto from "../response.dto";

interface GetFavoriteListResponseDto extends ResponseDto {
  favoriteList: IFavoriteListItem[];
}

export default GetFavoriteListResponseDto;
