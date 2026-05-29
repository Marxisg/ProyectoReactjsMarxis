import { createContext, useContext, useEffect, useState } from "react";
import {
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
} from "../api/cartApi";

const ContextoCarrito = createContext();

export const ProveedorCarrito = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [productosEnElCarrito, setProductosEnElCarrito] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initializeCart() {
      try {
        let storedCartId = localStorage.getItem("cartId");

        if (storedCartId) {
          setCartId(storedCartId);
          const cart = await getCart(storedCartId);
          setProductosEnElCarrito(cart.products);
          setLoading(false);
          return;
        }

        const newCart = await createCart();
        const newCartId = newCart._id;

        localStorage.setItem("cartId", newCartId);

        setCartId(newCartId);
        setLoading(false);
      } catch (error) {
        console.error("Error inicializando carrito:", error);
        setLoading(false);
      }
    }

    initializeCart();
  }, []);

  const anadirAlCarrito = async (producto) => {
    try {
      if (!cartId) {
        return;
      }
      await addProductToCart(cartId, producto._id);

      const updatedCart = await getCart(cartId);

      setProductosEnElCarrito(updatedCart.products);
    } catch (error) {
      console.error("Error agregando producto:", error);
    }
  };

  const sacarDelCarrito = async (productId) => {
    try {
      if (!cartId) {
        return;
      }
      await removeProductFromCart(cartId, productId);

      const updatedCart = await getCart(cartId);
      setProductosEnElCarrito(updatedCart.products);
    } catch (error) {
      console.error("Error removiendo producto:", error);
    }
  };

  const vaciarCarrito = async () => {
    try {
      if (!cartId) {
        return;
      }
      await clearCart(cartId);
      setProductosEnElCarrito([]);
    } catch (error) {
      console.error("Error vaciando carrito:", error);
    }
  };

  const contadorDelCarrito = productosEnElCarrito.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalDelCarrito = productosEnElCarrito.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0,
  );

  return (
    <ContextoCarrito.Provider
      value={{
        cartId,
        productosEnElCarrito,
        anadirAlCarrito,
        sacarDelCarrito,
        vaciarCarrito,
        contadorDelCarrito,
        totalDelCarrito,
        loading,
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
};

export const useCarrito = () => useContext(ContextoCarrito);
