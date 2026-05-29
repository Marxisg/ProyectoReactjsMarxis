const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts({ limit = 10, page = 1 } = {}) {
  const response = await fetch(
    `${API_URL}/api/products?limit=${limit}&page=${page}`,
  );

  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/api/products/${id}`);

  if (!response.ok) {
    throw new Error("Producto no encontrado");
  }

  return await response.json();
}
