package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private CategoryDTO category;
    private DiscountDTO discount;
    private Double price = 0.0;
    private Integer quantity;
    private String description;
    private String material;
    private String style;
    private String album;
    private String model;
    private String connect;
}
