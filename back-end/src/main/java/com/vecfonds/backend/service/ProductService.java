package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.Product;
import com.vecfonds.backend.payload.request.dto.ProductDTO;
import com.vecfonds.backend.payload.response.ProductResponse;
import org.springframework.stereotype.Service;

@Service
public interface ProductService {
    ProductDTO convertProductDTO(Product product);
    ProductDTO createProduct(Long categoryId, Product product);
    ProductResponse getListProduct(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    ProductResponse getListProductByCategory(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, Long categoryId);
    ProductResponse getListProductByKeyword(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword);
    ProductDTO updateProduct(Long productId, Product product);
    String deleteProduct(Long productId);
}
