package com.vecfonds.backend.service.impl;

import com.vecfonds.backend.entity.Role;
import com.vecfonds.backend.entity.ShoppingCart;
import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.exception.NotFoundException;
import com.vecfonds.backend.exception.ObjectExistsException;
import com.vecfonds.backend.payload.request.dto.UserDTO;
import com.vecfonds.backend.payload.response.UserResponse;
import com.vecfonds.backend.repository.RoleRepository;
import com.vecfonds.backend.repository.UserRepository;
import com.vecfonds.backend.service.RefreshTokenService;
import com.vecfonds.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, RefreshTokenService refreshTokenService, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenService = refreshTokenService;
        this.modelMapper = modelMapper;
    }

    @Override
    public Boolean createUser(UserDTO request) {
        if(userRepository.existsByPhoneNumber(request.getPhoneNumber())){
            return false;
        }

        User user = modelMapper.map(request, User.class);

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));
        ShoppingCart shoppingCart = new ShoppingCart();
        user.setShoppingCart(shoppingCart);

        userRepository.save(user);

        return true;
    }

    @Override
    public UserResponse getUser(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public List<UserResponse> getListUser() {
        List<User> listUser = userRepository.findAll();
        List<UserResponse> result = new ArrayList<>();
        for(User user : listUser){
            result.add(modelMapper.map(user, UserResponse.class));
        }
        return result;
    }


    @Override
    public UserResponse getUserByPhoneNumber(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber).get();
        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public UserResponse updateUser(String phoneNumber, UserDTO userDTO) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(()-> new NotFoundException("Không tìm thấy tài khoản trong hệ thống!"));

        if(userRepository.existsByPhoneNumber(userDTO.getPhoneNumber())){
            throw new ObjectExistsException("Số điện thoại mới đã được sử dụng!");
        }

        refreshTokenService.deleteByPhoneNumber(phoneNumber);

        user.setUsername(userDTO.getUsername());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());

        userRepository.save(user);

        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public String deleteUser(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(()-> new NotFoundException("Không tìm thấy tài khoản trong hệ thống!"));

        refreshTokenService.deleteByPhoneNumber(phoneNumber);

        userRepository.delete(user);

        return "Tài khoản với số điện thoại " + phoneNumber + " đã xóa thành công!";
    }
}
