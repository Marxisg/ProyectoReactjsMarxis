import { Link } from "react-router-dom"

export function Productos() {

    const productos = [
        { id: 1, nombre: "Malta Pilsen 1kg", precio: 1500 },
        { id: 2, nombre: "Lúpulo Cacade 100gr", precio: 4400 },
        { id: 3, nombre: "Levadura US-05", precio: 4100 },
        { id: 4, nombre: "Levadura S-33 11,5gr", precio: 4900 },
        { id: 5, nombre: "Botella Pet 1ltr - 50 botellas", precio: 54000 },
        { id: 6, nombre: "Tapas para botella-200 tapas", precio: 14000 }
    ]

    return (
        <div className="CardProducto">
            {productos.map((producto, indice) => {
                return (
                    <div key={indice}>
                        <Link to={`/producto/${producto.id}`}>{producto.nombre}</Link>
                    </div>
                )
            })}
        </div>
    )
}