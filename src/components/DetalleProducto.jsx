import { useParams } from "react-router-dom"
import { Detalle } from "./Detalle";

import { productos } from "../data/productos"

export function DetalleProducto() {

    const parametrosUrl = useParams()
   
    const productoAPasar = productos.find(producto => producto.id === parseInt(parametrosUrl.id))

    return (
        <div>
            <Detalle producto={productoAPasar}></Detalle>
        </div>
    )
}