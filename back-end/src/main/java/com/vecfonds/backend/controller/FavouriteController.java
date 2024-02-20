package com.vecfonds.backend.controller;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.ProductDTO;
import com.vecfonds.backend.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/favourite")
public class FavouriteController {
    private final FavouriteService favouriteService;

    @Autowired
    public FavouriteController(FavouriteService favouriteService) {
        this.favouriteService = favouriteService;
    }

    @GetMapping("")
    public ResponseEntity<?> getFavourite(
            @AuthenticationPrincipal User userSession,
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy, @RequestParam(name = "sortOrder", defaultValue = "asc", required = false) String sortOrder
    ){
        List<ProductDTO> productDTOS = favouriteService.getFavourite(pageNumber, pageSize, sortBy, sortOrder, userSession);
        return new ResponseEntity<>( productDTOS, HttpStatus.OK);
    }

    @PostMapping("/product/{productId}")
    public ResponseEntity<?> addProductToFavourite(@AuthenticationPrincipal User userSession, @PathVariable Long productId){
        ProductDTO productDTO = favouriteService.addProductToFavourite(userSession, productId);
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @DeleteMapping("/product/{productId}")
    public ResponseEntity<?> deleteProductInFavourite(@AuthenticationPrincipal User userSession, @PathVariable Long productId){
        String response = favouriteService.deleteProductInFavourite(userSession, productId);
        return new ResponseEntity<>( response, HttpStatus.OK);
    }
}
