INSERT INTO categorias (codigo, nombre, descripcion, activo)
VALUES
    ('ABAR', 'Abarrotes', 'Productos básicos de consumo diario', 1),
    ('BEB', 'Bebidas', 'Gaseosas, jugos, agua y otras bebidas', 1),
    ('LACT', 'Lácteos', 'Leche, queso, yogur y derivados', 1),
    ('CARN', 'Carnes y embutidos', 'Carnes frías, pollo, res, cerdo y embutidos', 1),
    ('FRUV', 'Frutas y verduras', 'Productos frescos agrícolas', 1),
    ('PAN', 'Panadería', 'Pan, ponqués, galletas y productos de horno', 1),
    ('SNACK', 'Snacks y dulces', 'Mecatos, chocolatinas, caramelos y dulces', 1),
    ('CONG', 'Congelados', 'Productos refrigerados o congelados', 1),
    ('ENLAT', 'Enlatados', 'Conservas y productos en lata', 1),
    ('ASEO_HOG', 'Aseo del hogar', 'Productos de limpieza y desinfección', 1),
    ('ASEO_PER', 'Aseo personal', 'Higiene y cuidado personal', 1),
    ('MASC', 'Mascotas', 'Alimentos y artículos para mascotas', 1),
    ('PAPE', 'Papelería', 'Útiles escolares y de oficina', 1),
    ('MED', 'Medicamentos básicos', 'Productos básicos de botiquín y cuidado', 1),
    ('OTROS', 'Otros', 'Categoría general para productos varios', 1);

SELECT
    categoria_id,
    codigo,
    nombre,
    descripcion,
    activo,
    fecha_creacion,
    fecha_actualizacion
FROM categorias
ORDER BY nombre;