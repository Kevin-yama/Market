package com.tienda.angel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tienda.angel.entity.Categories;

public interface CategoryRepository extends JpaRepository<Categories, Integer> {
}