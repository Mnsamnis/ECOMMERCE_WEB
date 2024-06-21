package com.funky.services;

import java.util.List;

import com.funky.exception.ProductException;
import com.funky.model.Review;
import com.funky.model.User;
import com.funky.request.ReviewRequest;

public interface ReviewService {
	
	public Review createReview(ReviewRequest req, User user) throws ProductException;
	
	public List<Review> getAllReview(Long productId);
}
