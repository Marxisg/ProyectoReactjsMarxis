import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';

import { productos } from "../data/productos"

export function ProductosPorCategoria() {
    const [visible, setVisible] = useState(false);

    const parametrosUrl = useParams()

        useEffect(() => {
    const temporizador = setTimeout(() => {setVisible(true);}, 1000)

    return () => clearTimeout(temporizador);
  }, []);

  if (!visible) return null;
    const categoriaActual = parametrosUrl.categoria
    const nombres = productos
                    .filter(p => p.categoria === categoriaActual)
                    .map(p => p.nombre);

  return (
    <ul>
      {nombres.map((nombre, index) => (
        <li key={index}>{nombre}</li>
      ))}
    </ul>
  );
}