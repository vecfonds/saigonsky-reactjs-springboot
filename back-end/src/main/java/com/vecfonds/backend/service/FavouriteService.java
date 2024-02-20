package com.vecfonds.backend.service;

import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.payload.request.dto.ProductDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavouriteService {
    ProductDTO addProductToFavourite(User userSession, Long productId);

    String deleteProductInFavourite(User userSession, Long productId);

    List<ProductDTO> getFavourite(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, User userSession);
}
