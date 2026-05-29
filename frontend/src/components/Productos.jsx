import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";
import { socket } from "../socket";

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProductos(data.payload);
      setLoading(false);
    }

    loadProducts();

    socket.on("productsUpdated", (products) => {
      setProductos(products);
    });

    return () => {
      socket.off("productsUpdated");
    };
  }, []);

  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  return (
    <div>
      <h2>Productos</h2>

      <div className="CardProducto">
        {productos.map((producto) => (
          <div key={producto._id}>
            <Link to={`/producto/${producto._id}`}>{producto.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
