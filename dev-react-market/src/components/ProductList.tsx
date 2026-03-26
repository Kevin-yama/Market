import { useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 2500 },
    { id: 2, name: "Mouse", price: 50 },
    { id: 3, name: "Teclado", price: 120 },
    { id: 4, name: "Teclado", price: 120 },
    { id: 5, name: "Teclado", price: 120 },
    { id: 6, name: "Teclado", price: 120 },
    { id: 7, name: "Teclado", price: 120 },
    { id: 8, name: "Teclado", price: 120 },
    { id: 9, name: "Teclado", price: 120 },
    { id: 10, name: "Teclado", price: 120 },
  ]);

  const handleDelete = (id: Number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product: { id: number; name: string }) => {
    alert("Editar: " + product.name);
  };

  return (
    <div className="card shadow-sm border-0">
      {/* HEADER */}
      <div className="card-header bg-white fw-bold">Lista de Productos</div>

      {/* BODY CON SCROLL */}
      <div
        className="card-body p-0"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {products.length === 0 ? (
          <div className="text-center p-4 text-muted">No hay productos</div>
        ) : (
          <ul className="list-group list-group-flush">
            {products.map((product) => (
              <li
                key={product.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ transition: "0.2s" }}
              >
                {/* INFO */}
                <div>
                  <div className="fw-semibold">{product.name}</div>
                  <small className="text-muted">${product.price}</small>
                </div>

                {/* ACCIONES */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(product)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(product.id)}
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
