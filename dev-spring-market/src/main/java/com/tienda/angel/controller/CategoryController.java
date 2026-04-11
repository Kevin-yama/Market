package com.tienda.angel.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.tienda.angel.entity.Categories;
import com.tienda.angel.repository.CategoryRepository;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryRepository repository;

    public CategoryController(CategoryRepository repository) {
        this.repository = repository;
    }

    // 🔍 GET: listar todas las categorias
    @GetMapping
    public List<Categories> list() {
        System.out.println("Listando categorias");
        return repository.findAll();
    }

    @PostMapping
    public Categories create(@RequestBody Categories categoria) {
        System.out.println("Creando categoria: " + categoria);
        if (categoria.getNombre() == null || categoria.getNombre().isEmpty()) {
        throw new RuntimeException("El nombre es obligatorio");
    }
        return repository.save(categoria);
    }
}