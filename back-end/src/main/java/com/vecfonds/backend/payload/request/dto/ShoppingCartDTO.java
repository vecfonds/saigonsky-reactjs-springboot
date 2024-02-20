package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ShoppingCartDTO {
    private Long id;
    private Double total = 0.0;
    private List<CartItemDTO> cartItems = new ArrayList<>();
}
