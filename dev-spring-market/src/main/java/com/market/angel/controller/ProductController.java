package com.market.angel.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.market.angel.entity.Categories;
import com.market.angel.entity.Products;
import com.market.angel.entity.UnitsMeasurements;
import com.market.angel.repository.CategoryRepository;
import com.market.angel.repository.ProductRepository;
import com.market.angel.repository.UnitsMeasurementsRepository;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository repository;
    private final CategoryRepository categoryRepository;
    private final UnitsMeasurementsRepository unitsMeasurementsRepository;

    // 🔍 GET: listar todos los productos
    @GetMapping
    public List<Products> list() {
        System.out.println("Listando productos");
        return repository.findAll();
    }

    // 🟢 POST: crear producto
     public ProductController(
            ProductRepository repository,
            CategoryRepository categoryRepository,
            UnitsMeasurementsRepository unitsMeasurementsRepository
    ) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.unitsMeasurementsRepository = unitsMeasurementsRepository;
    }

    @PostMapping
    public Products create(@RequestBody Products product) {

        if (product.getNombre() == null || product.getNombre().trim().isEmpty()) {
            throw new RuntimeException("El nombre es obligatorio");
        }

        if (product.getCategoria() == null) {
            throw new RuntimeException("La categoría es obligatoria");
        }

        if (product.getCategoria().getCategoriaId() == null) {
            throw new RuntimeException("El id de la categoría es obligatorio");
        }

        if (product.getUnidad() == null) {
            throw new RuntimeException("La unidad de medida es obligatoria");
        }

        if (product.getUnidad().getUnidadId() == null) {
            throw new RuntimeException("El id de la unidad de medida es obligatorio");
        }

        Categories categoria = categoryRepository.findById(product.getCategoria().getCategoriaId())
                .orElseThrow(() -> new RuntimeException(
                        "No existe la categoría con id: " + product.getCategoria().getCategoriaId()
                ));

        UnitsMeasurements unidad = unitsMeasurementsRepository.findById(product.getUnidad().getUnidadId())
                .orElseThrow(() -> new RuntimeException(
                        "No existe la unidad de medida con id: " + product.getUnidad().getUnidadId()
                ));

        product.setCategoria(categoria);
        product.setUnidad(unidad);

        return repository.save(product);
    }
}