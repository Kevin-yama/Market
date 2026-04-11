package com.tienda.angel.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "compras")
public class Shopping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "compra_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "proveedor_id")
    private Providers proveedor;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Users usuario;

    private String numeroFactura;
    private String observacion;

    private BigDecimal subtotal;
    private BigDecimal impuesto;
    private BigDecimal descuento;
    private BigDecimal total;

    private String estado;
    private LocalDateTime fechaCompra;
}