package com.vecfonds.backend.repository;

import com.vecfonds.backend.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    Page<Bill> findByPhoneNumber(String phoneNumber, Pageable pageable);

}
