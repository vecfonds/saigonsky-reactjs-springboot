package com.vecfonds.backend.repository;

import com.vecfonds.backend.entity.Category;
import com.vecfonds.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContaining(String keyword, Pageable pageable);
    Page<Product> findByCategory(Category category, Pageable pageable);
}
