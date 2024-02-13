package com.vecfonds.backend.controller;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.UserDTO;
import com.vecfonds.backend.payload.response.MessageResponse;
import com.vecfonds.backend.payload.response.UserResponse;
import com.vecfonds.backend.repository.UserRepository;
import com.vecfonds.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class UserController {
    private final UserService userService;

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper,
                          UserRepository userRepository) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @GetMapping("user")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal User userSession) {
//        SecurityContext context = SecurityContextHolder.getContext();
//        Authentication authentication = context.getAuthentication();
//
//        User user = (User) authentication.getPrincipal();

//        User user = userRepository.findByPhoneNumber(userSession.getPhoneNumber()).get();
        UserResponse userResponse = userService.getUser(userSession);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @PutMapping("user")
    public ResponseEntity<?> updateUser(@AuthenticationPrincipal User userSession, @RequestBody UserDTO request){
        UserResponse userResponse = userService.updateUser(userSession.getPhoneNumber(), request);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @DeleteMapping("user")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal User userSession){
        String message = userService.deleteUser(userSession.getPhoneNumber());
        return new ResponseEntity<>(new MessageResponse(message), HttpStatus.OK);
    }


    @Secured("ADMIN")
    @GetMapping("admin/users")
    public ResponseEntity<?> getListUser(){
        List<UserResponse> listUser = userService.getListUser();
        return new ResponseEntity<>(listUser, HttpStatus.OK);
    }

    @Secured("ADMIN")
    @GetMapping("admin/users/{phoneNumber}")
    public ResponseEntity<?> getUserByPhoneNumber(@PathVariable String phoneNumber){
        UserResponse userResponse = userService.getUserByPhoneNumber(phoneNumber);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }
}
