package com.vecfonds.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
@Entity
@Table
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

//  private long isActive;
  private String name;

  @ManyToOne
  @JoinColumn(name = "category_id", foreignKey = @ForeignKey(name = "fk_product_category"))
  private Category category;

  @OneToOne
  @JoinColumn(name = "discount_id", referencedColumnName = "id")
  private Discount discount;

//  private String type;
@Column(name = "price", nullable = false, precision = 19, scale = 3)
private BigDecimal price = BigDecimal.valueOf(0);
  private Integer quantity;
  private String description;
  private String material;
  private String style;
  private String album;
  private String model;
  private String connect;
}
