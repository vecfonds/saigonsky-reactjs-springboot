package com.vecfonds.backend.repository;

import com.vecfonds.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, Long> {
//    List<Product> getAllProduct();
//
//    Product findById(Long id);
}
