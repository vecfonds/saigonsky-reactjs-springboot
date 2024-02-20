package com.vecfonds.backend.payload.response;

import com.vecfonds.backend.payload.request.dto.ShoppingCartDTO;
import lombok.Data;

import java.util.List;

@Data
public class ShoppingCartResponse {
    private List<ShoppingCartDTO> content;
    private Integer pageNumber;
    private Integer pageSize;
    private Long totalElements;
    private Integer totalPages;
    private Boolean lastPage;
}
