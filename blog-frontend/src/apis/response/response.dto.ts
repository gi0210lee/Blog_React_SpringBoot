import { ResponseCode } from "types/enum";

interface ResponseDto {
  code: ResponseCode;
  message: string;
}

export default ResponseDto;
