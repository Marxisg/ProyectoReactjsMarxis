import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";

export function ProductosPorCategoria() {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProductos(data.payload);
    }
    loadProducts();
  }, []);

  const productosCategoria = productos.filter((p) => p.category === categoria);

  return (
    <div>
      <ul>
        {productosCategoria.map((producto) => (
          <li key={producto._id}>
            <Link to={`/producto/${producto._id}`}>{producto.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
