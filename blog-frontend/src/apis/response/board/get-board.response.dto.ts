import { IBoard } from "types/interface";
import ResponseDto from "../response.dto";

interface IGetBoardResponseDto extends ResponseDto, IBoard {}

export default IGetBoardResponseDto;
