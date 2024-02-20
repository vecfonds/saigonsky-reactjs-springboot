package com.vecfonds.backend.service.impl;

import com.vecfonds.backend.entity.RefreshToken;
import com.vecfonds.backend.exception.TokenRefreshException;
import com.vecfonds.backend.repository.RefreshTokenRepository;
import com.vecfonds.backend.repository.UserRepository;
import com.vecfonds.backend.service.RefreshTokenService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Component
public class RefreshTokenServiceImpl implements RefreshTokenService {
    @Value("${application.security.jwt.refresh-token}")
    private Long refreshTokenExpire;

    private RefreshTokenRepository refreshTokenRepository;
    public UserRepository userRepository;

    @Autowired
    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public Optional<RefreshToken> findByToken(String token){
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken generateRefreshToken(Long userId){
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findById(userId).get());
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpireDate(Instant.now().plusMillis(refreshTokenExpire));

        refreshToken = refreshTokenRepository.save(refreshToken);

        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token){
        if(token.getExpireDate().compareTo(Instant.now())<0){
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token đã hết hạn. Vui lòng đăng nhập lại");
        }
        return token;
    }

    @Transactional
    public int deleteByUserId(Long userId){
        return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
    }

    @Transactional
    public int deleteByPhoneNumber(String phoneNumber){
        return refreshTokenRepository.deleteByUser(userRepository.findByPhoneNumber(phoneNumber).get());
    }
}
