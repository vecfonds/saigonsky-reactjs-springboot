package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BillDTO {
    private Long id;
    private Double total = 0.0;
    private String payMethod;
    private String status;
    private String note;
    private List<BillDetailDTO> billDetails = new ArrayList<>();
}
