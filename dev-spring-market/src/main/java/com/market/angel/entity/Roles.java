package com.market.angel.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
@Entity
@Table(name = "roles")
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rol_id")
    private Integer id;

    private String nombre;
    private String descripcion;
    private Boolean activo;

    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
}