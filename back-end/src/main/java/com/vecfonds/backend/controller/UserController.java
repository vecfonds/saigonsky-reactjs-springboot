package com.vecfonds.backend.controller;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.UserDTO;
import com.vecfonds.backend.payload.response.MessageResponse;
import com.vecfonds.backend.payload.response.UserResponse;
import com.vecfonds.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("user")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal User userSession) {
//        SecurityContext context = SecurityContextHolder.getContext();
//        Authentication authentication = context.getAuthentication();
//
//        User user = (User) authentication.getPrincipal();

        UserDTO userDTO = userService.getUser(userSession);
        return new ResponseEntity<>(userDTO, HttpStatus.FOUND);
    }

    @PutMapping("user")
    public ResponseEntity<?> updateUser(@AuthenticationPrincipal User userSession, @RequestBody UserDTO request){
        UserDTO userDTO = userService.updateUser(userSession.getPhoneNumber(), request);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @DeleteMapping("user")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal User userSession){
        String message = userService.deleteUser(userSession.getPhoneNumber());
        return new ResponseEntity<>(new MessageResponse(message), HttpStatus.OK);
    }


    @Secured("ADMIN")
    @GetMapping("admin/users")
    public ResponseEntity<?> getListUser(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "asc", required = false) String sortOrder
    ){
        UserResponse userResponse = userService.getListUser(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(userResponse, HttpStatus.FOUND);
    }

    @Secured("ADMIN")
    @GetMapping("admin/users/{phoneNumber}")
    public ResponseEntity<?> getUserByPhoneNumber(@PathVariable String phoneNumber){
        UserDTO userDTO = userService.getUserByPhoneNumber(phoneNumber);
        return new ResponseEntity<>(userDTO, HttpStatus.FOUND);
    }
}
