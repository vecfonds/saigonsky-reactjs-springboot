package com.vecfonds.backend.entity;

import com.vecfonds.backend.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity(name = "refreshtoken")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Instant expireDate;
}
