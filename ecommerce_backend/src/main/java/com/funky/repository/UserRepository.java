package com.funky.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.funky.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);
	
}
