import { useParams } from "react-router-dom"
import { Detalle } from "./Detalle";
import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../firebaseConfig';

export function DetalleProducto() {
    const [productos, setProductos] = useState([]);
    const parametrosUrl = useParams()

    const db = getFirestore(app);

    useEffect(() => {
    async function fetchProductos() {
      const snapshot = await getDocs(collection(db, 'products'));
      const productosFirebase = snapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data(),
      }));
      setProductos(productosFirebase);
    }

    fetchProductos();
  }, []);
   
    const productoAPasar = productos.find(producto => producto.id === parseInt(parametrosUrl.id))

return (
  <div >
    {productoAPasar ? (
      <Detalle producto={productoAPasar} />
    ) : (
      <p>Cargando producto...</p>
    )}
  </div>
);
}