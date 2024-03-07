package com.gy.blogbackend.repository;

import com.gy.blogbackend.entity.SearchLogEntity;
import com.gy.blogbackend.repository.resultSet.GetPopularListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {
//    public List<SearchLogEntity> findTop10ByOrderByPopularSearchCountDesc();

    @Query(
            value = "SELECT search_word AS searchWord, count(search_word) AS count " +
                    "FROM \"search_log\" " +
                    "WHERE relation = 'False' " +
                    "GROUP BY search_word " +
                    "ORDER BY count DESC " +
                    "OFFSET 15 ROWS ",
            nativeQuery = true
    )
    public List<GetPopularListResultSet> getPopularList();
}
