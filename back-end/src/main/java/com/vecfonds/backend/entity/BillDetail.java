package com.vecfonds.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bill_detail")
@Builder
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class BillDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bill_id", foreignKey = @ForeignKey(name = "fk_billDetail_bill"))
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_billDetail_product"))
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
