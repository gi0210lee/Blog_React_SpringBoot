import { IUser } from "types/interface";
import ResponseDto from "../response.dto";

export default interface IGetSignInUserResponseDto extends ResponseDto, IUser {}
