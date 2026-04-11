package com.tienda.angel.entity;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "proveedores")
public class Providers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proveedor_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "tipo_documento_id")
    private TypeDocuments tipoDocumento;

    private String numeroDocumento;
    private String nombre;
    private String telefono;
    private String correo;
    private String direccion;
    private Boolean activo;

    private LocalDateTime fechaRegistro;
    private LocalDateTime fechaActualizacion;
}