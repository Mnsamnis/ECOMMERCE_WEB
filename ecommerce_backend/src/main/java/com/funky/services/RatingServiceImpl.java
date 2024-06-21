package com.funky.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.funky.exception.ProductException;
import com.funky.model.Product;
import com.funky.model.Rating;
import com.funky.model.User;
import com.funky.repository.RatingRepository;
import com.funky.request.RatingRequest;

@Service
public class RatingServiceImpl implements RatingService {

	private RatingRepository ratingRepository;
	private ProductService productService;
	
	public RatingServiceImpl(RatingRepository ratingRepository,
			ProductService productService) {
		this.productService=productService;
		this.ratingRepository=ratingRepository;
	}
	
	
	
	@Override
	public Rating createRating(RatingRequest req, User user) throws ProductException {
		Product product=productService.findProductById(req.getProductId());
		
		Rating rating=new Rating();
		rating.setProduct(product);
		rating.setUser(user);
		rating.setRating(req.getRating());
		rating.setCreatedAt(LocalDateTime.now());
		return ratingRepository.save(rating);
	}

	@Override
	public List<Rating> getProductRating(Long productId) {
		// TODO Auto-generated method stub
		return ratingRepository.getAllProductsRating(productId);
	}

}
