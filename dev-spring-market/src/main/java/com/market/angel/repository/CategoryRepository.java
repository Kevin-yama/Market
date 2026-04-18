package com.market.angel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.market.angel.entity.Categories;

public interface CategoryRepository extends JpaRepository<Categories, Integer> {
}