package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.ChangePasswordRequest;
import com.vecfonds.backend.payload.request.RegisterRequest;
import com.vecfonds.backend.payload.request.dto.UserDTO;
import com.vecfonds.backend.payload.response.UserResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    Boolean createUser(RegisterRequest request);

    UserDTO getUser(User userSession);

    UserResponse getListUser(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    UserDTO getUserByPhoneNumber(String phoneNumber);

    UserDTO updateUser(String phoneNumber, UserDTO request);

    String deleteUser(String phoneNumber);

    String changePassword(User userSession, ChangePasswordRequest changePasswordRequest);
}
