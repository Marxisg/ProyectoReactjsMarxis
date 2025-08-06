import { useCarrito } from '../providers/ContextoCarrito';
import { ItemCount } from './ItemCount';

export function Detalle({ producto }) {
  const { productosEnElCarrito } = useCarrito();
  const productosEnCarrito = productosEnElCarrito.find(item => item.id === producto.id);
  const cantidadEnCarrito = productosEnCarrito?.enCarrito || 0;
  const stockDisponible = producto.cantidad - cantidadEnCarrito;

  return (
    <div>
      <div>Nombre Producto: {producto.nombre}</div>
      <div>Precio Producto: ${producto.precio}</div>
      <div>Stock disponible: {stockDisponible}</div>
      <div>Cantidad en carrito: {cantidadEnCarrito}</div>
      <ItemCount producto={producto} stockDisponible={stockDisponible} />
    </div>
  );
}
