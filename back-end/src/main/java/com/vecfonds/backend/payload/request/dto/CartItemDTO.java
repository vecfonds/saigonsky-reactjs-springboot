package com.vecfonds.backend.payload.request.dto;

import com.vecfonds.backend.entity.Product;
import com.vecfonds.backend.entity.ShoppingCart;
import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private ShoppingCart shoppingCart;
    private Product product;
    private Long quantity;
}
