package com.vecfonds.backend.service.impl;

import com.vecfonds.backend.entity.Category;
import com.vecfonds.backend.exception.ObjectExistsException;
import com.vecfonds.backend.exception.ResourceNotFoundException;
import com.vecfonds.backend.payload.request.dto.CategoryDTO;
import com.vecfonds.backend.payload.response.CategoryResponse;
import com.vecfonds.backend.repository.CategoryRepository;
import com.vecfonds.backend.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CategoryDTO createCategory(Category category) {
        if(categoryRepository.findByName(category.getName())!=null){
            throw new ObjectExistsException("Category với tên " + category.getName() + " đã tồn tại!");
        }
        categoryRepository.save(category);

        return modelMapper.map(category, CategoryDTO.class);
    }

    @Override
    public CategoryResponse getListCategory(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Category> categories = categoryRepository.findAll(pageable);

        List<Category> categoryList = categories.getContent();

        List<CategoryDTO> categoryDTOS = categoryList.stream().map(category -> modelMapper.map(category,CategoryDTO.class)).toList();

        CategoryResponse categoryResponse = modelMapper.map(categories, CategoryResponse.class);
        categoryResponse.setContent(categoryDTOS);

        return categoryResponse;
    }

    @Override
    public CategoryDTO updateCategory(Long categoryId, Category category) {
//        Category categorySaved = categoryRepository.findById(categoryId)
//                .orElseThrow(() -> new ResourceNotFoundException("Category", "CategoryId", categoryId));

        if(categoryRepository.findById(categoryId).isEmpty()){
            throw new ResourceNotFoundException("Category", "CategoryId", categoryId);
        }

        category.setId(categoryId);

        Category categorySaved = categoryRepository.save(category);

        return modelMapper.map(categorySaved, CategoryDTO.class);
    }

    @Override
    public String deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category", "CategoryId", categoryId));

//        List<Product> products = category.getProducts();
//        products.forEach(product -> );
        categoryRepository.delete(category);
        return "Category với tên " +category.getName()+" đã xóa thành công";
    }
}
