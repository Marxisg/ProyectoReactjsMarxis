import { useCarrito } from "../providers/ContextoCarrito";
import { useState } from "react";

import { Receipt } from "lucide-react";

export function Carrito() {
  const {
    contadorDelCarrito,
    productosEnElCarrito,
    totalDelCarrito,
    vaciarCarrito,
  } = useCarrito();

  const [isOpen, setIsOpen] = useState(false);

  const [factura, setFactura] = useState(null);

  const realizarCompra = async () => {
    try {
      const nuevaFactura = {
        id: crypto.randomUUID(),
        productos: productosEnElCarrito,
        total: totalDelCarrito,
        fecha: new Date().toLocaleString(),
      };

      setFactura(nuevaFactura);
      vaciarCarrito();
    } catch (error) {
      console.error("Error al realizar compra:", error);
    }
  };

  const toggleCarrito = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="carrito-container">
      <button onClick={toggleCarrito} className="carrito-boton">
        🛒
        {contadorDelCarrito > 0 && (
          <span className="carrito-badge">{contadorDelCarrito}</span>
        )}
      </button>

      {isOpen && (
        <div className="carrito-desplegado">
          {!factura ? (
            <>
              {productosEnElCarrito.length > 0 ? (
                <>
                  <h4>Carrito</h4>

                  <ul className="carrito-lista">
                    {productosEnElCarrito.map((item) => (
                      <li key={item._id} className="carrito-item">
                        <div>
                          <strong>{item.product.title}</strong>
                        </div>

                        <div>
                          {item.quantity} x ${item.product.price}
                          {" = "}${item.quantity * item.product.price}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <strong>Total:</strong> ${totalDelCarrito}
                  </div>

                  <button onClick={vaciarCarrito}>Vaciar carrito</button>

                  <button onClick={realizarCompra}>Comprar</button>
                </>
              ) : (
                <p>Tu carrito está vacío.</p>
              )}
            </>
          ) : (
            <>
              <h4>Compra realizada</h4>
              <Receipt color="#69bc15" strokeWidth={2.75} />
              <p>
                <strong>ID factura:</strong> {factura.id}
              </p>
              <p>
                <strong>Fecha:</strong> {factura.fecha}
              </p>
              <ul className="carrito-lista">
                {factura.productos.map((item) => (
                  <li key={item._id} className="carrito-item">
                    <div>
                      <strong>{item.product.title}</strong>
                    </div>
                    <div>
                      {item.quantity} x ${item.product.price}
                      {" = "}${item.quantity * item.product.price}
                    </div>
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total pagado:</strong> ${factura.total}
              </p>

              <button onClick={() => setFactura(null)}>Cerrar</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
