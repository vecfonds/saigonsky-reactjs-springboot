package com.vecfonds.backend.payload.request.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDTO {
    private String username;
    private String phoneNumber;
    private String address;
    private ShoppingCartDTO shoppingCart;
    private List<BillDTO> bills = new ArrayList<>();
}
