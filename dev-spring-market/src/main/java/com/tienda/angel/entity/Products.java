package com.tienda.angel.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "productos")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "producto_id")
    private Integer productoId;

    @Column(name = "cod_barras", unique = true)
    private String codBarras;

    @Column(nullable = false, unique = true)
    private String nombre;

    private String descripcion;

    // 🔗 RELACIONES
    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categories categoria;

    @ManyToOne
    @JoinColumn(name = "unidad_id", nullable = false)
    private UnitsMeasurements unidad;

    private BigDecimal precioCompra;
    private BigDecimal precioVenta;

    private Boolean manejaVencimiento;
    private Integer diasVencimientoDefecto;
    private Boolean activo;

    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;

    @PrePersist
    public void prePersist() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
}