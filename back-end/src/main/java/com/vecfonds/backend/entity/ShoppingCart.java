package com.vecfonds.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

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

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "shoppingCart")
  private List<CartItem> cartItems = new ArrayList<>();

  @Column(name = "total", nullable = false, precision = 19, scale = 3)
  private BigDecimal total = BigDecimal.valueOf(0);

  @CreationTimestamp
  private LocalDateTime createAt;

  @UpdateTimestamp
  private LocalDateTime modifiedAt;
}
