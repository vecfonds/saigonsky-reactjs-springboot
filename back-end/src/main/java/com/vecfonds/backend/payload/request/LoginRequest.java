package com.vecfonds.backend.payload.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String phoneNumber;
    private String password;
}
