package com.funky.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.funky.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}

