package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.UserDTO;
import com.vecfonds.backend.payload.response.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    Boolean createUser(UserDTO request);

    UserResponse getUser(User user);

    List<UserResponse> getListUser();

    UserResponse getUserByPhoneNumber(String phoneNumber);

    UserResponse updateUser(String phoneNumber, UserDTO request);

    String deleteUser(String phoneNumber);
}