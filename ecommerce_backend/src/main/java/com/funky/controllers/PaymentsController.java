package com.funky.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.funky.repository.OrderRepository;
import com.funky.services.OrderService;
import com.funky.services.UserService;

@RestController
@RequestMapping("/api")
public class PaymentsController {
	@Autowired
	private OrderService orderService;
	@Autowired
	private UserService userService;
	@Autowired
	private OrderRepository orderRepository;
	
	

}
