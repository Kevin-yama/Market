USE tienda_db;

INSERT IGNORE INTO tipos_documento (codigo, nombre, activo)
VALUES
    ('CC',  'Cédula de ciudadanía', 1),
    ('CE',  'Cédula de extranjería', 1),
    ('TI',  'Tarjeta de identidad', 1),
    ('RC',  'Registro civil', 1),
    ('NIT', 'Número de identificación tributaria', 1),
    ('PAS', 'Pasaporte', 1);
SELECT
    tipo_documento_id,
    codigo,
    nombre,
    activo,
    fecha_creacion,
    fecha_actualizacion
FROM tipos_documento
ORDER BY nombre;