import { IBoard } from "types/interface";
import ResponseDto from "../response.dto";

interface GetBoardResponseDto extends ResponseDto, IBoard {}

export default GetBoardResponseDto;
