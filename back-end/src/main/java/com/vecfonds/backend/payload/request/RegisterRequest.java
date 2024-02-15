package com.vecfonds.backend.payload.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String address;
    private String phoneNumber;
    private String password;
}
