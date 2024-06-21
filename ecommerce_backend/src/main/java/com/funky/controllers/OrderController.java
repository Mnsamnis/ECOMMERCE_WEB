package com.funky.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.funky.exception.OrderException;
import com.funky.exception.UserException;
import com.funky.model.Address;
import com.funky.model.Orderr;
import com.funky.model.User;
import com.funky.services.OrderService;
import com.funky.services.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	private OrderService orderService;
	private UserService userService;
	
	public OrderController(OrderService orderService,UserService userService) {
		this.orderService=orderService;
		this.userService=userService;
	}
	
	@PostMapping("/")
	public ResponseEntity<Orderr> createOrderHandler(@RequestBody Address spippingAddress,
			@RequestHeader("Authorization")String jwt) throws UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Orderr order =orderService.createOrder(user, spippingAddress);
		
		return new ResponseEntity<Orderr>(order,HttpStatus.OK);
		
	}
	
	@GetMapping("/user")
	public ResponseEntity< List<Orderr>> usersOrderHistoryHandler(@RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		List<Orderr> orders=orderService.usersOrderHistory(user.getId());
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity< Orderr> findOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Orderr orders=orderService.findOrderById(orderId);
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}

}

