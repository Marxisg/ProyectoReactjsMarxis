import { useCarrito } from '../providers/ContextoCarrito';
import { useState } from 'react';
import {Receipt } from "lucide-react";

import { collection, addDoc, doc, updateDoc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../firebaseConfig';

export function Carrito() {
  const { contadorDelCarrito, productosEnElCarrito, totalDelCarrito, vaciarCarrito } = useCarrito();
  const [isOpen, setIsOpen] = useState(false);
  const [factura, setFactura] = useState(null); 

  const realizarCompra = async () => {
    const db = getFirestore(app);
    try {

      const facturaRef = await addDoc(collection(db, 'facturas'), {
        productos: productosEnElCarrito,
        total: totalDelCarrito,
        fecha: new Date().toISOString(),
      });

      const updates = productosEnElCarrito.map(async (item) => {
        const productoRef = doc(db, 'products', item.id.toString());
        const productoIndividual = await getDoc(productoRef);
        const productoActual = productoIndividual.data();

        await updateDoc(productoRef, {
          cantidad: productoActual.cantidad - item.enCarrito
        });
      });

      await Promise.all(updates);

      setFactura({
        id: facturaRef.id,
        productos: productosEnElCarrito,
        total: totalDelCarrito,
        fecha: new Date().toLocaleString(),
      });

     
    vaciarCarrito();

    } catch (error) {
      console.error("Error al realizar la compra:", error);
    }
  };

  const toggleCarrito = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="carrito-container">
      <button onClick={toggleCarrito} className="carrito-boton">
        🛒
        {contadorDelCarrito > 0 && (
          <span className="carrito-badge">
            {contadorDelCarrito}
          </span>
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
                    {productosEnElCarrito.map(item => (
                      <li key={item.id} className="carrito-item">
                        <div><strong>{item.nombre}</strong></div>
                        <div>{item.enCarrito} x ${item.precio} = ${item.enCarrito * item.precio}</div>
                      </li>
                    ))}
                  </ul>
                  
                  <div><strong>Total:</strong> ${totalDelCarrito}</div>
                  <button onClick={vaciarCarrito}>Vaciar carrito</button>
                  <button onClick={realizarCompra}>Comprar</button>
                </>
              ) : (
                <p>Tu carrito está vacío.</p>
              )}
            </>
          ) : (
            <>
              <h4>Compra realizada </h4>  <Receipt color="#69bc15" strokeWidth={2.75} />
              <p><strong>ID de factura:</strong> {factura.id}</p>
              <p><strong>Fecha:</strong> {factura.fecha}</p>
              <ul className="carrito-lista">
                {factura.productos.map(item => (
                  <li key={item.id} className="carrito-item">
                    <div><strong>{item.nombre}</strong></div>
                    <div>{item.enCarrito} x ${item.precio} = ${item.enCarrito * item.precio}</div>
                  </li>
                ))}
              </ul>
              
              <p><strong>Total pagado:</strong> ${factura.total}</p>
              <button onClick={() => setFactura(null)}>Cerrar</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}