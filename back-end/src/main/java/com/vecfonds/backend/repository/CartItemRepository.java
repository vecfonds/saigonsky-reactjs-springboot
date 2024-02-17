package com.vecfonds.backend.repository;

import com.vecfonds.backend.entity.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("SELECT ci FROM CartItem ci WHERE ci.shoppingCart.id = ?1 AND ci.product.id = ?2 AND ci.size = ?3 AND ci.color = ?4")
    CartItem findCartItemByShoppingCartIdAndProductIdAndSizeAndColor(Long shoppingCartId, Long productId, String size, String color);

    @Query("SELECT ci FROM CartItem ci WHERE ci.shoppingCart.id = ?1 AND ci.product.id = ?2")
    List<CartItem> findCartItemByShoppingCartIdAndProductId(Long shoppingCartId, Long productId);

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem ci WHERE ci.id = :id")
    void deleteByCartItemId(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem ci WHERE ci.shoppingCart.id = ?1")
    void deleteByShoppingCartId(Long shoppingCartId);
}
