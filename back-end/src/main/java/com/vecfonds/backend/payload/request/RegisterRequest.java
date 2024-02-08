package com.vecfonds.backend.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "The fullname field can't be blank")
    private String fullname;
    @NotBlank(message = "The phone number field can't be blank")
    private String username;
    @NotBlank(message = "The password field can't be blank")
    private String password;
    @NotBlank(message = "The address field can't be blank")
    private String address;
}
