package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private CategoryDTO category;
    private List<ImageDTO> images = new ArrayList<>();
//    private DiscountDTO discount;
    private Double price = 0.0;
    private Integer quantity;
    private String description;
    private String material;
    private String style;
    private String album;
    private String model;
    private String connect;
    private LocalDateTime createAt;
}
