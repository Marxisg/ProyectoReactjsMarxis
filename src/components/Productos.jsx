import { Link } from "react-router-dom"
import { productos } from "../data/productos"
import { app } from "../firebaseConfig"




export function Productos() {


    return (
        <div>
            <div className="CardProducto">
                <h2>Productos:</h2>
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