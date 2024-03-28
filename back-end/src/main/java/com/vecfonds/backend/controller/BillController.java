package com.vecfonds.backend.controller;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.BillDTO;
import com.vecfonds.backend.payload.response.BillResponse;
import com.vecfonds.backend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/bill")
public class BillController {
    private final BillService billService;

    @Autowired
    public BillController(BillService billService) {
        this.billService = billService;
    }

    @PostMapping("/payMethod/{payMethod}")
    public ResponseEntity<?> addBill(@AuthenticationPrincipal User userSession, @PathVariable String payMethod){
        BillDTO billDTO = billService.createBill(userSession, payMethod);
        return new ResponseEntity<>( billDTO, HttpStatus.OK);
    }

    @GetMapping("user/list")
    public ResponseEntity<?> getListBillUser(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "createAt", required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "des", required = false) String sortOrder,
            @AuthenticationPrincipal User userSession
    ){
        BillResponse billResponse = billService.getListBillUser(pageNumber, pageSize, sortBy, sortOrder, userSession);
        return new ResponseEntity<>( billResponse, HttpStatus.OK);
    }

    @Secured("ADMIN")
    @GetMapping("/list")
    public ResponseEntity<?> getListBill(
            @RequestParam(name = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = "2", required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = "createAt", required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "des", required = false) String sortOrder
    ){
        BillResponse billResponse = billService.getListBill(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>( billResponse, HttpStatus.OK);
    }
}
