package com.funky.services;


import com.funky.exception.UserException;
import com.funky.model.User;


public interface UserService {
	
	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;

}
