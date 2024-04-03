import ResponseDto from "../response.dto";

export default interface ISignInResponseDto extends ResponseDto {
  token: string;
  expirationTime: number;
}
