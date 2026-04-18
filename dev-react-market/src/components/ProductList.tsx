import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProducts,
  type Product,
} from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudieron cargar los productos";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este producto?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.productoId !== id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo eliminar el producto";
      setError(message);
    }
  };

  const handleEdit = (product: Product) => {
    alert(
      `Editar producto:\n\n` +
        `ID: ${product.productoId}\n` +
        `Nombre: ${product.nombre}\n` +
        `Precio venta: ${product.precioVenta}`,
    );
  };

  const handleAddProduct = () => {
    alert("Aquí puedes abrir el formulario o modal para añadir producto");
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white fw-bold d-flex justify-content-between align-items-center">
        <span>Lista de Productos</span>

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => void loadProducts()}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Recargar"}
          </button>

          <button className="btn btn-sm btn-primary" onClick={handleAddProduct}>
            <i className="bi bi-plus-circle me-1"></i>
            Añadir producto
          </button>
        </div>
      </div>

      <div
        className="card-body p-0"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <div className="text-center p-4 text-muted">
            Cargando productos...
          </div>
        ) : error ? (
          <div className="text-center p-4 text-danger">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center p-4 text-muted">No hay productos</div>
        ) : (
          <ul className="list-group list-group-flush">
            {products.map((product) => (
              <li
                key={product.productoId}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ transition: "0.2s" }}
              >
                <div>
                  <div className="fw-semibold">{product.nombre}</div>
                  <small className="text-muted">
                    ${Number(product.precioVenta).toLocaleString("es-CO")}
                  </small>
                  <div>
                    <small className="text-secondary">
                      Categoría:{" "}
                      {product.categoria?.nombre ||
                        product.categoria?.categoriaId}
                    </small>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(product)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(product.productoId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductList;
