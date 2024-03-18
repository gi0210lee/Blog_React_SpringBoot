package com.gy.blogbackend.dto.response.search;

import com.gy.blogbackend.common.ResponseCode;
import com.gy.blogbackend.common.ResponseMessage;
import com.gy.blogbackend.dto.response.ResponseDto;
import com.gy.blogbackend.repository.resultSet.GetRelationListResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@Getter
public class GetRelationListResponseDto extends ResponseDto {

    private List<String> relativeWordList;

    public GetRelationListResponseDto(List<GetRelationListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

        List<String> relativeWordList = new ArrayList<>();
        for (GetRelationListResultSet resultSet : resultSets) {
            String relativeWord = resultSet.getRelationWord();
            relativeWordList.add(relativeWord);
        }
        this.relativeWordList = relativeWordList;
    }

    public static ResponseEntity<GetRelationListResponseDto> success(List<GetRelationListResultSet> resultSets) {
        GetRelationListResponseDto result = new GetRelationListResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }


}
