package com.gy.blogbackend.service;

import com.gy.blogbackend.dto.request.board.PostBoardRequestDto;
import com.gy.blogbackend.dto.request.board.PostCommentRequestDto;
import com.gy.blogbackend.dto.response.board.*;
import org.springframework.http.ResponseEntity;


public interface BoardService {

    ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);

    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email);

    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);

    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);

    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email, String nickname);

    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
}