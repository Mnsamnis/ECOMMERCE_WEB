package com.funky.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.funky.exception.ProductException;
import com.funky.model.Product;
import com.funky.model.Review;
import com.funky.model.User;
import com.funky.repository.ProductRepository;
import com.funky.repository.ReviewRepository;
import com.funky.request.ReviewRequest;

@Service
public class ReviewServiceImpl implements ReviewService {
	
	private ReviewRepository reviewRepo;
	private ProductService productService;
	private ProductRepository productRepo;
	
	public ReviewServiceImpl( ReviewRepository reviewRepo,
	 ProductService productService,
	 ProductRepository productRepo) {
		
		this.reviewRepo=reviewRepo;
		this.productService=productService;
		this.productRepo=productRepo;
		
	}
	
	
	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
		
		Product product=productService.findProductById(req.getProductId());
		Review review=new Review();
		review.setUser(user);
		review.setProduct(product);
		review.setReview(req.getReview());
		review.setCreatedAt(LocalDateTime.now());
		
		return reviewRepo.save(review);
	}

	@Override
	public List<Review> getAllReview(Long productId) {
		
		return reviewRepo.getAllProductsReview(productId);
	}

}
