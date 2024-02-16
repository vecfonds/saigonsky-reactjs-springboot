package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryDTO {
    private Long id;
    private String name;
    private LocalDateTime createAt;
}
