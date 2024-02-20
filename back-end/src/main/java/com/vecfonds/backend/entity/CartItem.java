package com.vecfonds.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_item")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shoppingCart_id", foreignKey = @ForeignKey(name = "fk_cartItem_shoppingCart"))
    private ShoppingCart shoppingCart;

    @ManyToOne
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_cartItem_product"))
    private Product product;

    @Column(name = "productPrice", nullable = false)
    private Double itemPrice;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "size", nullable = false)
    private String size;

    @Column(name = "color", nullable = false)
    private String color;
}
