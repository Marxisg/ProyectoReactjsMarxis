import { useCarrito } from "../providers/ContextoCarrito";

import { ItemCount } from "./ItemCount";

export function Detalle({ producto }) {
  const { productosEnElCarrito } = useCarrito();

  const productoEnCarrito = productosEnElCarrito.find(
    (item) => item.product?._id === producto._id,
  );

  const cantidadEnCarrito = productoEnCarrito?.quantity || 0;

  const stockDisponible = producto.stock - cantidadEnCarrito;

  return (
    <div>
      <div>Nombre Producto: {producto.title}</div>
      <div>Precio Producto: ${producto.price}</div>
      <div>Stock disponible: {stockDisponible}</div>
      <div>Cantidad en carrito: {cantidadEnCarrito}</div>
      <ItemCount producto={producto} />
    </div>
  );
}
