package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String username;
    private String phoneNumber;
    private String address;
    private ShoppingCartDTO shoppingCart;
}
