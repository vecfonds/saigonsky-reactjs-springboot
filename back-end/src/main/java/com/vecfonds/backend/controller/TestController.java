package com.vecfonds.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@PreAuthorize("hasAuthority('USER')")
public class TestController {
//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("random")
    public ResponseEntity<String> random(){
        return new ResponseEntity<>("hello", HttpStatus.OK);
    }
}
