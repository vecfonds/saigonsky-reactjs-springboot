package com.vecfonds.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "shopping_cart")
@Builder
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class ShoppingCart {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "total", nullable = false)
  private Double total = 0.0;

  @OneToMany(mappedBy = "shoppingCart", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = true)
  private List<CartItem> cartItems = new ArrayList<>();

  @CreationTimestamp
  private LocalDateTime createAt;

  @UpdateTimestamp
  private LocalDateTime modifiedAt;
}
