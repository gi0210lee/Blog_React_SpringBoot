
package com.gy.blogbackend.controller;


import com.gy.blogbackend.dto.request.board.PostBoardRequestDto;
import com.gy.blogbackend.dto.request.board.PostCommentRequestDto;
import com.gy.blogbackend.dto.response.board.*;
import com.gy.blogbackend.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(
            @PathVariable("boardNumber") Integer boardNumber
    ) {
        ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(boardNumber);
        return response;
    }

    @GetMapping("/{boardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(
            @PathVariable("boardNumber") Integer boardNumber
    ) {
        ResponseEntity<? super GetFavoriteListResponseDto> response = boardService.getFavoriteList(boardNumber);
        return response;
    }

    @PostMapping("")
    public ResponseEntity<? super PostBoardResponseDto> postBoard(@RequestBody @Valid PostBoardRequestDto requestBody, @AuthenticationPrincipal String email, @AuthenticationPrincipal String nickname) {
        ResponseEntity<? super PostBoardResponseDto> response = boardService.postBoard(requestBody, email, nickname);
        return response;
    }

    @PostMapping("/{boardNumber}/comment")
    public ResponseEntity<? super PostCommentResponseDto> postComment(
            @RequestBody @Valid PostCommentRequestDto requestBody,
            @PathVariable("boardNumber") Integer boardNumber,
            @AuthenticationPrincipal String email) {
        ResponseEntity<? super PostCommentResponseDto> response = boardService.postComment(requestBody, boardNumber, email);
        return response;
    }

    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(@PathVariable("boardNumber") Integer boardNumber, @AuthenticationPrincipal String email) {
        ResponseEntity<? super PutFavoriteResponseDto> response = boardService.putFavorite(boardNumber, email);
        return response;
    }


}

