import { useCarrito } from '../providers/ContextoCarrito';

import {Plus, Minus} from "lucide-react";

export function ItemCount({ producto, stockDisponible }) {
  const { anadirAlCarrito, sacarDelCarrito, productosEnElCarrito } = useCarrito();

  const productosEnCarrito = productosEnElCarrito.find(item => item.id === producto.id);
  const cantidadEnCarrito = productosEnCarrito?.enCarrito || 0;

  const handleSumar = () => {
    if (cantidadEnCarrito < producto.cantidad) {
      anadirAlCarrito(producto);
    }
  };

  const handleRemover = () => {
    if (cantidadEnCarrito > 0) {
      sacarDelCarrito(producto.id);
    }
  };

  return (
    <div>
      <button onClick={handleRemover} disabled={cantidadEnCarrito === 0}> <Minus /></button>
      <span className="carrito-cantidad">{cantidadEnCarrito}</span>
      <button onClick={handleSumar} disabled={stockDisponible <= 0}> <Plus /> </button>
    </div>
  );
}

