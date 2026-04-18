package com.market.angel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.market.angel.entity.Products;

public interface ProductRepository extends JpaRepository<Products, Integer> {
}