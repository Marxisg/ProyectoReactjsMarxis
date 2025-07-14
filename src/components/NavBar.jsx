import {Carrito} from "./Carrito"

export function NavBar () {
    return (
        <header>
            <h1>Daniel's Beer </h1>
            <nav className="nav">
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/productos">Productos</a></li>
                    <li><a href="/contacto">Contacto</a></li>
                </ul>
            </nav>
            <div>
                <Carrito/>
            </div>
                        
        </header>

    )
}