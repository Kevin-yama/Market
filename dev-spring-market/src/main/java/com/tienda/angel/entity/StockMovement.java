package com.tienda.angel.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "movimientos_inventario")
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movimientoId;

    @ManyToOne
    private Products producto;

    @ManyToOne
    private Users usuario;

    private String tipoMovimiento;
    private BigDecimal cantidad;
    private BigDecimal stockAnterior;
    private BigDecimal stockNuevo;

    private LocalDateTime fechaMovimiento;
}
