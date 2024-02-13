package com.vecfonds.backend.service;
import org.springframework.stereotype.Service;

@Service
public interface JwtService {
    public String getPhoneNumberFromJWT(String token);

    public Boolean validateToken(String token);

    public String generateTokenFromPhoneNumber(String phoneNumber);
}
