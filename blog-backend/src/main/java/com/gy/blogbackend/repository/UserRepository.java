package com.gy.blogbackend.repository;

import com.gy.blogbackend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    boolean existsByTelNumber(String telNumber);

    UserEntity findByEmail(String email);
    
}
