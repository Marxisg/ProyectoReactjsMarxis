
import {CartWidget} from "./CartWidget"

export function NavBar () {
    return (
        <header>
            <h1>LOGO</h1>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Productos</li>
                    <li>Carrito</li>
                </ul>
            </nav>
            <div>
                <CartWidget/>
            </div>
                        
        </header>

    )
}