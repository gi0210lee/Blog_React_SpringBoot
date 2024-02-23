package com.gy.blogbackend.repository;

import com.gy.blogbackend.entity.FavoriteEntity;
import com.gy.blogbackend.entity.primaryKey.FavoritePk;
import com.gy.blogbackend.repository.resultSet.GetFavoriteListResultSet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {

    FavoriteEntity findByBoardNumberAndUserEmail(Integer boardNumber, String userEmail);

    @Query(
            value = "SELECT " +
                    "    u.EMAIL AS email, " +
                    "    u.NICKNAME AS nickname, " +
                    "    u.PROFILE_IMAGE AS profileImage " +
                    "FROM " +
                    "    \"favorite\" f " +
                    "INNER JOIN \"user\" u " +
                    "ON " +
                    "    f.USER_EMAIL = u.EMAIL " +
                    "WHERE " +
                    "    f.BOARD_NUMBER = ?1 ",
            nativeQuery = true
    )
    List<GetFavoriteListResultSet> getFavoriteList(Integer boardNumber);

    @Transactional
    void deleteByBoardNumber(Integer boardNumber);
}
