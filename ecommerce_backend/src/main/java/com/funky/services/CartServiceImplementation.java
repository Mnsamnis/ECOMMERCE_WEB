package com.funky.services;

import org.springframework.stereotype.Service;

import com.funky.exception.ProductException;
import com.funky.model.Cart;
import com.funky.model.CartItem;
import com.funky.model.Product;
import com.funky.model.User;
import com.funky.repository.CartRepository;
import com.funky.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService {

	private CartRepository cartRepository;
	private CartItemService cartItemService;
	private ProductService productService;
	
	public CartServiceImplementation(CartRepository cartRepository,
			CartItemService cartItemService,
			ProductService productService) {
		this.cartItemService=cartItemService;
		this.productService=productService;
		this.cartRepository=cartRepository;
	}
	
	@Override
	public Cart createCart(User user) {
		Cart cart=new Cart();
		cart.setUser(user);
		
		return cartRepository.save(cart);
	}

	@Override
	public CartItem addCartItem(Long userId, AddItemRequest req) throws ProductException {
		
		Cart cart=cartRepository.findByUserId(userId);
		Product product=productService.findProductById(req.getProductId());
		
		CartItem isPresent=cartItemService.isCartItemExist(cart, product, req.getSize(), userId);
		
		if(isPresent==null) {
			CartItem cartItem=new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(req.getQuantity());
			cartItem.setUserId(userId);
			
			int price=req.getQuantity()*product.getDiscountedPrice();
			cartItem.setPrice(price);
			cartItem.setSize(req.getSize());
			
			CartItem createdCartItem=cartItemService.createCartItem(cartItem);
			cart.getCartItems().add(createdCartItem);
			System.out.println("Item Added To Cart Successfully Imple");
		}
		
		
		return isPresent;
	}

	@Override
	public Cart findUserCart(Long userId) {
		
		Cart cart=cartRepository.findByUserId(userId);
		int totalPrice=0;
		int totalDiscountedPrice=0;
		int totalItem=0;
		
		for(CartItem cartItem:cart.getCartItems()) {
			totalPrice=totalPrice+cartItem.getPrice();
			totalDiscountedPrice=totalDiscountedPrice+cartItem.getDiscountedPrice();
			totalItem=totalItem+cartItem.getQuantity();
		}
		
		cart.setTotalDiscountedPrice(totalDiscountedPrice);
		cart.setTotalPrice(totalPrice);
		cart.setDiscount(totalPrice-totalDiscountedPrice);
		cart.setTotalItem(totalItem);
		
		return cartRepository.save(cart);
	}
	
	

}
