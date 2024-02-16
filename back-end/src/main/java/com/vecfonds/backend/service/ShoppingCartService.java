package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.ShoppingCart;
import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.ShoppingCartDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ShoppingCartService {
    ShoppingCartDTO convertShoppingCartDTO(ShoppingCart shoppingCart);
    ShoppingCartDTO addProductToCart(Long shoppingCartId, Long productId, Integer quantity, String size, String color);

    ShoppingCartDTO getCart(User userSession);

    List<ShoppingCartDTO> getListCart();

    ShoppingCartDTO updateProductQuantityInCart(Long shoppingCartId, Long productId, Integer quantity, String size, String color);

    String deleteProductInCart(Long shoppingCartId, Long productId, String size, String color);

}
