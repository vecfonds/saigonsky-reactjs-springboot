package com.vecfonds.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
//  private String type;

//  @OneToOne(orphanRemoval = true)
//  @JoinColumn(name = "discount_id", referencedColumnName = "id")
//  private Discount discount;

  @OneToMany(mappedBy = "product", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER, orphanRemoval = true)
  private List<Image> images = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
  private List<CartItem> cartItems = new ArrayList<>();

  @OneToMany(mappedBy = "product", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  private List<BillDetail> billDetails = new ArrayList<>();

  @Column(name = "price", nullable = false)
  private Double price;

  private Integer quantity;
  private String description;
  private String material;
  private String style;
  private String album;
  private String model;
  private String connect;

  @CreationTimestamp
  private LocalDateTime createAt;

  @UpdateTimestamp
  private LocalDateTime modifiedAt;
}
