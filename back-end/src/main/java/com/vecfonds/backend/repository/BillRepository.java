package com.vecfonds.backend.repository;

import com.vecfonds.backend.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    Page<Bill> findByPhoneNumber(String phoneNumber, Pageable pageable);

    @Query("SELECT c FROM Bill c JOIN FETCH c.billDetails ci JOIN FETCH ci.product p WHERE p.id = ?1")
    List<Bill> findBillByProductId(Long productId);
}
