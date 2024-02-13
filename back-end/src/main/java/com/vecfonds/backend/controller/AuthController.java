package com.vecfonds.backend.controller;

import com.vecfonds.backend.entity.RefreshToken;
import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.exception.TokenRefreshException;
import com.vecfonds.backend.payload.request.LoginRequest;
import com.vecfonds.backend.payload.request.dto.UserDTO;
import com.vecfonds.backend.payload.request.TokenRefreshRequest;
import com.vecfonds.backend.payload.response.JwtResponse;
import com.vecfonds.backend.payload.response.MessageResponse;
import com.vecfonds.backend.payload.response.TokenRefreshResponse;
import com.vecfonds.backend.repository.UserRepository;
import com.vecfonds.backend.service.JwtService;
import com.vecfonds.backend.service.RefreshTokenService;
import com.vecfonds.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    private final UserService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtService jwtService, RefreshTokenService refreshTokenService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO request){
        if(userService.createUser(request)){
            return new ResponseEntity<>(new MessageResponse("Đăng ký tài khoản thành công!"), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new MessageResponse("Số điện thoại đã được sử dụng!"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request){
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getPhoneNumber(),
                            request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtService.generateTokenFromPhoneNumber(request.getPhoneNumber());

//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User currentUser = userRepository.findByPhoneNumber(request.getPhoneNumber()).get();

            RefreshToken refreshToken = refreshTokenService.generateRefreshToken(currentUser.getId());

            return new ResponseEntity<>(new JwtResponse(token, refreshToken.getToken(), currentUser.getAuthorities()), HttpStatus.OK);
        }catch (AuthenticationException e){
            return new ResponseEntity<>(new MessageResponse("Số điện thoại hoặc mật khẩu không chính xác!"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest request){
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                            String token = jwtService.generateTokenFromPhoneNumber(user.getPhoneNumber());
                            return new ResponseEntity<>(new TokenRefreshResponse(token,requestRefreshToken), HttpStatus.OK);
                        }
                )
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal User userSession) {
        refreshTokenService.deleteByPhoneNumber(userSession.getPhoneNumber());
        return new ResponseEntity<>(new MessageResponse("Log out successful!"), HttpStatus.OK);
    }
}
