package com.vecfonds.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bill")
@Builder
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "total", nullable = false)
    private Double total = 0.0;

    @Column(name = "pay-method", nullable = false)
    private String payMethod;

    private String status;

    private String note;

    @OneToMany(mappedBy = "bill", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, orphanRemoval = true)
    private List<BillDetail> billDetails = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_bill_user"))
    private User user;

    @CreationTimestamp
    private LocalDateTime createAt;

    @UpdateTimestamp
    private LocalDateTime modifiedAt;
}
