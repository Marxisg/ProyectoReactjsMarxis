import { Routes, Route } from "react-router-dom"
import { DetalleProducto } from "./DetalleProducto"
import { Home } from "./Home"
import { Productos } from "./Productos"


export function Main(){
        return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/productos" element={<Productos/>} />
                <Route path="/contact" element={<h2>Contact</h2>} />

                <Route path="/producto/:id" element={<DetalleProducto />} />

                <Route path="/categoria/:categoria" element={<h2>Categoria</h2>} />
            </Routes>
        </main>
        )
}