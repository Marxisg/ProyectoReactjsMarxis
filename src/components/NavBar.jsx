import {Carrito} from "./Carrito"

export function NavBar () {
    return (
        <header>
            <h1>Daniel's Beer </h1>
            <nav className="nav">
                <ul>
                    <li>Home</li>
                    <li>Productos</li>
                    <li>Contacto</li>
                </ul>
            </nav>
            <div>
                <Carrito/>
            </div>
                        
        </header>

    )
}