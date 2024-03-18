package com.gy.blogbackend.service;

import com.gy.blogbackend.dto.response.search.GetPopularListResponseDto;
import com.gy.blogbackend.dto.response.search.GetRelationListResponseDto;
import org.springframework.http.ResponseEntity;

public interface SearchService {

    ResponseEntity<? super GetPopularListResponseDto> getPopularList();

    ResponseEntity<? super GetRelationListResponseDto> getRelationList(String searchWord);
}
