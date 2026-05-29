import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Detalle } from "./Detalle";
import { getProductById } from "../api/productsApi";

export function DetalleProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        setProducto(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadProduct();
  }, [id]);

  return (
    <div>
      {producto ? <Detalle producto={producto} /> : <p>Cargando producto...</p>}
    </div>
  );
}
