package com.vecfonds.backend.service.impl;

import com.vecfonds.backend.entity.*;
import com.vecfonds.backend.exception.ObjectExistsException;
import com.vecfonds.backend.exception.ResourceNotFoundException;
import com.vecfonds.backend.payload.request.dto.CategoryDTO;
import com.vecfonds.backend.payload.request.dto.ImageDTO;
import com.vecfonds.backend.payload.request.dto.ProductDTO;
import com.vecfonds.backend.payload.response.ProductResponse;
import com.vecfonds.backend.repository.*;
import com.vecfonds.backend.service.FileService;
import com.vecfonds.backend.service.ProductService;
import com.vecfonds.backend.service.ShoppingCartService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Transactional
@Component
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;
    private final ShoppingCartService shoppingCartService;
    private final ShoppingCartRepository shoppingCartRepository;
    private final FileService fileService;
    private final BillRepository billRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository, ModelMapper modelMapper, ShoppingCartService shoppingCartService, ShoppingCartRepository shoppingCartRepository, FileService fileService, BillRepository billRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
        this.shoppingCartService = shoppingCartService;
        this.shoppingCartRepository = shoppingCartRepository;
        this.fileService = fileService;
        this.billRepository = billRepository;
    }

    @Override
    public ProductDTO convertProductDTO(Product product){
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        productDTO.setImages(product.getImages().stream().map(element -> modelMapper.map(element, ImageDTO.class)).toList());
        productDTO.setCategory(modelMapper.map(product.getCategory(), CategoryDTO.class));
//        DiscountDTO discountDTO = modelMapper.map(product.getDiscount(), DiscountDTO.class);
//        productDTO.setDiscount(discountDTO);
        return productDTO;
    }

    @Override
    public ProductDTO createProduct(Long categoryId, Product product) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category", "categoryId", categoryId));

        for(Product item:category.getProducts()){
            if(item.getName().equals(product.getName()) && item.getDescription().equals(product.getDescription())){
                throw new ObjectExistsException("Product đã tồn tại trong category");
            }
        }

        product.setCategory(category);

        Product productSaved = productRepository.save(product);

        return convertProductDTO(productSaved);
    }

    @Override
    public ProductResponse getListProduct(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> productPage =productRepository.findAll(pageable);

        List<Product> productList = productPage.getContent();

        List<ProductDTO> productDTOS = productList.stream().map(this::convertProductDTO).toList();

        ProductResponse productResponse = modelMapper.map(productPage, ProductResponse.class);
        productResponse.setContent(productDTOS);

        return productResponse;
    }

    @Override
    public ProductResponse getListProductByCategory(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, Long categoryId) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category", "categoryId", categoryId));

        Page<Product> productPage =productRepository.findByCategory(category, pageable);

        List<Product> productList = productPage.getContent();

        List<ProductDTO> productDTOS = productList.stream().map(this::convertProductDTO).toList();

        ProductResponse productResponse = modelMapper.map(productPage, ProductResponse.class);
        productResponse.setContent(productDTOS);

        return productResponse;
    }

    @Override
    public ProductResponse getListProductByKeyword(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> productPage =productRepository.findByNameContaining(keyword, pageable);

        List<Product> productList = productPage.getContent();

        if(productList.isEmpty()){
            throw new ResourceNotFoundException("Product", "keyword", keyword);
        }

        List<ProductDTO> productDTOS = productList.stream().map(this::convertProductDTO).toList();

        ProductResponse productResponse = modelMapper.map(productPage, ProductResponse.class);
        productResponse.setContent(productDTOS);

        return productResponse;
    }

    @Override
    public ProductDTO updateProduct(Long productId, Product product) {
        Product productInDB = productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product", "productId", productId));

        product.setCategory(productInDB.getCategory());
        product.setCartItems(productInDB.getCartItems());
        product.setBillDetails(productInDB.getBillDetails());

        Product productSaved = productRepository.save(product);
        return convertProductDTO(productSaved);
    }

    @Override
    public String deleteProduct(Long productId) {
        Product productInDB = productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product", "productId", productId));

        List<Bill> bills = billRepository.findBillByProductId(productId);
        if(!bills.isEmpty()){
            throw new ObjectExistsException("Product với productId="+productId+" có chứa giao dịch");
        }

        List<ShoppingCart> shoppingCarts = shoppingCartRepository.findShoppingCartByProductId(productId);
        for(ShoppingCart shoppingCart:shoppingCarts){
            shoppingCartService.deleteProductInCart(shoppingCart.getId(), productId, "all", "all");
        }

        productRepository.delete(productInDB);

        return "Sản phẩm với productId " + productId + " đã xóa thành công!";
    }

    @Override
    public ProductDTO createProductImageLink(Long productId, Image image) {
        Product productInDB = productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product", "productId", productId));

        image.setProduct(productInDB);

        List<Image> images = productInDB.getImages();
        images.add(image);
        productInDB.setImages(images);
        Product productUpdated = productRepository.save(productInDB);

        return convertProductDTO(productUpdated);
    }

    @Override
    public ProductDTO createProductImageMultipartFile(Long productId, MultipartFile image, Integer main) throws IOException {
        Product productInDB = productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product", "productId", productId));

        String fileName = fileService.uploadImage("images/", image);

        Image newImage = new Image();
        newImage.setContent(fileName);
        newImage.setMain(main);
        newImage.setProduct(productInDB);

        List<Image> images = productInDB.getImages();
        images.add(newImage);
        productInDB.setImages(images);
        Product productUpdated = productRepository.save(productInDB);

        return convertProductDTO(productUpdated);
    }

    @Override
    public ProductDTO getProduct(Long productId) {
        Product productInDB = productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product", "productId", productId));
        return convertProductDTO(productInDB);
    }
}
