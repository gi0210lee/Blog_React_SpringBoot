package com.gy.blogbackend.service.implement;

import com.gy.blogbackend.dto.response.ResponseDto;
import com.gy.blogbackend.dto.response.search.GetPopularListResponseDto;
import com.gy.blogbackend.repository.SearchLogRepository;
import com.gy.blogbackend.repository.resultSet.GetPopularListResultSet;
import com.gy.blogbackend.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImplement implements SearchService {

    private final SearchLogRepository searchLogRepository;

    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {

        List<GetPopularListResultSet> resultSets = new ArrayList<>();

        try {
            resultSets = searchLogRepository.getPopularList();
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }


        return GetPopularListResponseDto.success(resultSets);
    }
}
