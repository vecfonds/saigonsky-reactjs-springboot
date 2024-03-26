package com.vecfonds.backend.service.impl;

import com.vecfonds.backend.entity.Role;
import com.vecfonds.backend.entity.ShoppingCart;
import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.exception.IllegalStateException;
import com.vecfonds.backend.exception.ObjectExistsException;
import com.vecfonds.backend.payload.request.ChangePasswordRequest;
import com.vecfonds.backend.payload.request.RegisterRequest;
import com.vecfonds.backend.payload.request.dto.ShoppingCartDTO;
import com.vecfonds.backend.payload.request.dto.UserDTO;
import com.vecfonds.backend.payload.response.UserResponse;
import com.vecfonds.backend.repository.CartItemRepository;
import com.vecfonds.backend.repository.RoleRepository;
import com.vecfonds.backend.repository.UserRepository;
import com.vecfonds.backend.service.RefreshTokenService;
import com.vecfonds.backend.service.ShoppingCartService;
import com.vecfonds.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Component
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;
    private final ModelMapper modelMapper;
    private final ShoppingCartService shoppingCartService;
    private final CartItemRepository cartItemRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, RefreshTokenService refreshTokenService, ModelMapper modelMapper, ShoppingCartService shoppingCartService, CartItemRepository cartItemRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenService = refreshTokenService;
        this.modelMapper = modelMapper;
        this.shoppingCartService = shoppingCartService;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public Boolean createUser(RegisterRequest request) {
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

    public UserDTO convertUserDTO(User user){
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        ShoppingCartDTO shoppingCartDTO = shoppingCartService.convertShoppingCartDTO(user.getShoppingCart());
        userDTO.setShoppingCart(shoppingCartDTO);
        return userDTO;
    }

    @Override
    public UserDTO getUser(User userSession) {
        User user = userRepository.findByPhoneNumber(userSession.getPhoneNumber()).get();
        return convertUserDTO(user);
    }

    @Override
    public UserResponse getListUser(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize,sortByAndOrder);

        Page<User> pageUser = userRepository.findAll(pageable);

        List<User> listUser = pageUser.getContent();

        List<UserDTO> userDTOS = listUser.stream().map(this::convertUserDTO).toList();

        UserResponse userResponse = modelMapper.map(pageUser, UserResponse.class);
        userResponse.setContent(userDTOS);
        return userResponse;
    }


    @Override
    public UserDTO getUserByPhoneNumber(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber).get();
        return convertUserDTO(user);
    }

    @Override
    public UserDTO updateUser(String phoneNumber, UserDTO userDTO) {
        User user = userRepository.findByPhoneNumber(phoneNumber).get();

        if(!Objects.equals(phoneNumber, userDTO.getPhoneNumber()) && userRepository.existsByPhoneNumber(userDTO.getPhoneNumber())){
            throw new ObjectExistsException("Số điện thoại trên đã được sử dụng!");
        }

        refreshTokenService.deleteByPhoneNumber(phoneNumber);

        user.setUsername(userDTO.getUsername());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setAddress(userDTO.getAddress());

        user = userRepository.save(user);

        return convertUserDTO(user);
    }

    @Override
    public String deleteUser(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber).get();

        refreshTokenService.deleteByPhoneNumber(phoneNumber);

        cartItemRepository.deleteByShoppingCartId(user.getShoppingCart().getId());

        userRepository.delete(user);

        return "Tài khoản với số điện thoại " + phoneNumber + " đã xóa thành công!";
    }

    @Override
    public String changePassword(User userSession, ChangePasswordRequest changePasswordRequest) {
        User user = userRepository.findByPhoneNumber(userSession.getPhoneNumber()).get();

        if(!passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), user.getPassword())){
            throw new IllegalStateException("Mật khẩu không chính xác!");
        }

        if(!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmationPassword())){
            throw new IllegalStateException("Mật khẩu mới không khớp!");
        }

        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        userRepository.save(user);
        return "Thay đổi mật khẩu thành công!";
    }
}
