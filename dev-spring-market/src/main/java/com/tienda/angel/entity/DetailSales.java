package com.tienda.angel.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
@Entity
@Table(name = "detalle_venta")
public class DetailSales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer detalleVentaId;

    @ManyToOne
    @JoinColumn(name = "venta_id")
    private Sales venta;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Products producto;

    private BigDecimal cantidad;
    private BigDecimal precioUnitario;
}