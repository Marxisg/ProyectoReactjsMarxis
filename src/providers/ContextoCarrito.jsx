import { createContext, useState, useContext } from 'react';

const ContextoCarrito = createContext();

export const ProveedorCarrito = ({ children }) => {
  const [productosEnElCarrito, setProductosEnElCarrito] = useState([]);

  const anadirAlCarrito = (producto) => {
    setProductosEnElCarrito(prev => {
      const existente = prev.find(p => p.id === producto.id);
      if (existente) {
        if (existente.enCarrito < producto.cantidad) {
          return prev.map(p =>
            p.id === producto.id
              ? { ...p, enCarrito: p.enCarrito + 1 }
              : p
          );
        } else {
          return prev;
        }
      } else {
        return [...prev, { ...producto, enCarrito: 1 }];
      }
    });
  };

  const sacarDelCarrito = (idProducto) => {
  setProductosEnElCarrito(prev => {
    const existente = prev.find(p => p.id === idProducto);
    if (!existente) return prev;
    if (existente.enCarrito > 1) {
      return prev.map(p =>
        p.id === idProducto
          ? { ...p, enCarrito: p.enCarrito - 1 }
          : p
      );
    } else {
      return prev.filter(p => p.id !== idProducto);
    }
  });
};

const vaciarCarrito = () => {
  setProductosEnElCarrito([]);
};

  const contadorDelCarrito = productosEnElCarrito.reduce((total, item) => total + item.enCarrito, 0);
  const totalDelCarrito = productosEnElCarrito.reduce((total, item) => total + item.precio * item.enCarrito, 0);

  return (
    <ContextoCarrito.Provider value={{ productosEnElCarrito, anadirAlCarrito, sacarDelCarrito, contadorDelCarrito, totalDelCarrito, vaciarCarrito }}>
      {children}
    </ContextoCarrito.Provider>
  );
};

export const useCarrito = () => useContext(ContextoCarrito);