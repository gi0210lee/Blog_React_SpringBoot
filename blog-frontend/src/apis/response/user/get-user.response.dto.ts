import { IUser } from "types/interface";
import IResponseDto from "../response.dto";

export default interface IGetUserResponseDto extends IResponseDto, IUser {}
