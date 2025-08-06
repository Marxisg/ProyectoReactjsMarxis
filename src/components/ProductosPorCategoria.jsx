import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from "../firebaseConfig"
import { Link } from "react-router-dom"

export function ProductosPorCategoria() {
    const parametrosUrl = useParams()

const [productos, setProductos] = useState([]);

const db = getFirestore(app);

    useEffect(() => {
    async function fetchProductos() {
      const productosCargados = await getDocs(collection(db, 'products'));
      const productosFirebase = productosCargados.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data(),
      }));
      setProductos(productosFirebase);
    }

    fetchProductos();
  }, []);

    const categoriaActual = parametrosUrl.categoria
const productosCategoria = productos
                    .filter(p => p.categoria === categoriaActual)

  return (
    <div>
    <ul>
      {productosCategoria.map((producto, index) => (
        <li key={index}><Link to={`/producto/${producto.id}`}>{producto.nombre}</Link></li>
      ))}
    </ul>
    </div>
  );
}