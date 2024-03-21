package com.gy.blogbackend.dto.response.board;

import com.gy.blogbackend.common.ResponseCode;
import com.gy.blogbackend.common.ResponseMessage;
import com.gy.blogbackend.dto.object.BoardListItem;
import com.gy.blogbackend.dto.response.ResponseDto;
import com.gy.blogbackend.entity.BoardListViewEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetUserBoardListResponseDto extends ResponseDto {

    private List<BoardListItem> userBoardList;

    public GetUserBoardListResponseDto(List<BoardListViewEntity> boardListViewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.userBoardList = BoardListItem.getList(boardListViewEntities);
    }

    public static ResponseEntity<GetUserBoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntities) {
        GetUserBoardListResponseDto result = new GetUserBoardListResponseDto(boardListViewEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> notExistUser() {
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

}
