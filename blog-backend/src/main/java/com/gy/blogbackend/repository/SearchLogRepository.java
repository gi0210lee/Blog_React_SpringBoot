package com.gy.blogbackend.repository;

import com.gy.blogbackend.entity.SearchLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Integer> {
//    public List<SearchLogEntity> findTop10ByOrderByPopularSearchCountDesc();
}
