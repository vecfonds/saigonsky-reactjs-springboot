package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

@Data
public class BillDetailDTO {
    private Long id;
    private BillDTO bill;
    private ProductDTO product;
    private Integer quantity;
    private String size;
    private String color;
}
