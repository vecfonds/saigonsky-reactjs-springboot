package com.vecfonds.backend.payload.response;

import lombok.Data;

@Data
public class UserResponse {
    private String username;
    private String phoneNumber;
    private String address;
}
