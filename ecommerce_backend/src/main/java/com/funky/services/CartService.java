package com.funky.services;

import com.funky.exception.ProductException;
import com.funky.model.Cart;
import com.funky.model.CartItem;
import com.funky.model.User;
import com.funky.request.AddItemRequest;

public interface CartService {
	
	public Cart createCart(User user);
	
	public CartItem addCartItem(Long userId,AddItemRequest req) throws ProductException;

	public Cart findUserCart(Long userId);
	
	
}
