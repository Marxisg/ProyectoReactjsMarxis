import { useCarrito } from "../providers/ContextoCarrito";

import { Plus, Minus } from "lucide-react";

export function ItemCount({ producto }) {
  const {
    anadirAlCarrito,

    sacarDelCarrito,

    productosEnElCarrito,
  } = useCarrito();

  const productoEnCarrito = productosEnElCarrito.find(
    (item) => item.product?._id === producto._id,
  );

  const cantidadEnCarrito = productoEnCarrito?.quantity || 0;

  const stockDisponible = producto.stock - cantidadEnCarrito;

  const handleSumar = async () => {
    if (stockDisponible > 0) {
      await anadirAlCarrito(producto);
    }
  };

  const handleRemover = async () => {
    if (cantidadEnCarrito > 0) {
      await sacarDelCarrito(producto._id);
    }
  };

  return (
    <div>
      <button onClick={handleRemover} disabled={cantidadEnCarrito === 0}>
        <Minus />
      </button>

      <span className="carrito-cantidad">{cantidadEnCarrito}</span>

      <button onClick={handleSumar} disabled={stockDisponible <= 0}>
        <Plus />
      </button>
    </div>
  );
}
