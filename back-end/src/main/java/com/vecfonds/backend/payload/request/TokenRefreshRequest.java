package com.vecfonds.backend.payload.request;

import lombok.Data;

@Data
public class TokenRefreshRequest {
    private String refreshToken;
}
