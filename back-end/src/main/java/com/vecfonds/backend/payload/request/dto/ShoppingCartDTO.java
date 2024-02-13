package com.vecfonds.backend.payload.request.dto;

import com.vecfonds.backend.entity.CartItem;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
public class ShoppingCartDTO {
    private Long id;
    private List<CartItem> cartItems = new ArrayList<>();
    private BigDecimal total = BigDecimal.valueOf(0);
}
