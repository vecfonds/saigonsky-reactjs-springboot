package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private ProductDTO product;
    private Double itemPrice = 0.0;
    private Long quantity;
    private String size;
    private String color;
}
