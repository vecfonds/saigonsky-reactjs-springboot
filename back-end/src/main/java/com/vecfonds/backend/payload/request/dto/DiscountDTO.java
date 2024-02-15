package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DiscountDTO {
    private Long id;
    private String name;
    private Double discountPercent;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
