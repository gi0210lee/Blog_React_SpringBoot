import { IUser } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetSignInUserResponseDto extends ResponseDto, IUser {}
