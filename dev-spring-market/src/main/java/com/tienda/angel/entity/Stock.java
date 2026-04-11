package com.tienda.angel.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;  
@Entity
@Table(name = "inventario")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer inventarioId;

    @OneToOne
    @JoinColumn(name = "producto_id")
    private Products producto;

    private BigDecimal stockActual;
    private BigDecimal stockMinimo;
    private BigDecimal stockMaximo;
}