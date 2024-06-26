package com.vecfonds.backend.payload.response;

import com.vecfonds.backend.payload.request.dto.UserDTO;
import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    private List<UserDTO> content;
    private Integer pageNumber;
    private Integer pageSize;
    private Long totalElements;
    private Integer totalPages;
    private Boolean lastPage;
}