import ResponseDto from "../response.dto";

export default interface IGetRelationListResponseDto extends ResponseDto {
  relativeWordList: string[];
}
