export interface ProductCategoryRef {
  categoriaId: number;
  codigo?: string;
  nombre?: string;
}

export interface ProductUnitRef {
  unidadId: number;
  nombre?: string;
  abreviatura?: string;
}

export interface Product {
  productoId: number;
  codBarras?: string | null;
  nombre: string;
  descripcion?: string | null;
  categoria: ProductCategoryRef;
  unidad: ProductUnitRef;
  precioCompra: number;
  precioVenta: number;
  manejaVencimiento: boolean;
  diasVencimientoDefecto: number;
  activo: boolean;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

export interface CreateProductPayload {
  codBarras?: string;
  nombre: string;
  descripcion?: string;
  categoria: {
    categoriaId: number;
  };
  unidad: {
    unidadId: number;
  };
  precioCompra: number;
  precioVenta: number;
  manejaVencimiento: boolean;
  diasVencimientoDefecto: number;
  activo: boolean;
}

export interface UpdateProductPayload {
  codBarras?: string;
  nombre: string;
  descripcion?: string;
  categoria: {
    categoriaId: number;
  };
  unidad: {
    unidadId: number;
  };
  precioCompra: number;
  precioVenta: number;
  manejaVencimiento: boolean;
  diasVencimientoDefecto: number;
  activo: boolean;
}

// Cambia esta URL si tu backend expone otra ruta
const API_URL = "http://localhost:8080/products";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = "Error al consumir la API de productos";

    try {
      const errorData = await response.json();
      errorMessage =
        errorData?.error ||
        errorData?.message ||
        errorData?.mensaje ||
        errorMessage;
    } catch {
      const rawText = await response.text();
      if (rawText) {
        errorMessage = rawText;
      }
    }

    throw new Error(errorMessage);
  }

  // DELETE a veces no devuelve body
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return parseResponse<Product[]>(response);
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return parseResponse<Product>(response);
}

export async function createProduct(
  payload: CreateProductPayload,
): Promise<Product> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<Product>(response);
}

export async function updateProduct(
  id: number,
  payload: UpdateProductPayload,
): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse<Product>(response);
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return parseResponse<void>(response);
}
