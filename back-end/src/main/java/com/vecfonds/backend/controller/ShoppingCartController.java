package com.vecfonds.backend.controller;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.ShoppingCartDTO;
import com.vecfonds.backend.payload.response.MessageResponse;
import com.vecfonds.backend.payload.response.ShoppingCartResponse;
import com.vecfonds.backend.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/shopping-cart")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @PostMapping("/product/{productId}/quantity/{quantity}/size/{size}/color/{color}")
    public ResponseEntity<?> addProductToCart(@AuthenticationPrincipal User userSession
            , @PathVariable Long productId, @PathVariable Integer quantity
            , @PathVariable String size, @PathVariable String color){
        ShoppingCartDTO shoppingCartDTO = shoppingCartService.addProductToCart(userSession, productId, quantity, size, color);
        return new ResponseEntity<>( shoppingCartDTO, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getCart(@AuthenticationPrincipal User userSession){
        ShoppingCartDTO shoppingCartDTO = shoppingCartService.getCart(userSession);
        return new ResponseEntity<>(shoppingCartDTO, HttpStatus.OK);
    }

    @Secured("ADMIN")
    @GetMapping("list")
    public ResponseEntity<?> getListCart(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "asc", required = false) String sortOrder
    ){
        ShoppingCartResponse shoppingCartResponse = shoppingCartService.getListCart(pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(shoppingCartResponse, HttpStatus.OK);
    }

    @PutMapping("/product/{productId}/quantity/{quantity}/size/{size}/color/{color}")
    public ResponseEntity<?> updateProductQuantityInCart(@AuthenticationPrincipal User userSession
            , @PathVariable Long productId, @PathVariable Integer quantity
            , @PathVariable String size, @PathVariable String color){
        ShoppingCartDTO shoppingCartDTO = shoppingCartService.updateProductQuantityInCart(userSession, productId, quantity, size, color);
        return new ResponseEntity<>( shoppingCartDTO, HttpStatus.OK);
    }

    @DeleteMapping("/product/{productId}/size/{size}/color/{color}")
    public ResponseEntity<?> deleteProductInCart(@AuthenticationPrincipal User userSession
            , @PathVariable Long productId
            , @PathVariable String size, @PathVariable String color){
        String response = shoppingCartService.deleteProductInCartUser(userSession, productId, size, color);
        return new ResponseEntity<>( new MessageResponse(response), HttpStatus.OK);
    }
}
