import { useEffect, useState } from 'react';

export function Detalle({producto}) {
    const [visible, setVisible] = useState(false);

        useEffect(() => {
    const temporizador = setTimeout(() => {setVisible(true);}, 1000)

    return () => clearTimeout(temporizador);
  }, []);

  if (!visible) return null;

    return (
        <div>
        <div>Nombre Producto: {producto.nombre}</div>
        <div>Precio Producto: ${producto.precio}</div>
        </div>
    )
}