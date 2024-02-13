package com.vecfonds.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "role")
@Builder
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

}
