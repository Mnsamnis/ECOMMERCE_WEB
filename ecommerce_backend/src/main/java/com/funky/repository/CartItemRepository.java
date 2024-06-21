package com.funky.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.funky.model.Cart;
import com.funky.model.CartItem;
import com.funky.model.Product;

import jakarta.transaction.Transactional;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
	
	@Query("SELECT ci FROM CartItem ci WHERE ci.cart=:cart "+
	"AND ci.product=:product AND ci.size=:size AND ci.userId=:userId")
	public CartItem isCartItemExist(@Param("cart") Cart cart,@Param("product") Product product,
			@Param("size") String size, @Param("userId") Long userId);
	
	 @Modifying
     @Transactional
	 @Query("DELETE FROM CartItem c WHERE c.userId = :userId")
	 public void removeCartItemByUserId(@Param("userId") Long userId);
	
}
