package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class BillDTO {
    private Long id;
    private Double total = 0.0;
    private String payMethod;
    private List<BillDetailDTO> billDetails = new ArrayList<>();
    private String username;
    private String phoneNumber;
    private String address;
    private LocalDateTime createAt;
}
