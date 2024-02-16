package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.Category;
import com.vecfonds.backend.payload.request.dto.CategoryDTO;
import com.vecfonds.backend.payload.response.CategoryResponse;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {
    CategoryDTO createCategory(Category category);
    CategoryResponse getListCategory(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    CategoryDTO updateCategory(Long categoryId, Category category);
    String deleteCategory(Long categoryId);
}
