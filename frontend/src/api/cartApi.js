const API_URL = import.meta.env.VITE_API_URL;

export async function createCart() {
  const response = await fetch(`${API_URL}/api/carts`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error creando carrito");
  }
  return await response.json();
}

export async function getCart(cartId) {
  const response = await fetch(`${API_URL}/api/carts/${cartId}`);

  if (!response.ok) {
    throw new Error("Error obteniendo carrito");
  }

  return await response.json();
}

export async function addProductToCart(
  cartId,

  productId,
) {
  const response = await fetch(
    `${API_URL}/api/carts/${cartId}/products/${productId}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Error agregando producto");
  }

  return await response.json();
}

export async function removeProductFromCart(
  cartId,

  productId,
) {
  const response = await fetch(
    `${API_URL}/api/carts/${cartId}/products/${productId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Error eliminando producto");
  }

  return await response.json();
}

export async function clearCart(cartId) {
  const response = await fetch(`${API_URL}/api/carts/${cartId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error vaciando carrito");
  }
  return await response.json();
}
