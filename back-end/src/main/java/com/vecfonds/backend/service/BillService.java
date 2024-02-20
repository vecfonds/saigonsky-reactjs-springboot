package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.BillDTO;
import com.vecfonds.backend.payload.response.BillResponse;
import org.springframework.stereotype.Service;

@Service
public interface BillService {
    BillDTO createBill(User userSession, String payMethod);

    BillResponse getListBillUser(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, User userSession);

    BillResponse getListBill(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
}
