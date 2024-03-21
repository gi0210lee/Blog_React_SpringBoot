package com.gy.blogbackend.repository;

import com.gy.blogbackend.entity.BoardListViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Integer> {

    List<BoardListViewEntity> findByOrderByWriteDatetimeDesc();

    List<BoardListViewEntity> findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc(Date writeDatetime);

    List<BoardListViewEntity> findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(String title, String content);

    List<BoardListViewEntity> findByWriterEmailOrderByWriteDatetimeDesc(String writerEmail);

}
