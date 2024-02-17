package com.vecfonds.backend.controller;

import com.vecfonds.backend.entity.Product;
import com.vecfonds.backend.payload.request.dto.ProductDTO;
import com.vecfonds.backend.payload.response.MessageResponse;
import com.vecfonds.backend.payload.response.ProductResponse;
import com.vecfonds.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/product")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Secured("ADMIN")
    @PostMapping("category/{categoryId}")
    public ResponseEntity<?> addProduct(@PathVariable Long categoryId, @Valid @RequestBody Product product){
        ProductDTO productDTO = productService.createProduct(categoryId,product);
        return new ResponseEntity<>(productDTO, HttpStatus.CREATED);
    }

    @GetMapping("list")
    public ResponseEntity<?> getListProduct(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "createAt", required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "asc", required = false) String sortOrder
    ){
        ProductResponse productResponse = productService.getListProduct(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.FOUND);
    }

    @GetMapping("/list/category/{categoryId}")
    public ResponseEntity<?> getListProductByCategory(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "createAt", required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "asc", required = false) String sortOrder,
            @PathVariable Long categoryId
    ){
        ProductResponse productResponse = productService.getListProductByCategory(pageNumber, pageSize, sortBy, sortOrder, categoryId);
        return new ResponseEntity<>(productResponse, HttpStatus.FOUND);
    }

    @GetMapping("/list/keyword/{keyword}")
    public ResponseEntity<?> getListProductByKeyword(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "createAt", required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "asc", required = false) String sortOrder,
            @PathVariable String keyword
    ){
        ProductResponse productResponse = productService.getListProductByKeyword(pageNumber, pageSize, sortBy, sortOrder, keyword);
        return new ResponseEntity<>(productResponse, HttpStatus.FOUND);
    }

//    @Secured("ADMIN")
    @PutMapping("{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @Valid @RequestBody Product product){
        ProductDTO productDTO = productService.updateProduct(productId,product);
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

//    @Secured("ADMIN")
    @DeleteMapping("{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId){
        String message = productService.deleteProduct(productId);
        return new ResponseEntity<>(new MessageResponse(message), HttpStatus.OK);
    }
}
