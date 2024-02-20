package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

@Data
public class BillDetailDTO {
    private Long id;
    private ProductDTO product;
    private Double itemPrice = 0.0;
    private Integer quantity;
    private String size;
    private String color;
}
