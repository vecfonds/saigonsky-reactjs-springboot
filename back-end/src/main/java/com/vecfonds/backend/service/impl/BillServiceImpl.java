package com.vecfonds.backend.service.impl;

import com.vecfonds.backend.entity.*;
import com.vecfonds.backend.exception.APIException;
import com.vecfonds.backend.payload.request.dto.*;
import com.vecfonds.backend.payload.response.BillResponse;
import com.vecfonds.backend.repository.*;
import com.vecfonds.backend.service.BillService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Component
public class BillServiceImpl implements BillService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BillRepository billRepository;

    private final CartItemRepository cartItemRepository;

    @Autowired
    public BillServiceImpl(UserRepository userRepository, ModelMapper modelMapper, BillRepository billRepository, CartItemRepository cartItemRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.billRepository = billRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public BillDTO convertBillDTO(Bill bill){
        BillDTO billDTO = modelMapper.map(bill, BillDTO.class);

        List<BillDetailDTO> billDetailDTOS = bill.getBillDetails().stream()
                .map(p -> {
                    ProductDTO productDTO = modelMapper.map(p.getProduct(), ProductDTO.class);
                    CategoryDTO categoryDTO = modelMapper.map(p.getProduct().getCategory(), CategoryDTO.class);
                    productDTO.setCategory(categoryDTO);
                    productDTO.setImages(p.getProduct().getImages().stream().map(element -> modelMapper.map(element, ImageDTO.class)).toList());
                    BillDetailDTO billDetailDTO = modelMapper.map(p, BillDetailDTO.class);
                    billDetailDTO.setProduct(productDTO);
                    return billDetailDTO;
                }).toList();

        billDTO.setBillDetails(billDetailDTOS);
        return billDTO;
    }

    @Override
    public BillDTO createBill(User userSession, String payMethod) {
        User user = userRepository.findByPhoneNumber(userSession.getPhoneNumber()).get();
        ShoppingCart shoppingCart = user.getShoppingCart();

        Bill newBill = new Bill();
        newBill.setUsername(user.getUsername());
        newBill.setPhoneNumber(user.getPhoneNumber());
        newBill.setAddress(user.getAddress());
        newBill.setTotal(shoppingCart.getTotal());
        newBill.setPayMethod(payMethod);

        Bill billSaved = billRepository.save(newBill);

        List<BillDetail> billDetails = new ArrayList<>();

        List<CartItem> cartItems = shoppingCart.getCartItems();

        if(cartItems.isEmpty()){
            throw new APIException("Giỏ hàng trống!");
        }

        for(CartItem cartItem:cartItems){
            Product product = cartItem.getProduct();

            BillDetail billDetail = new BillDetail();
            billDetail.setBill(billSaved);
            billDetail.setProduct(product);
            billDetail.setItemPrice(product.getPrice());
            if (product.getQuantity() < cartItem.getQuantity()) {
                throw new APIException("Vui lòng đặt hàng " + product.getName()
                        + " với số lượng <= " + product.getQuantity() + ".");
            }
            billDetail.setQuantity(cartItem.getQuantity());
            billDetail.setSize(cartItem.getSize());
            billDetail.setColor(cartItem.getColor());
            billDetails.add(billDetail);

            product.setQuantity(product.getQuantity()-cartItem.getQuantity());
        }
        billSaved.setBillDetails(billDetails);

        cartItemRepository.deleteByShoppingCartId(shoppingCart.getId());
        shoppingCart.setTotal(0.0);

        return convertBillDTO(billSaved);
    }

    @Override
    public BillResponse getListBillUser(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, User userSession) {
        User user = userRepository.findByPhoneNumber(userSession.getPhoneNumber()).get();
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Bill> billPage = billRepository.findByPhoneNumber(user.getPhoneNumber(), pageable);

        List<Bill> billList = billPage.getContent();

        List<BillDTO> billDTOS = billList.stream().map(this::convertBillDTO).toList();

        BillResponse billResponse = modelMapper.map(billPage, BillResponse.class);
        billResponse.setContent(billDTOS);

        return billResponse;
    }

    @Override
    public BillResponse getListBill(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Bill> billPage = billRepository.findAll(pageable);

        List<Bill> billList = billPage.getContent();

        List<BillDTO> billDTOS = billList.stream().map(this::convertBillDTO).toList();

        BillResponse billResponse = modelMapper.map(billPage, BillResponse.class);
        billResponse.setContent(billDTOS);

        return billResponse;
    }
}
