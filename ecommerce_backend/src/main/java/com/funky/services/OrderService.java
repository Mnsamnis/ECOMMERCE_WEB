package com.funky.services;

import java.util.List;

import com.funky.exception.OrderException;
import com.funky.model.Address;
import com.funky.model.Orderr;
import com.funky.model.User;

public interface OrderService {
	
	public Orderr createOrder(User user, Address shippingAddress);
	
	public Orderr findOrderById(Long orderId) throws OrderException;
	
	public List<Orderr> usersOrderHistory(Long userId);
	
	public Orderr placedOrder(Long orderId) throws OrderException;
	
	public Orderr confirmedOrder(Long orderId) throws OrderException;
	
	public Orderr shippedOrder(Long orderId) throws OrderException;
	
	public Orderr deliveredOrder(Long orderId) throws OrderException;
	
	public Orderr canceledOrder(Long orderId) throws OrderException;
	
	public List<Orderr> getAllOrders();
	
	public void deleteOrder(Long orderId) throws OrderException;
	
	
	

}
