import ResponseDto from "../response.dto";

export default interface IGetPopularListResponseDto extends ResponseDto {
  popularWordList: string[];
}
