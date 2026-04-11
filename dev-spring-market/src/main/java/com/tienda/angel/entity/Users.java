package com.tienda.angel.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")
    private Integer id;

    private String nombre;
    private String correo;
    private String clave;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Roles rol;

    private Boolean activo;

    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
}