package com.vecfonds.backend.controller;

import com.vecfonds.backend.entity.Category;
import com.vecfonds.backend.payload.request.dto.CategoryDTO;
import com.vecfonds.backend.payload.response.CategoryResponse;
import com.vecfonds.backend.payload.response.MessageResponse;
import com.vecfonds.backend.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/category")
public class CategoryController {
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Secured("ADMIN")
    @PostMapping("")
    public ResponseEntity<?> createCategory(@Valid @RequestBody Category category){
        CategoryDTO categoryDTO = categoryService.createCategory(category);
        return new ResponseEntity<>(categoryDTO, HttpStatus.CREATED);
    }

    @GetMapping("list")
    public ResponseEntity<?> getListCategory(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "asc", required = false) String sortOrder
    ){
        CategoryResponse categoryResponse = categoryService.getListCategory(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(categoryResponse, HttpStatus.FOUND);
    }

    @Secured("ADMIN")
    @PutMapping("{categoryId}")
    public ResponseEntity<?> updateCategory(@PathVariable Long categoryId, @RequestBody Category category){
        CategoryDTO categoryDTO = categoryService.updateCategory(categoryId, category);
        return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
    }

    @Secured("ADMIN")
    @DeleteMapping("{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId){
        String message = categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(new MessageResponse(message), HttpStatus.OK);
    }
}
