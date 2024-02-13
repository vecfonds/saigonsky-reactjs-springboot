package com.vecfonds.backend.payload.request.dto;

import com.vecfonds.backend.entity.Product;
import com.vecfonds.backend.entity.ShoppingCart;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
public class CartItem {
    private Long id;
    private ShoppingCart shoppingCart;
    private Product product;
    private Long quantity;
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;
}
