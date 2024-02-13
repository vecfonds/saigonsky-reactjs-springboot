package com.vecfonds.backend.repository;

import com.vecfonds.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhoneNumber(String phoneNumber);

    Boolean existsByPhoneNumber(String phoneNumber);

    @Modifying
    @Query("update User u set u.username = ?1, u.phoneNumber = ?2, u.address = ?3 where u.id = ?4")
    void setUserInfoById(String username, String phoneNumber, String address, Long userId);
}
