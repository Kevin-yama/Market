export interface Category {
  categoriaId: number;
  codigo: string;
  nombre: string;
  descripcion?: string | null;
  activo: boolean;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

export interface CreateCategoryPayload {
  codigo: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

// Cambia esta URL si tu controller expone /categorias en vez de /categories
const API_URL = "http://localhost:8080/categories";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = "Error al consumir la API de categorías";

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

  return response.json() as Promise<T>;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Response status:", response.status);
  return parseResponse<Category[]>(response);
}

export async function createCategory(
  payload: CreateCategoryPayload,
): Promise<Category> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log("Response status:", response.status);
  return parseResponse<Category>(response);
}
