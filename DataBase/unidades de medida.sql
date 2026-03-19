USE tienda_db;

INSERT IGNORE INTO unidades_medida (nombre, abreviatura, activo)
VALUES
    ('Unidad', 'UND', 1),
    ('Par', 'PAR', 1),
    ('Docena', 'DOC', 1),

    ('Gramo', 'GR', 1),
    ('Kilogramo', 'KG', 1),
    ('Libra', 'LB', 1),
    ('Arroba', 'ARR', 1),

    ('Bulto', 'BUL', 1),    
    ('Paca', 'PAC', 1),

    ('Caja', 'CJ', 1),
    ('Paquete', 'PAQ', 1),    
    ('Botella', 'BOT', 1),
    ('Lata', 'LAT', 1),
    ('Frasco', 'FCO', 1),    
    ('Sobre', 'SOB', 1),
    ('Bandeja', 'BAN', 1),
    ('Rollo', 'ROL', 1);
    
    
    SELECT 
    unidad_id,
    nombre,
    abreviatura,
    activo,
    fecha_creacion,
    fecha_actualizacion
FROM unidades_medida
ORDER BY nombre;