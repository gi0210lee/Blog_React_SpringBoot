package com.gy.blogbackend.repository;

import com.gy.blogbackend.entity.CommentEntity;
import com.gy.blogbackend.repository.resultSet.GetCommentListResultSet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    @Query(
            value = "SELECT " +
                    "   u.NICKNAME AS nickname, " +
                    "   u.PROFILE_IMAGE AS profileImage, " +
                    "   c.WRITE_DATETIME AS writeDatetime, " +
                    "   c.CONTENT AS content " +
                    "FROM " +
                    "   \"comment\" c " +
                    "INNER JOIN \"user\" u ON " +
                    "   c.USER_EMAIL = u.EMAIL " +
                    "WHERE " +
                    "   c.BOARD_NUMBER = ?1 " +
                    "ORDER BY " +
                    "   WRITE_DATETIME DESC ",
            nativeQuery = true
    )
    List<GetCommentListResultSet> getCommentList(Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}
