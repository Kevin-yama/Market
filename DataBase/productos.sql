USE tienda_db;
 truncate producto;
 
 select * from productos;
INSERT IGNORE INTO unidades_medida (nombre, abreviatura, activo)
VALUES
    ('Litro', 'LT', 1),
    ('Mililitro', 'ML', 1);
    
INSERT IGNORE INTO productos (
    cod_barras,
    nombre,
    descripcion,
    categoria_id,
    unidad_id,
    precio_compra,
    precio_venta,
    maneja_vencimiento,
    dias_vencimiento_defecto,
    activo
)
VALUES
    ('770100000001', 'Arroz Blanco 1 Kg', 'Arroz blanco empacado 1 kilogramo', 1, 5, 3500.00, 4200.00, FALSE, 5, 1),
    ('770100000002', 'Azúcar 1 Kg', 'Azúcar refinada empacada 1 kilogramo', 1, 5, 3200.00, 3900.00, FALSE, 5, 1),
    ('770100000003', 'Sal 1 Kg', 'Sal refinada empacada 1 kilogramo', 1, 5, 1800.00, 2500.00, FALSE, 5, 1),
    ('770100000004', 'Aceite Vegetal 1 Lt', 'Aceite vegetal botella 1 litro', 1, 22, 7800.00, 9200.00, FALSE, 5, 1),
    ('770100000005', 'Café Molido 500 Gr', 'Café molido presentación 500 gramos', 1, 4, 8500.00, 10500.00, FALSE, 5, 1),

    ('770100000006', 'Leche Entera 1 Lt', 'Leche entera larga vida 1 litro', 3, 22, 3200.00, 4200.00, TRUE, 10, 1),
    ('770100000007', 'Yogur Fresa 1 Lt', 'Yogur sabor fresa presentación 1 litro', 3, 22, 4500.00, 6000.00, TRUE, 10, 1),
    ('770100000008', 'Queso Campesino 500 Gr', 'Queso campesino empacado 500 gramos', 3, 4, 9000.00, 11500.00, TRUE, 7, 1),

    ('770100000009', 'Gaseosa Cola 1.5 Lt', 'Gaseosa sabor cola botella 1.5 litros', 2, 15, 4200.00, 5500.00, FALSE, 5, 1),
    ('770100000010', 'Agua Mineral 600 Ml', 'Agua mineral botella 600 ml', 2, 15, 1200.00, 2000.00, FALSE, 5, 1),
    ('770100000011', 'Jugo Naranja 1 Lt', 'Jugo de naranja presentación 1 litro', 2, 22, 2800.00, 3900.00, TRUE, 15, 1),

    ('770100000012', 'Atún Enlatado 170 Gr', 'Atún en agua lata 170 gramos', 9, 16, 4200.00, 5500.00, FALSE, 30, 1),
    ('770100000013', 'Maíz Dulce Enlatado', 'Maíz dulce en conserva', 9, 16, 2500.00, 3400.00, FALSE, 30, 1),

    ('770100000014', 'Papas Fritas Paquete', 'Snack de papa en paquete', 7, 13, 1800.00, 2500.00, FALSE, 20, 1),
    ('770100000015', 'Chocolate Barra 100 Gr', 'Chocolate en barra presentación 100 gramos', 7, 1, 1500.00, 2200.00, FALSE, 20, 1),
    ('770100000016', 'Galletas Chocolate Paquete', 'Galletas de chocolate paquete mediano', 7, 13, 2200.00, 3200.00, FALSE, 20, 1),

    ('770100000017', 'Detergente Polvo 1 Kg', 'Detergente en polvo para ropa', 10, 5, 6500.00, 8200.00, FALSE, 5, 1),
    ('770100000018', 'Jabón Barra Azul', 'Jabón en barra para lavar ropa', 10, 1, 1800.00, 2500.00, FALSE, 5, 1),
    ('770100000019', 'Papel Higiénico Paquete x4', 'Papel higiénico paquete por 4 unidades', 10, 13, 5200.00, 6900.00, FALSE, 5, 1),

    ('770100000020', 'Shampoo 400 Ml', 'Shampoo para uso personal 400 ml', 11, 17, 7800.00, 9800.00, FALSE, 10, 1);