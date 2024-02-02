package com.gy.blogbackend.repository;

import com.gy.blogbackend.entity.BoardEntity;
import com.gy.blogbackend.repository.resultSet.GetBoardResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    @Query(
            value = "SELECT " +
                    "   B.BOARD_NUMBER AS boardNumber, " +
                    "   B.TITLE AS title, " +
                    "   B.CONTENT AS content, " +
                    "   B.WRITE_DATETIME AS writeDatetime, " +
                    "   B.WRITER_EMAIL AS writerEmail, " +
                    "   U.NICKNAME AS writerNickname, " +
                    "   U.PROFILE_IMAGE AS writerProfileImage " +
                    "FROM " +
                    "   \"board\" B " +
                    "INNER JOIN \"user\" U " +
                    "ON " +
                    "   B.WRITER_EMAIL = U.EMAIL " +
                    "WHERE " +
                    "   BOARD_NUMBER = ?1 ",
            nativeQuery = true
    )
    GetBoardResultSet getBoard(Integer boardNumber);

    public List<BoardEntity> findTop3ByWriteDatetimeAfterOrderByFavoriteCountDesc(Date writeDatetime);

    public List<BoardEntity> findByOrderByWriteDatetimeDesc();

    public List<BoardEntity> findByTitleContains(String title);

    BoardEntity findByBoardNumber(Integer boardNumber);

    boolean existsByBoardNumber(Integer boardNumber);
}
