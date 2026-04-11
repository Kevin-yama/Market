package com.tienda.angel.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "ventas")
public class Sales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ventaId;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Clients cliente;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Users usuario;

    private BigDecimal total;
    private String estado;
    private String metodoPago;

    private LocalDateTime fechaVenta;
}