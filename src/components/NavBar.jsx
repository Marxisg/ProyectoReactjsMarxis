import { NavLink } from "react-router-dom";
import {Carrito} from "./Carrito"

export function NavBar () {
    return (
        <header>
            <h1>Daniel's Beer </h1>
            <nav className="nav">
                <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/productos">Productos</NavLink></li>
                    <li><NavLink to="/contacto">Contacto</NavLink></li>
                </ul>
            </nav>
            <div>
                <Carrito/>
            </div>
                        
        </header>

    )
}