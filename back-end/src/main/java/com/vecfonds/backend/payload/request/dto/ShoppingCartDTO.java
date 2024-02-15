package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class ShoppingCartDTO {
    private Long id;
    private BigDecimal total = BigDecimal.valueOf(0);
    private List<CartItemDTO> cartItems = new ArrayList<>();
}
