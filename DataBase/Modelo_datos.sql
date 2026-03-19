-- =========================================================
-- BASE DE DATOS: tienda_db
-- Script MySQL 8+
-- =========================================================

CREATE DATABASE IF NOT EXISTS tienda_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE tienda_db;
-- =========================================================
-- TABLA: categorias
-- =========================================================
use tienda_db;

CREATE TABLE IF NOT EXISTS categorias (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_categorias_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS unidades_medida (
    unidades_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    abreviatura VARCHAR(20) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_unidades_nombre (nombre),
    UNIQUE KEY uk_unidades_abreviatura (abreviatura)
) ENGINE=InnoDB;


-- =========================================================
-- TABLA: productos
-- =========================================================
CREATE TABLE IF NOT EXISTS productos (
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    cod_barras VARCHAR(150) NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(255) NULL,
    categoria_id INT NOT NULL,
    unidad_id INT NOT NULL,
    precio_compra DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    precio_venta DECIMAL(12,2) NOT NULL DEFAULT 0.00,
	maneja_vencimiento BOOLEAN NOT NULL DEFAULT 0,
    dias_vencimiento_defecto INT NOT NULL DEFAULT 5,
    activo BOOLEAN NOT NULL DEFAULT 1,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uk_productos_cod_barras UNIQUE (cod_barras),
	CONSTRAINT uk_productos_nombre UNIQUE (nombre),

    CONSTRAINT fk_productos_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(categoria_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_productos_unidad
        FOREIGN KEY (unidad_id)
        REFERENCES unidades_medida(unidad_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    
    INDEX idx_productos_categoria (categoria_id),
    INDEX idx_productos_unidad (unidad_id)
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: tipos_documento
-- =========================================================
CREATE TABLE IF NOT EXISTS tipos_documento (
    tipo_documento_id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL,
    nombre VARCHAR(100) NOT NULL,    
    activo BOOLEAN NOT NULL DEFAULT 1,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uk_tipos_documento_codigo (codigo),
    UNIQUE KEY uk_tipos_documento_nombre (nombre)
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: clientes
-- =========================================================
CREATE TABLE IF NOT EXISTS clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento_id INT NULL,
    numero_documento VARCHAR(30) NULL,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) NULL,
    correo VARCHAR(120) NULL,
    direccion VARCHAR(255) NULL,
    activo BOOLEAN NOT NULL DEFAULT 1,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_clientes_tipo_documento
        FOREIGN KEY (tipo_documento_id)
        REFERENCES tipos_documento(tipo_documento_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    UNIQUE KEY uk_clientes_tipo_numero_documento (tipo_documento_id, numero_documento),
    UNIQUE KEY uk_clientes_correo (correo),
    INDEX idx_clientes_nombre (nombre),
    INDEX idx_clientes_tipo_documento (tipo_documento_id)
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: proveedores
-- =========================================================
CREATE TABLE IF NOT EXISTS proveedores (
    proveedor_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento_id INT NULL,
    numero_documento VARCHAR(30) NULL,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(30) NULL,
    correo VARCHAR(120) NULL,
    direccion VARCHAR(255) NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_proveedores_tipo_documento
        FOREIGN KEY (tipo_documento_id)
        REFERENCES tipos_documento(tipo_documento_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
        
    UNIQUE KEY uk_proveedores_numero_documento (tipo_documento_id, numero_documento),
    UNIQUE KEY uk_proveedores_correo (correo),
    INDEX idx_proveedores_nombre (nombre)
    
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: roles
-- =========================================================
CREATE TABLE IF NOT EXISTS roles (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255) NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY uk_roles_nombre (nombre)
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: usuarios
-- =========================================================
CREATE TABLE IF NOT EXISTS usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(120) NULL,
    clave VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    activo TINYINT(1) NOT NULL DEFAULT 1,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuarios_rol
        FOREIGN KEY (rol_id)
        REFERENCES roles(rol_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    UNIQUE KEY uk_usuarios_correo (correo),
    INDEX idx_usuarios_nombre (nombre),
    INDEX idx_usuarios_rol (rol_id)
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: compras (cabecera)
-- =========================================================
CREATE TABLE IF NOT EXISTS compras (
    compra_id INT AUTO_INCREMENT PRIMARY KEY,
    proveedor_id INT NOT NULL,
    usuario_id INT NOT NULL,    
    numero_factura VARCHAR(50) NULL,
    observacion VARCHAR(255) NULL,   
    subtotal  DECIMAL(12,2)  NULL DEFAULT 0.00,
    impuesto  DECIMAL(12,2)  NULL DEFAULT 0.00,
    descuento DECIMAL(12,2) NULL DEFAULT 0.00,
    total     DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    estado VARCHAR(30) NULL DEFAULT 'REGISTRADA',     
    fecha_compra DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_compras_proveedor
        FOREIGN KEY (proveedor_id)
        REFERENCES proveedores(proveedor_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_compras_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    UNIQUE KEY uk_compras_numero_factura (numero_factura),
    INDEX idx_compras_fecha (fecha_compra),
    INDEX idx_compras_proveedor (proveedor_id),
    INDEX idx_compras_usuario (usuario_id),
    INDEX idx_compras_estado (estado)
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: detalle_compra
-- =========================================================
CREATE TABLE IF NOT EXISTS detalle_compra (
    detalle_compra_id INT AUTO_INCREMENT PRIMARY KEY,
    compra_id   INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad DECIMAL(10,3) NOT NULL,
    costo_unitario DECIMAL(12,2) NOT NULL,
    impuesto DECIMAL(12,2) NULL DEFAULT 0.00,
    descuento DECIMAL(12,2) NULL DEFAULT 0.00,
    subtotal DECIMAL(12,2) NULL,
    fecha_ingreso  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento DATETIME NOT NULL DEFAULT (DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 5 DAY)), 

    CONSTRAINT fk_detalle_compra_compra
        FOREIGN KEY (compra_id)
        REFERENCES compras(compra_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_detalle_compra_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_detalle_compra_compra (compra_id),
    INDEX idx_detalle_compra_producto (producto_id)
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: ventas (cabecera)
-- id_cliente puede ser NULL si es venta mostrador sin cliente registrado
-- =========================================================
CREATE TABLE IF NOT EXISTS ventas (
    venta_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NULL,
    usuario_id INT NOT NULL,
    fecha_venta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(12,2)  NULL DEFAULT 0.00,
    impuesto DECIMAL(12,2)  NULL DEFAULT 0.00,
    descuento DECIMAL(12,2) NULL DEFAULT 0.00,
    total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    estado VARCHAR(30) NOT NULL DEFAULT 'REGISTRADA',
    metodo_pago VARCHAR(50) NOT NULL DEFAULT 'EFECTIVO',
    observacion VARCHAR(255) NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_ventas_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(cliente_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_ventas_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_ventas_fecha (fecha_venta),
    INDEX idx_ventas_cliente (cliente_id),
    INDEX idx_ventas_usuario (usuario_id),    
    INDEX idx_ventas_metodo_pago (metodo_pago)
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: detalle_venta
-- =========================================================
CREATE TABLE IF NOT EXISTS detalle_venta (
    detalle_venta_id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad DECIMAL(10,3) NOT NULL,
    precio_unitario DECIMAL(12,2) NOT NULL,
    impuesto DECIMAL(12,2)  NULL DEFAULT 0.00,
    descuento DECIMAL(12,2)  NULL DEFAULT 0.00,
    subtotal DECIMAL(12,2)  NULL,

    CONSTRAINT fk_detalle_venta_venta
        FOREIGN KEY (venta_id)
        REFERENCES ventas(venta_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_detalle_venta_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_detalle_venta_venta (venta_id),
    INDEX idx_detalle_venta_producto (producto_id)
) ENGINE=InnoDB;
-- =========================================================
-- TABLA: inventario
-- Un registro por producto
-- =========================================================
CREATE TABLE IF NOT EXISTS inventario (
    inventario_id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    stock_actual DECIMAL(10,3)  NULL DEFAULT 0.000,
    stock_minimo DECIMAL(10,3)  NULL DEFAULT 0.000,
    stock_maximo DECIMAL(10,3)  NULL DEFAULT 0.000,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventario_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    UNIQUE KEY uk_inventario_producto (producto_id)
) ENGINE=InnoDB;

-- =========================================================
-- TABLA: movimientos_inventario
-- Historial de entradas, salidas, ajustes, devoluciones, etc.
-- =========================================================
CREATE TABLE IF NOT EXISTS movimientos_inventario (
    movimiento_id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo_movimiento VARCHAR(30) NOT NULL,
    cantidad DECIMAL(10,3) NOT NULL,
    stock_anterior DECIMAL(10,3) NOT NULL,
    stock_nuevo DECIMAL(10,3) NOT NULL,
    referencia_tipo VARCHAR(30) NULL,
    observacion VARCHAR(255) NULL,
    fecha_movimiento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_movimientos_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos(producto_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_movimientos_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(usuario_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_movimientos_producto (producto_id),
    INDEX idx_movimientos_usuario (usuario_id),
    INDEX idx_movimientos_tipo (tipo_movimiento),
    INDEX idx_movimientos_fecha (fecha_movimiento)
) ENGINE=InnoDB;






