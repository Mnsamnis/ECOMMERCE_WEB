package com.funky.services;

import java.util.List;

import com.funky.exception.ProductException;
import com.funky.model.Rating;
import com.funky.model.User;
import com.funky.request.RatingRequest;

public interface RatingService {
	
	public Rating createRating(RatingRequest req, User user) throws ProductException;
	
	public List<Rating> getProductRating(Long productId);
	

}
