package com.vecfonds.backend.service.impl;

import com.vecfonds.backend.entity.Product;
import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.exception.ResourceNotFoundException;
import com.vecfonds.backend.payload.request.dto.ProductDTO;
import com.vecfonds.backend.repository.ProductRepository;
import com.vecfonds.backend.repository.UserRepository;
import com.vecfonds.backend.service.FavouriteService;
import com.vecfonds.backend.service.ProductService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Transactional
@Component
public class FavouriteServiceImpl implements FavouriteService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final ProductService productService;

    @Autowired
    public FavouriteServiceImpl(UserRepository userRepository, ProductRepository productRepository, ModelMapper modelMapper, ProductService productService) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
        this.productService = productService;
    }

    @Override
    public ProductDTO addProductToFavourite(User userSession, Long productId) {
        User user = userRepository.findByPhoneNumber(userSession.getPhoneNumber()).get();
        List<Product> products = user.getProducts();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        products.add(product);
        user.setProducts(products);

        return modelMapper.map(product, ProductDTO.class);
    }

    @Override
    public String deleteProductInFavourite(User userSession, Long productId) {
        User user = userRepository.findByPhoneNumber(userSession.getPhoneNumber()).get();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
        user.getProducts().remove(product);

        return "Product với name = " + product.getName() +" đã xóa khỏi mục ưa thích!";
    }

    @Override
    public List<ProductDTO> getFavourite(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, User userSession) {
        User user = userRepository.findByPhoneNumber(userSession.getPhoneNumber()).get();
        List<Product> products = user.getProducts();

        return products.stream().map(productService::convertProductDTO).toList();
    }
}
