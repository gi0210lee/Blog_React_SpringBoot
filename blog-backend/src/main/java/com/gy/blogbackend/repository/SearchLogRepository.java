package com.gy.blogbackend.repository;

import com.gy.blogbackend.entity.SearchLogEntity;
import com.gy.blogbackend.repository.resultSet.GetPopularListResultSet;
import com.gy.blogbackend.repository.resultSet.GetRelationListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {

    @Query(
            value = "SELECT search_word AS searchWord, count(search_word) AS count " +
                    "FROM \"search_log\" " +
                    "WHERE relation = '0' " +
                    "GROUP BY search_word " +
                    "ORDER BY count DESC " +
                    "OFFSET 15 ROWS ",
            nativeQuery = true
    )
    public List<GetPopularListResultSet> getPopularList();

    @Query(
            value = "SELECT " +
                    "    relation_word AS relationWord, " +
                    "    count(relation_word) AS count " +
                    "FROM " +
                    "    \"search_log\" sl " +
                    "WHERE " +
                    "    SEARCH_WORD = ?1 " +
                    "    AND RELATION_WORD IS NOT NULL " +
                    "GROUP BY " +
                    "    RELATION_WORD " +
                    "ORDER BY " +
                    "    COUNT DESC " +
                    "OFFSET 0 ROWS FETCH NEXT 15 ROWS ONLY ", nativeQuery = true)
    public List<GetRelationListResultSet> getRelationList(String searchWord);
}
