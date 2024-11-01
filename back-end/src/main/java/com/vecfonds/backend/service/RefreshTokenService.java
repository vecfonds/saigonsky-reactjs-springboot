package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.RefreshToken;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface RefreshTokenService {
    public Optional<RefreshToken> findByToken(String token);

    public RefreshToken generateRefreshToken(Long userId);

    public RefreshToken verifyExpiration(RefreshToken token);

    @Transactional
    public int deleteByPhoneNumber(String phoneNumber);
}
