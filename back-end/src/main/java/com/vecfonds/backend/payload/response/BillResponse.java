package com.vecfonds.backend.payload.response;

import com.vecfonds.backend.payload.request.dto.BillDTO;
import lombok.Data;

import java.util.List;

@Data
public class BillResponse {
    private List<BillDTO> content;
    private Integer pageNumber;
    private Integer pageSize;
    private Long totalElements;
    private Integer totalPages;
    private Boolean lastPage;
}
