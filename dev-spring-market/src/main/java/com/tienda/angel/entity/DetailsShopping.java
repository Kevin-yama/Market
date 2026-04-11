package com.tienda.angel.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
@Entity
@Table(name = "detalle_compra")
public class DetailsShopping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer detalleCompraId;

    @ManyToOne
    @JoinColumn(name = "compra_id")
    private Shopping compra;

    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Products producto;

    private BigDecimal cantidad;
    private BigDecimal costoUnitario;
}
