import { Link } from "react-router-dom"
import { app } from "../firebaseConfig"

import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';


export function Productos() {
    const [productos, setProductos] = useState([]);

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

    return (
        <div>
            <h2>Productos:</h2>
            <div className="CardProducto">
                {productos.map((producto, indice) => {
                    return (
                        <div key={indice}>
                            <Link to={`/producto/${producto.id}`}>{producto.nombre}</Link>
                        </div>

                    )
                })}
            </div>
            <section className="Categoria">
                <h2>Productos por Categoria</h2>

                <div >
                    <Link to={`/categoria/preparacion`}>Preparación</Link>
                </div>
                <div>
                    <Link to={`/categoria/embotellado`}>Embotellado</Link>
                </div>

            </section>

        </div>
    )
}