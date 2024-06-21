package com.funky.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.funky.exception.OrderException;
import com.funky.model.Orderr;
import com.funky.response.ApiResponse;
import com.funky.services.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {
	
	private OrderService orderService;
	
	public AdminOrderController(OrderService orderService) {
		this.orderService=orderService;
	}
	
	@GetMapping("/")
	public ResponseEntity<List<Orderr>> getAllOrdersHandler(){
		List<Orderr> orders=orderService.getAllOrders();
		
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/confirmed")
	public ResponseEntity<Orderr> ConfirmedOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException{
		Orderr order=orderService.confirmedOrder(orderId);
		return new ResponseEntity<Orderr>(order,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/ship")
	public ResponseEntity<Orderr> shippedOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException{
		Orderr order=orderService.shippedOrder(orderId);
		return new ResponseEntity<Orderr>(order,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/deliver")
	public ResponseEntity<Orderr> deliveredOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException{
		Orderr order=orderService.deliveredOrder(orderId);
		return new ResponseEntity<Orderr>(order,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Orderr> canceledOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException{
		Orderr order=orderService.canceledOrder(orderId);
		return new ResponseEntity<Orderr>(order,HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/{orderId}/delete")
	public ResponseEntity<ApiResponse> deleteOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws OrderException{
		orderService.deleteOrder(orderId);
		ApiResponse res=new ApiResponse("Order Deleted Successfully",true);
		System.out.println("delete method working....");
		return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
	}

}
