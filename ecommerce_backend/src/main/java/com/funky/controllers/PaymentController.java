package com.funky.controllers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.funky.exception.OrderException;
import com.funky.exception.UserException;
import com.funky.model.Orderr;
import com.funky.repository.CartItemRepository;
import com.funky.repository.OrderRepository;
import com.funky.response.ApiResponse;
import com.funky.response.PaymentLinkResponse;
import com.funky.services.CartItemService;
import com.funky.services.OrderService;
import com.funky.services.UserService;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/api")
public class PaymentController {
	
	   @Value("${razorpay.api.key}")
	    private String apiKey;

	    @Value("${razorpay.api.secret}")
	    private String apiSecret;
	
	private OrderService orderService;
	private UserService userService;
	private OrderRepository orderRepository;
	
	@Autowired
	private CartItemService cartItemService;
	
	@Autowired
	private CartItemRepository cartItemRepo;
	
	public PaymentController(OrderService orderService,UserService userService,OrderRepository orderRepository) {
		this.orderService=orderService;
		this.userService=userService;
		this.orderRepository=orderRepository;
	}
	
	@PostMapping("/payments/{orderId}")
	public ResponseEntity<PaymentLinkResponse>createPaymentLink(@PathVariable Long orderId,
			@RequestHeader("Authorization")String jwt) 
					throws RazorpayException, UserException, OrderException{
		
		Orderr order=orderService.findOrderById(orderId);
		 try {
		      // Instantiate a Razor pay client with your key ID and secret
		      RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

		      // Create a JSON object with the payment link request parameters
		      JSONObject paymentLinkRequest = new JSONObject();
		      paymentLinkRequest.put("amount",order.getTotalPrice()* 100);
		      paymentLinkRequest.put("currency","INR");    
//		      paymentLinkRequest.put("expire_by",1691097057);
//		      paymentLinkRequest.put("reference_id",order.getId().toString());
		     

		      // Create a JSON object with the customer details
		      JSONObject customer = new JSONObject();
		      customer.put("name",order.getUser().getFirstName()+" "+order.getUser().getLastName());
		      customer.put("contact",order.getUser().getMobile());
		      customer.put("email",order.getUser().getEmail());
		      paymentLinkRequest.put("customer",customer);
		      

		      // Create a JSON object with the notification settings
		      JSONObject notify = new JSONObject();
		      notify.put("sms",true);
		      notify.put("email",true);
		      paymentLinkRequest.put("notify",notify);

		      // Set the reminder settings
		      paymentLinkRequest.put("reminder_enable",true);

		      // Set the callback URL and method
		      paymentLinkRequest.put("callback_url","http://localhost:3000/payment/"+orderId);
		      paymentLinkRequest.put("callback_method","get");

		      // Create the payment link using the paymentLink.create() method
//		      PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);
		      
		      System.out.println("PaymentLinkRequest_____");
		      System.out.println(paymentLinkRequest.toString());
		      System.out.println("PaymentLinkRequest_____");
		     
		      
		      
		      order.setOrderId("order"+order.getId().toString());
		      System.out.println(order.getOrderId());
		      
		      
//		      String paymentLinkId = payment.get("id");
//		      String paymentLinkUrl = payment.get("short_url");
		      
		      PaymentLinkResponse res=new PaymentLinkResponse();
//		      res.setPayment_link_id(paymentLinkId);
//		      res.setPayment_link_url(paymentLinkUrl);
		     
		      
//		      PaymentLink fetchedPayment = razorpay.paymentLink.fetch(paymentLinkId);
		      System.out.println(order.getUser().getId());
		      cartItemService.removeAllCartItems(order.getUser().getId());
		      cartItemRepo.removeCartItemByUserId(order.getUser().getId());
		      
		      
		      Orderr order1=orderService.findOrderById(orderId);
		      order1.getPaymentDetails().setPaymentStatus("COMPLETED");
			  order1.setOrderStatus("PLACED");
			  System.out.println(order1.getPaymentDetails().getPaymentStatus()+"payment status ");
				orderRepository.save(order1);
		 
		     
		      
		   // Print the payment link ID and URL
//		      System.out.println("Payment link ID: " + paymentLinkId);
//		      System.out.println("Payment link URL: " + paymentLinkUrl);
//		      System.out.println("Order Id : "+fetchedPayment.get("order_id")+fetchedPayment);
		      
		      return new ResponseEntity<PaymentLinkResponse>(res,HttpStatus.CREATED);
		      
		    } catch (RazorpayException e) {
		    	
		      System.out.println("Error creating payment link: " + e.getMessage());
		      throw new RazorpayException(e.getMessage());
		    }
		
		
//		order_id
	}
	
  @GetMapping("/payments/{orderId}")
  public ResponseEntity<ApiResponse> redirectTo(@RequestParam("order_id")Long orderId) throws RazorpayException, OrderException {
//	  RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
	   Orderr order =orderService.findOrderById(orderId);
	
	  try {
		
		
//		Payment payment = razorpay.payments.fetch(paymentId);
//		System.out.println("payment details --- "+payment+payment.get("status"));
		
		 
//			System.out.println("payment details --- "+payment+payment.get("status"));
		  
//			order.getPaymentDetails().setPaymentId(paymentId);
			order.getPaymentDetails().setPaymentStatus("COMPLETED");
			order.setOrderStatus("PLACED");
//			order.setOrderItems(order.getOrderItems());
			System.out.println(order.getPaymentDetails().getPaymentStatus()+"payment status ");
			orderRepository.save(order);
		
		ApiResponse res=new ApiResponse("your order get placed", true);
	      return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
	      
	} catch (Exception e) {
		System.out.println("error payment -------- ");
//		new RedirectView("https://shopwithzosh.vercel.app/payment/failed");
		throw new RazorpayException(e.getMessage());
	}

  }

}

