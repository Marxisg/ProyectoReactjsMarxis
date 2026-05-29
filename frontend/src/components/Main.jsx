import { Routes, Route } from "react-router-dom"
import { DetalleProducto } from "./DetalleProducto"
import { Home } from "./Home"
import { Productos } from "./Productos"
import {Contacto} from "./Contacto"
import { ProductosPorCategoria } from "./ProductosPorCategoria"


export function Main(){
        return (
        <main className="main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/productos" element={<Productos/>} />
                <Route path="/contacto" element={<Contacto/>} />

                <Route path="/producto/:id" element={<DetalleProducto />} />

                <Route path="/categoria/:categoria" element={<ProductosPorCategoria/>} />
                <Route path="/*" element={<h2>404: No existe esta pagina</h2>} />
            </Routes>
        </main>
        )
}