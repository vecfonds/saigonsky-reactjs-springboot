package com.vecfonds.backend.payload.response;

import com.vecfonds.backend.payload.request.dto.ProductDTO;
import lombok.Data;

import java.util.List;

@Data
public class ProductResponse {
    private List<ProductDTO> content;
    private Integer pageNumber;
    private Integer pageSize;
    private Long totalElements;
    private Integer totalPages;
    private Boolean lastPage;
}
