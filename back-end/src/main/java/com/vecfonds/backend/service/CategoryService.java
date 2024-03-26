package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.Category;
import com.vecfonds.backend.payload.request.dto.CategoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    CategoryDTO createCategory(Category category);
    List<CategoryDTO> getListCategory();
    CategoryDTO updateCategory(Long categoryId, Category category);
    String deleteCategory(Long categoryId);
}
