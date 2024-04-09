import { IUser } from "types/interface";
import IResponseDto from "../response.dto";

export default interface IGetSignInUserResponseDto
  extends IResponseDto,
    IUser {}
