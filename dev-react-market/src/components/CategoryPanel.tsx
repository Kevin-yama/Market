import { useEffect, useMemo, useState } from "react";
import {
  createCategory,
  getCategories,
  type Category,
} from "../services/categoryService";

interface CategoryPanelProps {
  search: string;
}

function CategoryPanel({ search }: CategoryPanelProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    activo: true,
  });

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudieron cargar las categorías";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return categories;

    return categories.filter((category) => {
      const codigo = category.codigo?.toLowerCase() ?? "";
      const nombre = category.nombre?.toLowerCase() ?? "";
      const descripcion = category.descripcion?.toLowerCase() ?? "";

      return (
        codigo.includes(term) ||
        nombre.includes(term) ||
        descripcion.includes(term)
      );
    });
  }, [categories, search]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.codigo.trim()) {
      setError("El código de la categoría es obligatorio");
      setSuccessMessage("");
      return;
    }

    if (!form.nombre.trim()) {
      setError("El nombre de la categoría es obligatorio");
      setSuccessMessage("");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccessMessage("");

      const created = await createCategory({
        codigo: form.codigo.trim(),
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        activo: form.activo,
      });

      setCategories((prev) => [created, ...prev]);
      setForm({
        codigo: "",
        nombre: "",
        descripcion: "",
        activo: true,
      });
      setSuccessMessage("Categoría creada correctamente");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "No se pudo crear la categoría";
      setError(message);
      setSuccessMessage("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="row mt-4">
      <div className="col-md-4 mb-4">
        <div className="card shadow-sm">
          <div className="card-header fw-bold">Nueva categoría</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="codigo" className="form-label">
                  Código
                </label>
                <input
                  id="codigo"
                  name="codigo"
                  type="text"
                  className="form-control"
                  value={form.codigo}
                  onChange={handleChange}
                  placeholder="Ej: CAT001"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Bebidas"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  className="form-control"
                  rows={3}
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción de la categoría"
                />
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  id="activo"
                  name="activo"
                  type="checkbox"
                  className="form-check-input"
                  checked={form.activo}
                  onChange={handleChange}
                />
                <label htmlFor="activo" className="form-check-label">
                  Activa
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar categoría"}
              </button>
            </form>

            {successMessage && (
              <div className="alert alert-success mt-3 mb-0" role="alert">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="alert alert-danger mt-3 mb-0" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span className="fw-bold">Listado de categorías</span>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => void loadCategories()}
              disabled={loading}
            >
              {loading ? "Cargando..." : "Recargar"}
            </button>
          </div>

          <div className="card-body">
            {loading ? (
              <p className="mb-0">Cargando categorías...</p>
            ) : error ? (
              <div className="alert alert-danger mb-0" role="alert">
                {error}
              </div>
            ) : filteredCategories.length === 0 ? (
              <p className="mb-0">No hay categorías para mostrar.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category) => (
                      <tr key={category.categoriaId}>
                        <td>{category.categoriaId}</td>
                        <td>{category.codigo}</td>
                        <td>{category.nombre}</td>
                        <td>{category.descripcion || "-"}</td>
                        <td>
                          <span
                            className={`badge ${
                              category.activo ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {category.activo ? "Activa" : "Inactiva"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPanel;
