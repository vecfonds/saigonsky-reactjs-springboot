package com.vecfonds.backend.service.impl;

import com.vecfonds.backend.entity.CartItem;
import com.vecfonds.backend.entity.Product;
import com.vecfonds.backend.entity.ShoppingCart;
import com.vecfonds.backend.entity.User;
import com.vecfonds.backend.exception.APIException;
import com.vecfonds.backend.exception.ObjectExistsException;
import com.vecfonds.backend.exception.ResourceNotFoundException;
import com.vecfonds.backend.payload.request.dto.*;
import com.vecfonds.backend.repository.CartItemRepository;
import com.vecfonds.backend.repository.ProductRepository;
import com.vecfonds.backend.repository.ShoppingCartRepository;
import com.vecfonds.backend.repository.UserRepository;
import com.vecfonds.backend.service.ShoppingCartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ShoppingCartServiceImpl implements ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    @Autowired
    public ShoppingCartServiceImpl(ShoppingCartRepository shoppingCartRepository, ModelMapper modelMapper, ProductRepository productRepository, CartItemRepository cartItemRepository, UserRepository userRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.modelMapper = modelMapper;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

    private ShoppingCartDTO convertShoppingCartDTO(ShoppingCart shoppingCart){
        ShoppingCartDTO shoppingCartDTO = modelMapper.map(shoppingCart, ShoppingCartDTO.class);

        List<CartItemDTO> cartItemDTOS = shoppingCart.getCartItems().stream()
                .map(p -> {
                    ProductDTO productDTO = modelMapper.map(p.getProduct(), ProductDTO.class);
                    CategoryDTO categoryDTO = modelMapper.map(p.getProduct().getCategory(), CategoryDTO.class);
                    productDTO.setCategory(categoryDTO);
                    DiscountDTO discountDTO = modelMapper.map(p.getProduct().getDiscount(), DiscountDTO.class);
                    productDTO.setDiscount(discountDTO);
                    CartItemDTO cartItemDTO = modelMapper.map(p, CartItemDTO.class);
                    cartItemDTO.setProduct(productDTO);
                    return cartItemDTO;
                }).toList();

        shoppingCartDTO.setCartItems(cartItemDTOS);

        return shoppingCartDTO;
    }

    @Override
    public ShoppingCartDTO addProductToCart(Long shoppingCartId, Long productId, Integer quantity, String size, String color) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(shoppingCartId)
                .orElseThrow(()-> new ResourceNotFoundException("ShoppingCart", "shoppingCartId", shoppingCartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        CartItem cartItem = cartItemRepository.findCartItemByShoppingCartIdAndProductIdAndSizeAndColor(shoppingCartId, productId, size, color);

        if (cartItem != null) {
            throw new ObjectExistsException("Sản phẩm " + product.getName() + " với size = " + size + ", color = " + color + " đã có trong giỏ hàng");
        }

        if (product.getQuantity() == 0) {
            throw new APIException(product.getName() + " hết hàng");
        }

        if (product.getQuantity() < quantity) {
            throw new APIException("Vui lòng đặt hàng " + product.getName()
                    + " với số lượng <= " + product.getQuantity() + ".");
        }

        CartItem newCartItem = new CartItem();

        newCartItem.setQuantity(quantity);
        newCartItem.setColor(color);
        newCartItem.setSize(size);
        newCartItem.setProduct(product);
        newCartItem.setShoppingCart(shoppingCart);
//        newCartItem.setDiscount(product.getDiscount());

        cartItemRepository.save(newCartItem);

//        product.setQuantity(product.getQuantity() - quantity);
//        productRepository.save(product);

        shoppingCart.setTotal(shoppingCart.getTotal() + product.getPrice()*quantity);

        shoppingCartRepository.save(shoppingCart);

        return convertShoppingCartDTO(shoppingCart);
    }

    @Override
    public ShoppingCartDTO getCart(User userSession) {
        User user = userRepository.findByPhoneNumber(userSession.getPhoneNumber()).get();
        ShoppingCart shoppingCart = user.getShoppingCart();

        return convertShoppingCartDTO(shoppingCart);
    }

    @Override
    public List<ShoppingCartDTO> getListCart() {
        List<ShoppingCart> shoppingCarts = shoppingCartRepository.findAll();
        return shoppingCarts.stream().map(this::convertShoppingCartDTO).toList();
    }

    @Override
    public ShoppingCartDTO updateProductQuantityInCart(Long shoppingCartId, Long productId, Integer quantity, String size, String color) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(shoppingCartId)
                .orElseThrow(()-> new ResourceNotFoundException("ShoppingCart", "shoppingCartId", shoppingCartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        if (product.getQuantity() == 0) {
            throw new APIException(product.getName() + " hết hàng");
        }

        if (product.getQuantity() < quantity) {
            throw new APIException("Vui lòng đặt hàng " + product.getName()
                    + " với số lượng <= " + product.getQuantity() + ".");
        }

        CartItem cartItem = cartItemRepository.findCartItemByShoppingCartIdAndProductIdAndSizeAndColor(shoppingCartId, productId, size, color);

        if (cartItem == null) {
            throw new APIException("Sản phẩm " + product.getName() + " với size = " + size + ", color = " + color + " không tìm thấy trong giỏ hàng");
        }

        shoppingCart.setTotal(shoppingCart.getTotal() - cartItem.getProduct().getPrice()*cartItem.getQuantity() + product.getPrice()*quantity);
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
        shoppingCartRepository.save(shoppingCart);

        return convertShoppingCartDTO(shoppingCart);
    }

    @Override
    public String deleteProductInCart(Long shoppingCartId, Long productId, String size, String color) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(shoppingCartId)
                .orElseThrow(()-> new ResourceNotFoundException("ShoppingCart", "shoppingCartId", shoppingCartId));

        CartItem cartItem = cartItemRepository.findCartItemByShoppingCartIdAndProductIdAndSizeAndColor(shoppingCartId, productId, size, color);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        if (cartItem == null) {
            throw new APIException("Sản phẩm " + product.getName() + " với size = " + size + ", color = " + color + " không tìm thấy trong giỏ hàng");
        }

        shoppingCart.setTotal(shoppingCart.getTotal() - cartItem.getProduct().getPrice()*cartItem.getQuantity());
        shoppingCartRepository.save(shoppingCart);

        cartItemRepository.deleteByIdCartItem(cartItem.getId());
//         cartItemRepository.deleteByShoppingCartIdAndProductIdAndSizeAndColor(shoppingCartId, productId, size, color);

        return "Sản phẩm " + product.getName() + " với size = " + size + ", color = " + color + " đã xóa khỏi giỏ hàng";
    }
}
