package com.vecfonds.backend.controller;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.ShoppingCartDTO;
import com.vecfonds.backend.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/shopping-cart")
public class ShoppingCartController {
    private final ShoppingCartService shoppingCartService;

    @Autowired
    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @PostMapping("{shoppingCartId}/products/{productId}/quantity/{quantity}/size/{size}/color/{color}")
    public ResponseEntity<?> addProductToCart(@PathVariable Long shoppingCartId
            , @PathVariable Long productId, @PathVariable Integer quantity
            , @PathVariable String size, @PathVariable String color){
        ShoppingCartDTO shoppingCartDTO = shoppingCartService.addProductToCart(shoppingCartId, productId, quantity, size, color);
        return new ResponseEntity<>( shoppingCartDTO, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getCart(@AuthenticationPrincipal User userSession){
        ShoppingCartDTO shoppingCartDTO = shoppingCartService.getCart(userSession);
        return new ResponseEntity<>(shoppingCartDTO, HttpStatus.OK);
    }

    @Secured("ADMIN")
    @GetMapping("list")
    public ResponseEntity<?> getListCart(){
        List<ShoppingCartDTO> shoppingCartDTOs = shoppingCartService.getListCart();
        return new ResponseEntity<>(shoppingCartDTOs, HttpStatus.OK);
    }

    @PutMapping("{shoppingCartId}/products/{productId}/quantity/{quantity}/size/{size}/color/{color}")
    public ResponseEntity<?> updateProductQuantityInCart(@PathVariable Long shoppingCartId
            , @PathVariable Long productId, @PathVariable Integer quantity
            , @PathVariable String size, @PathVariable String color){
        ShoppingCartDTO shoppingCartDTO = shoppingCartService.updateProductQuantityInCart(shoppingCartId, productId, quantity, size, color);
        return new ResponseEntity<>( shoppingCartDTO, HttpStatus.OK);
    }

    @DeleteMapping("{shoppingCartId}/products/{productId}/size/{size}/color/{color}")
    public ResponseEntity<?> deleteProductInCart(@PathVariable Long shoppingCartId
            , @PathVariable Long productId
            , @PathVariable String size, @PathVariable String color){
        String response = shoppingCartService.deleteProductInCart(shoppingCartId, productId, size, color);
        return new ResponseEntity<>( response, HttpStatus.OK);
    }
}
