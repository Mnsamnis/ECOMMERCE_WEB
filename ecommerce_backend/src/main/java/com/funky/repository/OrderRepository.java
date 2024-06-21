package com.funky.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.funky.model.Orderr;

public interface OrderRepository extends JpaRepository<Orderr, Long> {

	@Query("SELECT o FROM Orderr o WHERE o.user.id = :userId AND (o.orderStatus = 'PLACED' OR o.orderStatus = 'CONFIRMED' OR o.orderStatus = 'SHIPPED' OR o.orderStatus = 'DELIVERED')")
	public List<Orderr> getUsersOrders(@Param("userId") Long userId);
	
	List<Orderr> findAllByOrderByCreatedAtDesc();
}