import { ResponseCode } from "types/enum";

interface IResponseDto {
  code: ResponseCode;
  message: string;
}

export default IResponseDto;
