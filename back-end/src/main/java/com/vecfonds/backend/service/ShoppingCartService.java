package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.ShoppingCart;
import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.ShoppingCartDTO;
import com.vecfonds.backend.payload.response.ShoppingCartResponse;
import org.springframework.stereotype.Service;

@Service
public interface ShoppingCartService {
    ShoppingCartDTO convertShoppingCartDTO(ShoppingCart shoppingCart);
    ShoppingCartDTO addProductToCart(User userSession, Long productId, Integer quantity, String size, String color);

    ShoppingCartDTO getCart(User userSession);

    ShoppingCartResponse getListCart(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    ShoppingCartDTO updateProductQuantityInCart(User userSession, Long productId, Integer quantity, String size, String color);

    String deleteProductInCart(Long shoppingCartId, Long productId, String size, String color);

    String deleteProductInCartUser(User userSession, Long productId, String size, String color);
}
